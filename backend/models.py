from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

# User Models
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    
    class Config:
        str_strip_whitespace = True

class UserResponse(BaseModel):
    id: str
    email: str
    created_at: datetime
    
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        str_strip_whitespace = True

# API Response Models
class APIResponse(BaseModel):
    success: bool
    message: str
    
class UserRegistrationResponse(APIResponse):
    user: Optional[UserResponse] = None