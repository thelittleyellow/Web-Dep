from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timedelta, timezone
from typing import List, Optional
import os
import jwt
import bcrypt
import uuid
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS setup
cors_origins = os.getenv("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
client = AsyncIOMotorClient(os.getenv("MONGO_URL"))
db = client[os.getenv("DB_NAME", "touhou_database")]

# JWT setup
JWT_SECRET = os.getenv("JWT_SECRET", "touhou-secret-key-2024")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

security = HTTPBearer()

# Pydantic models
class UserCreate(BaseModel):
    email: str
    password: str
    username: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class User(BaseModel):
    id: str = Field(alias="_id")
    email: str
    username: str
    created_at: datetime
    
    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

class Character(BaseModel):
    id: str = Field(alias="_id")
    name: str
    title: str
    description: str
    long_description: str
    color_scheme: dict
    image_url: str
    abilities: List[str]
    species: str
    residence: str
    theme_song: str
    
    class Config:
        populate_by_name = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: User

# Authentication functions
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = await db.users.find_one({"_id": user_id})
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user

# Initialize characters data
async def init_characters():
    characters_data = [
        {
            "_id": "reimu-hakurei",
            "name": "Reimu Hakurei",
            "title": "Shrine Maiden of Paradise",
            "description": "The shrine maiden of the Hakurei Shrine. She is quite easygoing for the most part, but is highly dedicated to her duty of maintaining the balance between Gensokyo and the outside world.",
            "long_description": "Reimu Hakurei is the main protagonist of the Touhou series, and the shrine maiden of Hakurei Shrine. As the shrine maiden, she is commonly called upon (or calls it upon herself) to investigate and resolve incidents in Gensokyo. Reimu has a great spiritual power and is experienced in using it, and she is in charge of the Hakurei Border, which is the main gateway between Gensokyo and the Outside World.",
            "color_scheme": {
                "primary": "#DC2626",
                "secondary": "#FFFFFF",
                "accent": "#FCA5A5",
                "background": "linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%)"
            },
            "image_url": "https://img.favpng.com/2/14/2/reimu-hakurei-touhou-project-model-figure-sega-touhou-kourindou-curiosities-of-lotus-asia-png-favpng-0UwDE8nBDbJxZBx4j5x2y2rxK_t.jpg",
            "abilities": ["Spiritual Power", "Flight", "Hakurei Border Manipulation", "Yin-Yang Orb Control"],
            "species": "Human",
            "residence": "Hakurei Shrine",
            "theme_song": "Maiden's Capriccio ~ Dream Battle"
        },
        {
            "_id": "marisa-kirisame",
            "name": "Marisa Kirisame",
            "title": "Ordinary Magician",
            "description": "An ordinary human magician who specializes in light and heat magic. She loves to collect things, and has a habit of 'borrowing' things and never returning them.",
            "long_description": "Marisa Kirisame is the deuteragonist of the Touhou Project series alongside Reimu. She's an ordinary human magician who specializes in light and heat magic and currently resides in the Forest of Magic. She has a compulsive mania for collecting things, and is considered to be the number one thief in Gensokyo, though she apparently 'borrows' rather than 'steals'.",
            "color_scheme": {
                "primary": "#1F2937",
                "secondary": "#FDE047",
                "accent": "#A3A3A3",
                "background": "linear-gradient(135deg, #1F2937 0%, #374151 50%, #4B5563 100%)"
            },
            "image_url": "https://images.unsplash.com/photo-1613376023733-0a73315d9b06",
            "abilities": ["Light Magic", "Heat Magic", "Master Spark", "Broom Flying"],
            "species": "Human",
            "residence": "Forest of Magic",
            "theme_song": "Love-Colored Master Spark"
        },
        {
            "_id": "sakuya-izayoi",
            "name": "Sakuya Izayoi",
            "title": "Perfect and Elegant Maid",
            "description": "The head maid of the Scarlet Devil Mansion. She has the ability to manipulate time and is skilled with throwing knives. She serves her mistress Remilia with absolute dedication.",
            "long_description": "Sakuya Izayoi is the Chief Maid who serves Remilia Scarlet, the head of the Scarlet Devil Mansion. She is the only human living in the Scarlet Devil Mansion. She has the power to manipulate time, and is known for her skill with knives. She can slow down time, speed it up, and stop time entirely.",
            "color_scheme": {
                "primary": "#1E40AF",
                "secondary": "#E5E7EB",
                "accent": "#60A5FA",
                "background": "linear-gradient(135deg, #1E40AF 0%, #1D4ED8 50%, #2563EB 100%)"
            },
            "image_url": "https://images.unsplash.com/photo-1668119064420-fb738fb05e32",
            "abilities": ["Time Manipulation", "Knife Throwing", "Perfect Maid Skills", "Silver Manipulation"],
            "species": "Human",
            "residence": "Scarlet Devil Mansion",
            "theme_song": "Luna Dial"
        },
        {
            "_id": "remilia-scarlet",
            "name": "Remilia Scarlet",
            "title": "Eternally Young Scarlet Moon",
            "description": "The owner and head of the Scarlet Devil Mansion, known as the Scarlet Devil. She is a vampire who claims to be a descendant of Vlad Tepes.",
            "long_description": "Remilia Scarlet is the owner and head of the Scarlet Devil Mansion, the mistress of Sakuya Izayoi and Hong Meiling, and the older sister (and guardian) of Flandre Scarlet. Though her appearance (and often behavior) is childlike, and seems nonthreatening, she has fearsome magical powers and a reputation to match, being known throughout Gensokyo as the dangerous 'Scarlet Devil'.",
            "color_scheme": {
                "primary": "#7F1D1D",
                "secondary": "#1F2937",
                "accent": "#EF4444",
                "background": "linear-gradient(135deg, #7F1D1D 0%, #991B1B 50%, #B91C1C 100%)"
            },
            "image_url": "https://img.favpng.com/21/8/4/touhou-game-sweeper-of-suika-touhou-project-character-png-favpng-J9pkgHiKaDqamKfcpBdLMqggw_t.jpg",
            "abilities": ["Fate Manipulation", "Mist Transformation", "Vampiric Powers", "Charisma"],
            "species": "Vampire",
            "residence": "Scarlet Devil Mansion",
            "theme_song": "Septette for a Dead Princess"
        },
        {
            "_id": "flandre-scarlet",
            "name": "Flandre Scarlet",
            "title": "Sister of the Devil",
            "description": "Remilia's younger sister, also a vampire. She has been confined in the basement of the Scarlet Devil Mansion for 495 years. She has the frightening ability to destroy anything.",
            "long_description": "Flandre Scarlet is the younger sister of Remilia Scarlet and a vampire who lives in the Scarlet Devil Mansion's basement. She is known for her ability to destroy absolutely anything by manipulating its 'eye' - a mental weak point that exists on everything. Her power is so dangerous that she was sealed away in the basement for everyone's safety.",
            "color_scheme": {
                "primary": "#DC2626",
                "secondary": "#FBBF24",
                "accent": "#8B5CF6",
                "background": "linear-gradient(135deg, #DC2626 0%, #F59E0B 25%, #8B5CF6 50%, #EC4899 75%, #DC2626 100%)"
            },
            "image_url": "https://img.favpng.com/5/7/9/cirno-touhou-project-strength-project-art-illustration-png-favpng-vK7zHVSAG2eKAHcZzpx8re24L_t.jpg",
            "abilities": ["Destruction of Everything", "Crystal Wings", "Vampiric Powers", "Levitation"],
            "species": "Vampire",
            "residence": "Scarlet Devil Mansion (Basement)",
            "theme_song": "U.N. Owen Was Her?"
        }
    ]
    
    # Check if characters already exist
    existing_count = await db.characters.count_documents({})
    if existing_count == 0:
        await db.characters.insert_many(characters_data)
        print("Characters initialized successfully")

@app.on_event("startup")
async def startup_event():
    await init_characters()

# API Routes
@app.get("/")
async def root():
    return {"message": "Touhou Project API is running"}

@app.post("/api/auth/register", response_model=TokenResponse)
async def register(user_data: UserCreate):
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    user_id = str(uuid.uuid4())
    hashed_password = hash_password(user_data.password)
    username = user_data.username or user_data.email.split('@')[0]
    
    user_doc = {
        "_id": user_id,
        "email": user_data.email,
        "password": hashed_password,
        "username": username,
        "created_at": datetime.now(timezone.utc)
    }
    
    await db.users.insert_one(user_doc)
    
    # Create access token
    access_token = create_access_token(data={"sub": user_id})
    
    user = User(**user_doc)
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=user
    )

@app.post("/api/auth/login", response_model=TokenResponse)
async def login(user_data: UserLogin):
    # Find user
    user = await db.users.find_one({"email": user_data.email})
    if not user or not verify_password(user_data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Create access token
    access_token = create_access_token(data={"sub": user["_id"]})
    
    user_obj = User(**user)
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=user_obj
    )

@app.get("/api/characters", response_model=List[Character])
async def get_characters():
    characters = await db.characters.find().to_list(length=None)
    return [Character(**char) for char in characters]

@app.get("/api/characters/{character_id}", response_model=Character)
async def get_character(character_id: str):
    character = await db.characters.find_one({"_id": character_id})
    if not character:
        raise HTTPException(status_code=404, detail="Character not found")
    return Character(**character)

@app.get("/api/profile")
async def get_profile(current_user: dict = Depends(get_current_user)):
    return User(**current_user)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)