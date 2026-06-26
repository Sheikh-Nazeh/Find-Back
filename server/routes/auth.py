from flask import Blueprint, request
from database.connection import get_db_connection
import bcrypt
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    full_name = data.get("full_name")
    email = data.get("email")
    password = data.get("password")

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO users
        (
            full_name,
            email,
            password_hash
        )
        VALUES (%s,%s,%s)
        RETURNING id
    """, (
        full_name,
        email,
        hashed_password
    ))

    user_id = cur.fetchone()[0]

    conn.commit()

    cur.close()
    conn.close()

    return {
        "message": "User registered successfully",
        "user_id": str(user_id)
    }, 201

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            id,
            full_name,
            email,
            password_hash,
            role
        FROM users
        WHERE email = %s
    """, (email,))

    user = cur.fetchone()

    cur.close()
    conn.close()

    if not user:
        return {
            "message": "Invalid email or password"
        }, 401

    user_id, full_name, user_email, password_hash, role = user

    if not bcrypt.checkpw(
        password.encode("utf-8"),
        password_hash.encode("utf-8")
    ):
        return {
            "message": "Invalid email or password"
        }, 401

    access_token = create_access_token(
        identity=str(user_id),
        additional_claims={
            "role": role
        }
    )

    return {
        "message": "Login successful",
        "token": access_token,
        "user": {
            "id": str(user_id),
            "full_name": full_name,
            "email": user_email,
            "role": role
        }
    }