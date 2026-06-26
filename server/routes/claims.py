from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

from database.connection import get_db_connection

claims_bp = Blueprint("claims", __name__)


@claims_bp.route("/claims", methods=["POST"])
@jwt_required()
def create_claim():

    claimant_id = get_jwt_identity()

    data = request.get_json()

    item_id = data.get("item_id")
    message = data.get("message")

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO claims (
            item_id,
            claimant_id,
            message
        )
        VALUES (%s,%s,%s)
        RETURNING id
    """, (
        item_id,
        claimant_id,
        message
    ))

    claim_id = cur.fetchone()[0]

    conn.commit()

    cur.close()
    conn.close()

    return {
        "message": "Claim submitted successfully",
        "claim_id": str(claim_id)
    }, 201

@claims_bp.route("/admin/claims", methods=["GET"])
@jwt_required()
def get_claims():

    claims = get_jwt()

    if claims.get("role") != "admin":
        return {"message": "Unauthorized"}, 403

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            claims.id,
            items.title,
            users.full_name,
            claims.message,
            claims.status,
            claims.created_at
        FROM claims
        JOIN items
            ON claims.item_id = items.id
        JOIN users
            ON claims.claimant_id = users.id
        WHERE claims.status='pending'
        ORDER BY claims.created_at DESC
    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    result = []

    for row in rows:
        result.append({
            "id": str(row[0]),
            "item_title": row[1],
            "claimant": row[2],
            "message": row[3],
            "status": row[4],
            "created_at": str(row[5])
        })

    return result

@claims_bp.route("/admin/claims/<claim_id>/approve", methods=["PUT"])
@jwt_required()
def approve_claim(claim_id):

    claims = get_jwt()

    if claims.get("role") != "admin":
        return {"message": "Unauthorized"}, 403

    conn = get_db_connection()
    cur = conn.cursor()

    # Get the item linked to this claim
    cur.execute("""
        SELECT item_id
        FROM claims
        WHERE id=%s
    """, (claim_id,))

    row = cur.fetchone()

    if not row:
        cur.close()
        conn.close()
        return {"message": "Claim not found"}, 404

    item_id = row[0]

    # Approve this claim
    cur.execute("""
        UPDATE claims
        SET status='approved'
        WHERE id=%s
    """, (claim_id,))

    # Mark the item as claimed
    cur.execute("""
        UPDATE items
        SET status='claimed'
        WHERE id=%s
    """, (item_id,))

    conn.commit()

    cur.close()
    conn.close()

    return {
        "message": "Claim approved"
    }

@claims_bp.route("/admin/claims/<claim_id>/reject", methods=["PUT"])
@jwt_required()
def reject_claim(claim_id):

    claims = get_jwt()

    if claims.get("role") != "admin":
        return {"message": "Unauthorized"}, 403

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE claims
        SET status='rejected'
        WHERE id=%s
    """, (claim_id,))

    conn.commit()

    cur.close()
    conn.close()

    return {
        "message": "Claim rejected"
    }