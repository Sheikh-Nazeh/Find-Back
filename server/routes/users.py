from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from database.connection import get_db_connection

users_bp = Blueprint("users", __name__)


@users_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():

    user_id = get_jwt_identity()

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            id,
            full_name,
            email,
            phone,
            role,
            created_at
        FROM users
        WHERE id = %s
    """, (user_id,))

    user = cur.fetchone()

    cur.close()
    conn.close()

    return {
        "id": str(user[0]),
        "full_name": user[1],
        "email": user[2],
        "phone": user[3],
        "role": user[4],
        "created_at": str(user[5])
    }

@users_bp.route("/profile", methods=["PUT"])
@jwt_required()
def update_profile():

    user_id = get_jwt_identity()

    data = request.get_json()

    full_name = data.get("full_name")
    phone = data.get("phone")

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE users
        SET
            full_name=%s,
            phone=%s
        WHERE id=%s
    """, (
        full_name,
        phone,
        user_id
    ))

    conn.commit()

    cur.close()
    conn.close()

    return {
        "message": "Profile updated"
    }

