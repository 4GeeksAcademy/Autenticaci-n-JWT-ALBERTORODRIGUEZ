"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity 

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"error": "email and password are required"}), 400
    
    existing_user = db.session.execute(select(User).where(
        User.email == email)).scalar_one_or_none()
    

    if existing_user:
        return jsonify({"error": "User with this email alredy exixt"}), 400
    
    new_user = User(email = email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201


@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"error": "email and password are required"}), 400
        
    user = db.session.execute(select(User).where(
        User.email == email)).scalar_one_or_none() 
    if user is None:
        return jsonify({"msg": "Invalid email or password"}), 400
    
    if user.check_password(password):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"msg": "Login successful", "token": access_token}), 200
    else:
        return jsonify({"msg": "Invalid email or password"}), 400
    

@api.route("/profile", methods=["Get"])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = db.session.get(User,int(user_id))
    if not user:
        return jsonify({"msg": "User not found"}), 400
    return jsonify({user.serialize()}), 200



