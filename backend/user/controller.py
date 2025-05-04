from flask import Blueprint, request, jsonify
from user.schema import UserSchema, UserLoginSchema
from user.repository import UserRepository
from user.service import UserService

bp = Blueprint("users", __name__, url_prefix="/users")

cadastro_schema = UserSchema()
login_schema = UserLoginSchema()
repository = UserRepository()
service = UserService(repository)

@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
  
    errors = login_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    usuario = service.login(data["email"], data["password"])
    if not usuario:
        return jsonify({"error": "Login inválido"}), 401

    return jsonify({
        "id": usuario["id"],
        "username": usuario["nome"],
        "email": usuario["email"]
    }), 200


@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    errors = cadastro_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    try:
        usuario = service.registrar(data)
        return jsonify(cadastro_schema.dump(usuario)), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
