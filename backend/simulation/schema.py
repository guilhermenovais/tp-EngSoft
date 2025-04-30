from marshmallow import Schema, fields


class SimulacaoSchema(Schema):
    id = fields.Int(dump_only=True)
    nome = fields.Str(required=True)
    id_autor = fields.Int(required=True)
    valor_total = fields.Float(required=True)
    entrada = fields.Float(required=True)
    juros = fields.Float(required=True)
    inflacao = fields.Float(required=True)
    qtd_parcelas = fields.Int(required=True)
    tabela = fields.Str(required=True)
