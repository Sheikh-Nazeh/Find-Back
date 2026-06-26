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

@users_bp.route("/admin/users", methods=["GET"])
@jwt_required()
def get_all_users():

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            id,
            full_name,
            email,
            role,
            created_at
        FROM users
        ORDER BY created_at DESC
    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    users = []

    for row in rows:
        users.append({
            "id": str(row[0]),
            "full_name": row[1],
            "email": row[2],
            "role": row[3],
            "created_at": str(row[4]),
        })

    return users

