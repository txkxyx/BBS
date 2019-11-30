from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, INT, VARCHAR, DATETIME

Base = declarative_base()


class User(Base):

    __tablename__ = "USER"

    id = Column(INT, primary_key=True, autoincrement=True)
    name = Column(VARCHAR(3640))
    address = Column(VARCHAR(64))
    password = Column(VARCHAR(255))

    def __init__(self, id, name, address, password):
        self.id = id
        self.name = name
        self.address = address
        self.password = password

    def __str__(self):
        return 'User(name=%s)' % self.name
