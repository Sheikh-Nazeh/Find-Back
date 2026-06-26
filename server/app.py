from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from routes.auth import auth_bp
from routes.users import users_bp
from routes.items import items_bp
from routes.claims import claims_bp
from routes.home import home_bp


app = Flask(__name__)

app.config.from_object(Config)

JWTManager(app)

CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(users_bp)
app.register_blueprint(items_bp)
app.register_blueprint(claims_bp)
app.register_blueprint(home_bp)


@app.route("/")
def home():
    return {
        "message": "Find Back API Running"
    }

if __name__ == "__main__":
    app.run(debug=True)