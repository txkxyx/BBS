# -*- coding: utf-8 -*-
import datetime
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from db import db_access, db_config
from content import content_data

application = Flask(__name__)
# CROSSの許可
CORS(application)

# JWT
application.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
jwt = JWTManager(application)


@application.route('/login', methods=['POST'])
def login():
    # if not request.is_json:
    #     return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.form['username']
    password = request.form['password']
    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    if username != 'test' or password != 'test':
        return jsonify({"msg": "Bad username or password"}), 401

    # Identity can be any data that is json serializable
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200


@application.route('/post', methods=['POST'])
def post():
    content = content_data.Contents(
        name=request.form['name'], text=request.form['text'], insert_date=datetime.datetime.now().strftime('%Y/%m/%d %H:%M:%S'))
    session, engine = db_access.init(
        db_config.USER, db_config.HOST, db_config.DATABASE, db_config.PASSWORD)
    result = db_access.add_data(session, content)
    db_access.commit_close(session, engine)
    return jsonify()


@application.route('/contents')
def getContens():
    session, engine = db_access.init(
        db_config.USER, db_config.HOST, db_config.DATABASE, db_config.PASSWORD)
    contents = content_data.getAll(session)
    db_access.commit_close(session, engine)
    return jsonify(contents)


if __name__ == "__main__":
    application.run(host='0.0.0.0')
