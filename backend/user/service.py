from user.model import User

class UserService:
    def __init__(self, repository):
        self.repository = repository

    def login(self, email, password):
        usuario = self.repository.get_by_email(email)
        if usuario:
            print("usuário encontrado:", usuario.to_dict(), flush=True)
            
            if usuario.password == password:
                return usuario.to_dict()
            else:
                print("senha incorreta.", flush=True)
        else:
            print("usuario não encontrado", flush=True)
        return None

    def registrar(self, data):
        if self.repository.get_by_email(data["email"]):
            raise ValueError("Email já cadastrado")
        
        return self.repository.create(data)
