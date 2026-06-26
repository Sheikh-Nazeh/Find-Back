from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

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

@items_bp.route("/items", methods=["GET"])
def get_items():

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            id,
            title,
            category,
            item_type,
            location,
            reported_date,
            image_url
        FROM items
        WHERE status = 'approved'
        ORDER BY created_at DESC
    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    items = []

    for row in rows:
        items.append({
            "id": str(row[0]),
            "title": row[1],
            "category": row[2],
            "type": row[3].capitalize(),
            "location": row[4],
            "date": str(row[5]),
            "image": row[6] or "https://placehold.co/600x400?text=No+Image"
        })

    return items

@items_bp.route("/admin/reports/pending", methods=["GET"])
@jwt_required()
def get_pending_reports():

    claims = get_jwt()

    if claims.get("role") != "admin":
        return {"message": "Unauthorized"}, 403

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            id,
            title,
            description,
            category,
            item_type,
            location,
            reported_date,
            status
        FROM items
        WHERE status='pending'
        ORDER BY created_at DESC
    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    reports = []

    for row in rows:
        reports.append({
            "id": str(row[0]),
            "title": row[1],
            "description": row[2],
            "category": row[3],
            "item_type": row[4],
            "location": row[5],
            "reported_date": str(row[6]),
            "status": row[7]
        })

    return reports