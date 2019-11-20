# -*- coding: utf-8 -*-
import datetime
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

application = Flask(__name__)
# CROSSの許可
CORS(application)

CONTENTS_PATH = 'bbs/server/contents.json'
USERS_PATH = 'bbs/server/users.json'


def json_write(data_list, path):
    with open(path, 'w') as f:
        json.dump(data_list, f)


def json_load(path):
    with open(path, 'r') as f:
        json_data = json.load(f)
        return json.dumps(json_data)


def get_users():
    users_list = list()
    for user in json.loads(json_load(USERS_PATH)):
        users_list.append(User(user['id'], user['username'], user['password']))
    return users_list


@application.route('/post', methods=['POST'])
def post():
    data = {'name': request.form['name'], 'text': request.form['text'],
            'date': datetime.datetime.now().strftime('%Y/%m/%d %H:%M:%S')}
    data_list = json.loads(json_load(CONTENTS_PATH))
    data_list.insert(0, data)
    json_write(data_list, CONTENTS_PATH)
    return jsonify()


@application.route('/contents')
def getContens():
    data = json_load(CONTENTS_PATH)
    return jsonify(data)


if __name__ == "__main__":
    application.run(host='0.0.0.0')
