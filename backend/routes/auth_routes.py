from fastapi import APIRouter, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from models import UserCreate, UserRegistrationResponse
from auth import AuthService

auth_router = APIRouter(prefix="/auth", tags=["authentication"])

# We'll initialize auth_service in the main server.py to avoid duplicate DB connections

@auth_router.post("/register", response_model=UserRegistrationResponse)
async def register_user(user_data: UserCreate):
    """Register a new user"""
    try:
        result = await auth_service.create_user(user_data)
        
        if not result.success:
            raise HTTPException(status_code=400, detail=result.message)
            
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

@auth_router.get("/users/count")
async def get_users_count():
    """Get total number of registered users"""
    try:
        count = await db.users.count_documents({})
        return {"success": True, "count": count}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to get user count")