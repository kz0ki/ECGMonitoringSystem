import datetime
import os

import hashlib
import jwt

import models
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

SECRET_KEY = os.environ.get("SECRET_KEY")
EMAIL_FROM = os.environ.get("EMAIL_FROM")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD")
EMAIL_HOST = os.environ.get("EMAIL_HOST")
EMAIL_PORT = os.environ.get("EMAIL_PORT")


def get_token(user):
    expiration_date = datetime.datetime.utcnow() + datetime.timedelta(days=30)

    payload = {
        "email": user.email,
        "phone": user.phone,
        "exp": expiration_date,
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token


def get_payload(token):
    return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])


def get_user_by_payload(db, payload):
    user = (
        db.query(models.User)
        .filter_by(
            email=payload.get(
                "email",
            )
        )
        .first()
    )
    return user


def get_user_by_token(db, token):
    payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    return get_user_by_payload(db, payload)


def generate_password_hash(password):
    return hashlib.md5((password + "salt").encode("utf-8")).hexdigest()


def verify_password_hash(password, hashed_password):
    return generate_password_hash(password + "salt") == hashed_password


def send_password(email, password, phone):
    msg = MIMEMultipart()
    msg["From"] = EMAIL_FROM
    msg["To"] = email
    msg["Subject"] = "Account successful created"
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Creation Successful</title>
    </head>
    <body>
        <h1>Account Creation Successful</h1>
        <p>Your account has been successfully created with the following details:</p>
        <ul>
            <li><strong>Email:</strong> {email}</li>
            <li><strong>Phone:</strong> {phone}</li>
            <li><strong>Password:</strong> {password}</li>
        </ul>
        <p>You can use email or phone for login </p>
    </body>
    </html>
    """.format(
        email=email, phone=phone, password=password
    )

    msg.attach(MIMEText(html_content, "html"))
    with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
        server.starttls()
        server.login(EMAIL_FROM, EMAIL_PASSWORD)
        server.send_message(msg)
