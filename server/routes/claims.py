from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

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