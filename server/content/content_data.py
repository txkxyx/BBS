from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, INT, VARCHAR, DATETIME
from util import service

Base = declarative_base()


class Contents(Base):
    __tablename__ = 'CONTENTS'
    columns = ["id", "name", "text", "insert_date"]

    id = Column(INT, primary_key=True, autoincrement=True)
    name = Column(VARCHAR(64))
    text = Column(VARCHAR(300))
    insert_date = Column(DATETIME)

    def __init__(self, name, text, insert_date):
        self.name = name
        self.text = text
        self.insert_date = insert_date


def getAll(session):
    contents = session.query(Contents).all()
    result = service.object_to_listjson(contents)
    return result
