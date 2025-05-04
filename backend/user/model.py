from extensions import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<Usuario id={self.id} nome='{self.username}' email='{self.email}'>"

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.username,
            "email": self.email,
            "password": self.password
        }