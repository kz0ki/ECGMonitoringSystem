FROM python:3.11-slim-bullseye


RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install poetry

COPY pyproject.toml poetry.lock /

RUN poetry config virtualenvs.create false && poetry install
