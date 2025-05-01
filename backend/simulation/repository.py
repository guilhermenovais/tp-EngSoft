from simulation.model import Simulacao
from main import db


class SimulacaoRepository:
    def create(self, data):
        simulacao = Simulacao(**data)
        db.session.add(simulacao)
        db.session.commit()
        return simulacao

    def get_by_id(self, id):
        return Simulacao.query.get(id)

    def update(self, id, data):
        simulacao = Simulacao.query.get(id)
        if simulacao:
            for key, value in data.items():
                setattr(simulacao, key, value)
            db.session.commit()
        return simulacao

    def delete(self, id):
        simulacao = Simulacao.query.get(id)
        if simulacao:
            db.session.delete(simulacao)
            db.session.commit()
        return simulacao
