from flask import Blueprint, request, jsonify
from simulation.service import SimulacaoService
from simulation.repository import SimulacaoRepository
from simulation.schema import SimulacaoSchema

bp = Blueprint("simulacoes", __name__, url_prefix="/simulacao")

repository = SimulacaoRepository()
service = SimulacaoService(repository)
schema = SimulacaoSchema()


@bp.route("", methods=["POST"])
def create_simulacao():
    data = request.get_json()
    errors = schema.validate(data)
    if errors:
        return jsonify(errors), 400
    simulacao = service.create(data)
    return jsonify(schema.dump(simulacao)), 201


@bp.route("/<int:id>", methods=["GET"])
def get_simulacao(id):
    simulacao = service.get_by_id(id)
    if not simulacao:
        return jsonify({"error": "Simulação não encontrada"}), 404
    return jsonify(schema.dump(simulacao))


@bp.route("/getAll", methods=["GET"])
def get_all():
    simulacao = service.get_all()
    list_schema = SimulacaoSchema(many=True)
    return jsonify(list_schema.dump(simulacao)), 200


@bp.route("/<int:id>", methods=["PUT"])
def update_simulacao(id):
    data = request.get_json()
    errors = schema.validate(data)
    if errors:
        return jsonify(errors), 400
    simulacao = service.update(id, data)
    if not simulacao:
        return jsonify({"error": "Simulação não encontrada"}), 404
    return jsonify(schema.dump(simulacao))


@bp.route("/<int:id>", methods=["DELETE"])
def delete_simulacao(id):
    simulacao = service.delete(id)
    if not simulacao:
        return jsonify({"error": "Simulação não encontrada"}), 404
    return "", 204
