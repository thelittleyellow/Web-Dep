# API Contracts & Integration Plan

## Backend API Endpoints

### User Registration
**POST /api/auth/register**
```json
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response (Success - 201):
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "unique_user_id",
    "email": "user@example.com",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}

Response (Error - 400):
{
  "success": false,
  "message": "User already exists" | "Invalid email format" | "Password too short"
}
```

### User Login (Future)
**POST /api/auth/login**
```json
Request:
{
  "email": "user@example.com", 
  "password": "password123"
}

Response (Success - 200):
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "unique_user_id",
    "email": "user@example.com"
  }
}
```

## Database Models

### User Model
```python
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

## Mock Data Replacement

### Current Mock Implementation (to be replaced):
- **File**: `/app/frontend/src/components/mock.js`
- **Function**: `mockSignUp()` 
- **Storage**: localStorage
- **Social Login**: Mock toast notifications

### New Real Implementation:
- **API Calls**: axios calls to `/api/auth/register`
- **Storage**: MongoDB database
- **Validation**: Backend email/password validation
- **Error Handling**: Proper HTTP status codes and messages
- **Security**: Password hashing with bcrypt

## Frontend Integration Changes

### Files to Update:
1. **SignUpForm.jsx**: Replace mock calls with real API calls
2. **Remove mock.js**: No longer needed
3. **Add error handling**: Display backend validation errors

### Integration Steps:
1. Install bcrypt and password hashing dependencies
2. Create User model with MongoDB schema
3. Implement registration endpoint with validation
4. Update frontend to call real API
5. Test complete flow: form submission → API → database → response

## Security Features:
- Password hashing using bcrypt
- Email format validation
- Duplicate user prevention
- Input sanitization
- Error message standardization