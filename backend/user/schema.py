from extensions import ma
from user.model import User
from marshmallow import fields

class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        load_instance = True

    id = ma.auto_field(dump_only=True)
    username = ma.auto_field(required=True)
    email = ma.auto_field(required=True)
    password = fields.Str(load_only=True, required=True)

class UserLoginSchema(ma.Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True, load_only=True)

user_schema = UserSchema()
user_login_schema = UserLoginSchema()