class SimulacaoService:
    def __init__(self, repository):
        self.repository = repository

    def create(self, data):
        return self.repository.create(data)

    def get_by_id(self, id):
        return self.repository.get_by_id(id)

    def update(self, id, data):
        return self.repository.update(id, data)

    def delete(self, id):
        return self.repository.delete(id)
