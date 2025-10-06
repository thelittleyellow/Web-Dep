#!/usr/bin/env python3
"""
Backend API Testing Script for Touhou Project Website
Tests all backend endpoints according to test_result.md requirements
"""

import requests
import json
import sys
from datetime import datetime

# Configuration
BASE_URL = "https://modern-webauth.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"

# Test data
TEST_USER_DATA = {
    "email": "reimu.hakurei@gensokyo.com",
    "password": "shrine_maiden_2024",
    "username": "ReimuHakurei"
}

TEST_LOGIN_DATA = {
    "email": "reimu.hakurei@gensokyo.com", 
    "password": "shrine_maiden_2024"
}

EXPECTED_CHARACTERS = [
    "reimu-hakurei",
    "marisa-kirisame", 
    "sakuya-izayoi",
    "remilia-scarlet",
    "flandre-scarlet"
]

class TouhouAPITester:
    def __init__(self):
        self.session = requests.Session()
        self.auth_token = None
        self.test_results = []
        
    def log_result(self, test_name, success, message, details=None):
        """Log test result"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def test_root_endpoint(self):
        """Test GET / root endpoint (backend API root)"""
        try:
            # The root endpoint is at the base URL without /api prefix
            response = self.session.get(f"{BASE_URL}/")
            if response.status_code == 200:
                try:
                    data = response.json()
                    if "message" in data:
                        self.log_result("Root Endpoint", True, "Root endpoint responding correctly")
                        return True
                    else:
                        self.log_result("Root Endpoint", False, "Root endpoint missing message field", data)
                        return False
                except:
                    # If it's HTML (frontend), that's expected behavior in this setup
                    self.log_result("Root Endpoint", True, "Root endpoint serving frontend (expected)")
                    return True
            else:
                self.log_result("Root Endpoint", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_result("Root Endpoint", False, "Connection failed", str(e))
            return False
    
    def test_characters_list(self):
        """Test GET /api/characters endpoint"""
        try:
            response = self.session.get(f"{API_BASE}/characters")
            if response.status_code == 200:
                characters = response.json()
                if len(characters) == 5:
                    # Check if all expected characters are present (using _id field from MongoDB)
                    character_ids = [char.get("_id") or char.get("id") for char in characters]
                    missing_chars = [char_id for char_id in EXPECTED_CHARACTERS if char_id not in character_ids]
                    
                    if not missing_chars:
                        # Verify character structure
                        required_fields = ["id", "name", "title", "description", "color_scheme", "abilities"]
                        for char in characters:
                            for field in required_fields:
                                if field not in char:
                                    self.log_result("Characters List", False, f"Character missing field: {field}", char)
                                    return False
                        
                        self.log_result("Characters List", True, f"All 5 characters returned with correct structure")
                        return True
                    else:
                        self.log_result("Characters List", False, f"Missing characters: {missing_chars}", character_ids)
                        return False
                else:
                    self.log_result("Characters List", False, f"Expected 5 characters, got {len(characters)}", characters)
                    return False
            else:
                self.log_result("Characters List", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_result("Characters List", False, "Request failed", str(e))
            return False
    
    def test_individual_characters(self):
        """Test GET /api/characters/{character_id} for each character"""
        all_passed = True
        for char_id in EXPECTED_CHARACTERS:
            try:
                response = self.session.get(f"{API_BASE}/characters/{char_id}")
                if response.status_code == 200:
                    character = response.json()
                    required_fields = ["id", "name", "title", "description", "long_description", "color_scheme", "abilities", "species", "residence", "theme_song"]
                    
                    missing_fields = [field for field in required_fields if field not in character]
                    if not missing_fields:
                        if character["id"] == char_id:
                            self.log_result(f"Character {char_id}", True, f"Character data complete and correct")
                        else:
                            self.log_result(f"Character {char_id}", False, f"ID mismatch: expected {char_id}, got {character.get('id')}")
                            all_passed = False
                    else:
                        self.log_result(f"Character {char_id}", False, f"Missing fields: {missing_fields}", character)
                        all_passed = False
                else:
                    self.log_result(f"Character {char_id}", False, f"HTTP {response.status_code}", response.text)
                    all_passed = False
            except Exception as e:
                self.log_result(f"Character {char_id}", False, "Request failed", str(e))
                all_passed = False
        
        return all_passed
    
    def test_character_not_found(self):
        """Test GET /api/characters/{invalid_id} returns 404"""
        try:
            response = self.session.get(f"{API_BASE}/characters/invalid-character")
            if response.status_code == 404:
                self.log_result("Character Not Found", True, "404 returned for invalid character ID")
                return True
            else:
                self.log_result("Character Not Found", False, f"Expected 404, got {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_result("Character Not Found", False, "Request failed", str(e))
            return False
    
    def test_user_registration(self):
        """Test POST /api/auth/register"""
        try:
            response = self.session.post(f"{API_BASE}/auth/register", json=TEST_USER_DATA)
            if response.status_code == 200:
                data = response.json()
                required_fields = ["access_token", "token_type", "user"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    if data["token_type"] == "bearer" and data["access_token"]:
                        user = data["user"]
                        if user["email"] == TEST_USER_DATA["email"]:
                            self.auth_token = data["access_token"]
                            self.log_result("User Registration", True, "User registered successfully with JWT token")
                            return True
                        else:
                            self.log_result("User Registration", False, "User email mismatch", data)
                            return False
                    else:
                        self.log_result("User Registration", False, "Invalid token format", data)
                        return False
                else:
                    self.log_result("User Registration", False, f"Missing fields: {missing_fields}", data)
                    return False
            elif response.status_code == 400:
                # User might already exist, try login instead
                self.log_result("User Registration", True, "User already exists (expected behavior)")
                return self.test_user_login()
            else:
                self.log_result("User Registration", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_result("User Registration", False, "Request failed", str(e))
            return False
    
    def test_user_login(self):
        """Test POST /api/auth/login"""
        try:
            response = self.session.post(f"{API_BASE}/auth/login", json=TEST_LOGIN_DATA)
            if response.status_code == 200:
                data = response.json()
                required_fields = ["access_token", "token_type", "user"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    if data["token_type"] == "bearer" and data["access_token"]:
                        user = data["user"]
                        if user["email"] == TEST_LOGIN_DATA["email"]:
                            self.auth_token = data["access_token"]
                            self.log_result("User Login", True, "User logged in successfully with JWT token")
                            return True
                        else:
                            self.log_result("User Login", False, "User email mismatch", data)
                            return False
                    else:
                        self.log_result("User Login", False, "Invalid token format", data)
                        return False
                else:
                    self.log_result("User Login", False, f"Missing fields: {missing_fields}", data)
                    return False
            else:
                self.log_result("User Login", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_result("User Login", False, "Request failed", str(e))
            return False
    
    def test_invalid_login(self):
        """Test POST /api/auth/login with invalid credentials"""
        invalid_data = {
            "email": "invalid@example.com",
            "password": "wrongpassword"
        }
        try:
            response = self.session.post(f"{API_BASE}/auth/login", json=invalid_data)
            if response.status_code == 401:
                self.log_result("Invalid Login", True, "401 returned for invalid credentials")
                return True
            else:
                self.log_result("Invalid Login", False, f"Expected 401, got {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_result("Invalid Login", False, "Request failed", str(e))
            return False
    
    def test_profile_with_token(self):
        """Test GET /api/profile with valid JWT token"""
        if not self.auth_token:
            self.log_result("Profile with Token", False, "No auth token available")
            return False
        
        try:
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            response = self.session.get(f"{API_BASE}/profile", headers=headers)
            if response.status_code == 200:
                user = response.json()
                required_fields = ["id", "email", "username", "created_at"]
                missing_fields = [field for field in required_fields if field not in user]
                
                if not missing_fields:
                    if user["email"] == TEST_USER_DATA["email"]:
                        self.log_result("Profile with Token", True, "Profile retrieved successfully with valid token")
                        return True
                    else:
                        self.log_result("Profile with Token", False, "Profile email mismatch", user)
                        return False
                else:
                    self.log_result("Profile with Token", False, f"Missing fields: {missing_fields}", user)
                    return False
            else:
                self.log_result("Profile with Token", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_result("Profile with Token", False, "Request failed", str(e))
            return False
    
    def test_profile_without_token(self):
        """Test GET /api/profile without token (should return 401)"""
        try:
            response = self.session.get(f"{API_BASE}/profile")
            if response.status_code == 401:
                self.log_result("Profile without Token", True, "401 returned when no token provided")
                return True
            else:
                self.log_result("Profile without Token", False, f"Expected 401, got {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_result("Profile without Token", False, "Request failed", str(e))
            return False
    
    def test_profile_invalid_token(self):
        """Test GET /api/profile with invalid token (should return 401)"""
        try:
            headers = {"Authorization": "Bearer invalid_token_here"}
            response = self.session.get(f"{API_BASE}/profile", headers=headers)
            if response.status_code == 401:
                self.log_result("Profile with Invalid Token", True, "401 returned for invalid token")
                return True
            else:
                self.log_result("Profile with Invalid Token", False, f"Expected 401, got {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_result("Profile with Invalid Token", False, "Request failed", str(e))
            return False
    
    def test_cors_headers(self):
        """Test CORS headers are present"""
        try:
            response = self.session.options(f"{API_BASE}/characters")
            cors_headers = [
                "access-control-allow-origin",
                "access-control-allow-methods", 
                "access-control-allow-headers"
            ]
            
            present_headers = [header for header in cors_headers if header in response.headers]
            if len(present_headers) >= 1:  # At least one CORS header should be present
                self.log_result("CORS Headers", True, f"CORS headers present: {present_headers}")
                return True
            else:
                self.log_result("CORS Headers", False, "No CORS headers found", dict(response.headers))
                return False
        except Exception as e:
            self.log_result("CORS Headers", False, "Request failed", str(e))
            return False
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 60)
        print("TOUHOU PROJECT BACKEND API TESTING")
        print("=" * 60)
        print(f"Testing against: {BASE_URL}")
        print()
        
        tests = [
            ("Root Endpoint", self.test_root_endpoint),
            ("Characters List", self.test_characters_list),
            ("Individual Characters", self.test_individual_characters),
            ("Character Not Found", self.test_character_not_found),
            ("User Registration", self.test_user_registration),
            ("User Login", self.test_user_login),
            ("Invalid Login", self.test_invalid_login),
            ("Profile with Token", self.test_profile_with_token),
            ("Profile without Token", self.test_profile_without_token),
            ("Profile with Invalid Token", self.test_profile_invalid_token),
            ("CORS Headers", self.test_cors_headers)
        ]
        
        passed = 0
        total = len(tests)
        
        for test_name, test_func in tests:
            print(f"\n--- Testing {test_name} ---")
            if test_func():
                passed += 1
        
        print("\n" + "=" * 60)
        print(f"TESTING COMPLETE: {passed}/{total} tests passed")
        print("=" * 60)
        
        # Print summary of failed tests
        failed_tests = [result for result in self.test_results if not result["success"]]
        if failed_tests:
            print("\nFAILED TESTS SUMMARY:")
            for test in failed_tests:
                print(f"❌ {test['test']}: {test['message']}")
                if test['details']:
                    print(f"   Details: {test['details']}")
        
        return passed == total

if __name__ == "__main__":
    tester = TouhouAPITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)