import re
from typing import Optional

from fastapi import FastAPI, Depends, HTTPException, Header
from database import SessionLocal, engine
from sqlalchemy.orm import Session
import models
from utils import get_token, get_user_by_token
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

models.Base.metadata.create_all(bind=engine)


def db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def insert_users(session, num_users):
    users = [
        models.User(
            email="test@gmail.com",
            password="<PASSWORD>",
            first_name="test",
            last_name="test",
            phone="+380666666661",
            date_of_birth="12:03:2003",
            gender="Male",
            address="test",
            sur_name="test",
            is_admin=True,
        ),
        models.User(
            email="test1@gmail.com",
            password="<PASSWORD>",
            first_name="test",
            last_name="test",
            phone="+380666666662",
            date_of_birth="12:03:2003",
            gender="Male",
            address="test",
            sur_name="test",
            is_admin=False,
        ),
        models.User(
            email="test2@gmail.com",
            password="<PASSWORD>",
            first_name="test",
            last_name="test",
            phone="+380666666663",
            date_of_birth="12:03:2003",
            gender="Male",
            address="test",
            sur_name="test",
            is_admin=False,
        ),
        models.User(
            email="admin@admin.com",
            password="<PASSWORD>",
            first_name="test",
            last_name="test",
            phone="+380666666664",
            date_of_birth="12:03:2003",
            gender="Male",
            address="test",
            sur_name="test",
            is_admin=False,
        ),
    ]
    doctors = [models.Doctor(user_id=1), models.Doctor(user_id=2)]
    patients = [
        models.Patient(
            user_id=3,
            doctor_id=1,
        ),
        models.Patient(
            user_id=4,
            doctor_id=1,
        ),
    ]
    # diargam = [models.ECGDiagram(name="")]
    # session.add_all(users)
    # session.add_all(doctors)
    # session.add_all(patients)
    # session.add_all(diargam)
    session.commit()


session = next(db())

insert_users(session, 10)


@app.get("/")
async def root():
    return {"message": "Hello 113212323"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


class UserMe(BaseModel):
    token: str


class UserLogin(BaseModel):
    emailOrPhone: str
    password: str


def auth_middleware(
    authorization: Optional[str] = Header(None), db: Session = Depends(db)
):
    if authorization is None:
        raise HTTPException(status_code=401, detail="Unauthorized")
    if not authorization.startswith("JWT"):
        raise HTTPException(status_code=401, detail="Unauthorized")
    auth = authorization.split(" ")[1]
    if auth != "null":
        return get_user_by_token(db, auth)
    else:
        return None


@app.post("/api/me")
async def me(
    user: Optional[dict] = Depends(auth_middleware), db: Session = Depends(db)
):
    success = False
    if user:
        success = True
        user_in_doctor_table = (
            db.query(models.Doctor).filter(models.Doctor.user_id == user.id).first()
        )
        user_in_patient_table = (
            db.query(models.Patient).filter(models.Patient.user_id == user.id).first()
        )
        res = dict(
            (column.name, getattr(user, column.name))
            for column in user.__table__.columns
        )
        if user_in_patient_table is not None:
            res["patient"] = dict(
                (column.name, getattr(user_in_patient_table, column.name))
                for column in user_in_patient_table.__table__.columns
            )
        if user_in_doctor_table is not None:
            res["doctor"] = dict(
                (column.name, getattr(user_in_doctor_table, column.name))
                for column in user_in_doctor_table.__table__.columns
            )
        return {
            "success": success,
            "user": res,
        }
    else:
        return {"success": success, "message": "User not found"}


@app.get("/api/my-patients")
async def get_my_patients(
    user: Optional[dict] = Depends(auth_middleware), db: Session = Depends(db)
):
    doctor = db.query(models.Doctor).filter(models.Doctor.user_id == user.id).first()
    patients = (
        db.query(models.Patient).filter(models.Patient.doctor_id == doctor.id).all()
    )
    ls = []
    for pat in patients:
        user_patient = (
            db.query(models.User).filter(models.User.id == pat.user_id).first()
        )
        res = dict(
            (column.name, getattr(user_patient, column.name))
            for column in user_patient.__table__.columns
        )
        res["patient"] = dict(
            (column.name, getattr(pat, column.name)) for column in pat.__table__.columns
        )
        ls.append(res)
    return ls


@app.get("/api/refresh-token")
async def refresh_token():
    pass


@app.get("/api/verify-token")
async def verify_token(payload: str):
    pass


@app.post("/api/login")
async def login(login_data: UserLogin, db: Session = Depends(db)) -> dict:
    password = login_data.password
    emailOrPhone = login_data.emailOrPhone
    success = False
    if re.match(r"^(\+?\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$", emailOrPhone):
        user = db.query(models.User).filter(models.User.phone == emailOrPhone).first()
        if user:
            if user.check_password(password):
                success = True
                token = get_token(user)
                return {
                    "message": f"Login with email: {emailOrPhone}",
                    "success": success,
                    "token": token,
                }
            else:
                return {
                    "message": f"Failed login credentials",
                    "success": success,
                }
    elif re.match(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", emailOrPhone):
        user = db.query(models.User).filter(models.User.email == emailOrPhone).first()
        if user:
            if user.check_password(password):
                success = True
                token = get_token(user)
                return {
                    "message": f"Login with email: {emailOrPhone}",
                    "success": success,
                    "token": token,
                }
            else:
                return {
                    "message": f"Failed login credentials",
                    "success": success,
                }
        return {
            "message": f"Failed login credentials",
            "success": success,
        }
    else:
        return {"message": "Invalid phone number or email", "success": success}


@app.post("/register")
async def register(phone: str, email: str, password: str):
    pass


@app.post("/change-password")
async def change_password(phone: str, email: str, old_password: str, new_password: str):
    pass


@app.get("/users")
async def get_users(db: Session = Depends(db)):
    users = db.query(models.User).all()
    ls = []
    for user in users:
        res = dict(
            (column.name, getattr(user, column.name))
            for column in user.__table__.columns
        )
        user_in_doctor_table = (
            db.query(models.Doctor).filter(models.Doctor.user_id == user.id).first()
        )
        user_in_patient_table = (
            db.query(models.Patient).filter(models.Patient.user_id == user.id).first()
        )
        if user_in_patient_table is not None:
            res["patient"] = dict(
                (column.name, getattr(user_in_patient_table, column.name))
                for column in user_in_patient_table.__table__.columns
            )
        if user_in_doctor_table is not None:
            res["doctor"] = dict(
                (column.name, getattr(user_in_doctor_table, column.name))
                for column in user_in_doctor_table.__table__.columns
            )
        ls.append(res)
    return ls


@app.get("/doctors")
async def get_users(db: Session = Depends(db)):
    users = db.query(models.Doctor).all()
    return users


@app.get("/ecg-diagrams")
async def get_users(db: Session = Depends(db)):
    users = db.query(models.ECGDiagram).all()
    return users
