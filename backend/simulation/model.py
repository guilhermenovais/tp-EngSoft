from extensions import db


class Simulacao(db.Model):
    __tablename__ = "simulacao"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    id_autor = db.Column(db.Integer, nullable=False)
    valor_total = db.Column(db.Float, nullable=False)
    entrada = db.Column(db.Float, nullable=False)
    juros = db.Column(db.Float, nullable=False)
    inflacao = db.Column(db.Float, nullable=False)
    qtd_parcelas = db.Column(db.Integer, nullable=False)
    tabela = db.Column(db.String(50), nullable=False)
