import bcrypt
from motor.motor_asyncio import AsyncIOMotorCollection
from models import User, UserCreate, UserResponse, UserRegistrationResponse
from typing import Optional
from datetime import datetime
import uuid

class AuthService:
    def __init__(self, users_collection: AsyncIOMotorCollection):
        self.users_collection = users_collection
    
    def hash_password(self, password: str) -> str:
        """Hash password using bcrypt"""
        salt = bcrypt.gensalt()
        password_hash = bcrypt.hashpw(password.encode('utf-8'), salt)
        return password_hash.decode('utf-8')
    
    def verify_password(self, password: str, password_hash: str) -> bool:
        """Verify password against hash"""
        return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))
    
    async def get_user_by_email(self, email: str) -> Optional[User]:
        """Get user by email from database"""
        user_doc = await self.users_collection.find_one({"email": email.lower()})
        if user_doc:
            return User(**user_doc)
        return None
    
    async def create_user(self, user_data: UserCreate) -> UserRegistrationResponse:
        """Create new user with validation"""
        try:
            # Validate password length
            if len(user_data.password) < 6:
                return UserRegistrationResponse(
                    success=False,
                    message="Password must be at least 6 characters long"
                )
            
            # Check if user already exists
            existing_user = await self.get_user_by_email(user_data.email.lower())
            if existing_user:
                return UserRegistrationResponse(
                    success=False,
                    message="User with this email already exists"
                )
            
            # Create new user
            user_id = str(uuid.uuid4())
            password_hash = self.hash_password(user_data.password)
            
            new_user = User(
                id=user_id,
                email=user_data.email.lower(),
                password_hash=password_hash,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            
            # Insert into database
            await self.users_collection.insert_one(new_user.dict())
            
            # Return response without password hash
            user_response = UserResponse(
                id=new_user.id,
                email=new_user.email,
                created_at=new_user.created_at
            )
            
            return UserRegistrationResponse(
                success=True,
                message="User registered successfully",
                user=user_response
            )
            
        except Exception as e:
            return UserRegistrationResponse(
                success=False,
                message=f"Registration failed: {str(e)}"
            )