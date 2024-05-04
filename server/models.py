from database import Base
from sqlalchemy import Column, String, Boolean, Integer, ForeignKey
from sqlalchemy.orm import relationship
from utils import generate_password_hash, verify_password_hash


class User(Base):
    __tablename__ = "User"
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True)
    phone = Column(String, unique=True)
    password = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    sur_name = Column(String)
    date_of_birth = Column(String)
    gender = Column(String)
    address = Column(String)
    is_admin = Column(Boolean)
    doctor = relationship("Doctor", back_populates="user", uselist=False)
    patient = relationship("Patient", back_populates="user", uselist=False)
    is_archived = Column(Boolean)

    def check_password(self, password):
        # check = verify_password_hash(
        #     password,
        #     self.password,
        # )
        return password == self.password


class Patient(Base):
    __tablename__ = "Patient"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("User.id"))
    user = relationship("User", back_populates="patient")
    doctor_id = Column(Integer, ForeignKey("Doctor.id"))
    doctor = relationship("Doctor", back_populates="patients")
    ecg_diagrams = relationship("ECGDiagram", back_populates="patient")


class Doctor(Base):
    __tablename__ = "Doctor"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("User.id"))
    user = relationship("User", back_populates="doctor")
    patients = relationship("Patient", back_populates="doctor")


class ECGDiagram(Base):
    __tablename__ = "ECGDiagram"
    id = Column(Integer, primary_key=True, autoincrement=True)
    patient_id = Column(Integer, ForeignKey("Patient.id"))
    patient = relationship("Patient", back_populates="ecg_diagrams")
    data_values = Column(String)
    time_data = Column(String)

    def get_ecg_values(self):
        return [float(value) for value in self.data_values.split(",")]

    def get_time_values(self):
        return [float(time) for time in self.time_data.split(",")]
