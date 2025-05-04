from extensions import db
from user.model import User

class UserRepository:
    def create(self, data):
        user = User(**data)
        db.session.add(user)
        db.session.commit()
        return user

    def get_by_email(self, email):
        return User.query.filter_by(email=email).first()