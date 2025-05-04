from flask import Flask
from flask_cors import CORS
from extensions import db, ma
from config import Config

app = Flask(__name__)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = Config.SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = Config.SQLALCHEMY_TRACK_MODIFICATIONS

db.init_app(app)
ma.init_app(app)

from simulation.controller import bp as simulacoes_bp
from user.controller import bp as user_bp

from simulation.model import Simulacao
from user.model import User
with app.app_context():
    db.create_all()

app.register_blueprint(simulacoes_bp)
app.register_blueprint(user_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
