from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from config import Config

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = Config.SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = Config.SQLALCHEMY_TRACK_MODIFICATIONS

db = SQLAlchemy(app)
ma = Marshmallow(app)

from simulation.controller import bp as simulacoes_bp

from simulation.model import Simulacao

with app.app_context():
    db.create_all()

app.register_blueprint(simulacoes_bp)

if __name__ == "__main__":
    app.run(debug=True)
