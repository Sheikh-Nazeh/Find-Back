from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from database.connection import get_db_connection

items_bp = Blueprint("items", __name__)

@items_bp.route("/items", methods=["POST"])
@jwt_required()
def create_item():

    user_id = get_jwt_identity()

    data = request.get_json()

    title = data.get("title")
    description = data.get("description")
    category = data.get("category")
    item_type = data.get("item_type")
    location = data.get("location")
    reported_date = data.get("reported_date")

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO items (
            user_id,
            title,
            description,
            category,
            item_type,
            location,
            reported_date,
            status
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
        RETURNING id
    """, (
        user_id,
        title,
        description,
        category,
        item_type,
        location,
        reported_date,
        "pending"
    ))

    item_id = cur.fetchone()[0]

    conn.commit()

    cur.close()
    conn.close()

    return {
        "message": "Item submitted successfully",
        "item_id": str(item_id)
    }, 201