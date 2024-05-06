from pydantic import BaseModel


class UserMe(BaseModel):
    token: str


class CodeGenerate(BaseModel):
    email: str
    first_name: str
    last_name: str


class CodeVerify(BaseModel):
    code: int
    email: str


class UserLogin(BaseModel):
    emailOrPhone: str
    password: str


class UserDiagram(BaseModel):
    user_id: str


class UserRegister(BaseModel):
    email: str
    phone: str
    first_name: str
    last_name: str
    sur_name: str
    date_of_birth: str
    gender: str
    address: str


class UserUpdate(BaseModel):
    first_name: str
    last_name: str
    sur_name: str
    email: str
    phone: str
    date_of_birth: str
    gender: str
    address: str


class UserPasswordChange(BaseModel):
    old_password: str
    new_password1: str
    new_password2: str
