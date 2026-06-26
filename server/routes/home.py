from flask import Blueprint

from database.connection import get_db_connection

home_bp = Blueprint("home", __name__)


@home_bp.route("/home/stats", methods=["GET"])
def get_home_stats():

    conn = get_db_connection()
    cur = conn.cursor()

    # Total users
    cur.execute("""
        SELECT COUNT(*)
        FROM users
    """)
    total_users = cur.fetchone()[0]

    # Approved items
    cur.execute("""
        SELECT COUNT(*)
        FROM items
        WHERE status='approved'
    """)
    approved_items = cur.fetchone()[0]

    # Resolved items
    cur.execute("""
        SELECT COUNT(*)
        FROM items
        WHERE status='resolved'
    """)
    resolved_items = cur.fetchone()[0]

    cur.close()
    conn.close()

    return {
        "users": total_users,
        "approved_items": approved_items,
        "resolved_items": resolved_items
    }