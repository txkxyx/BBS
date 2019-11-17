import datetime
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

application = Flask(__name__)
CORS(application)


@application.route('/post', methods=['POST'])
def post():
    data = {'name': request.form['name'], 'text': request.form['text'],
            'date': datetime.datetime.now().strftime('%Y/%m/%d %H:%M:%S')}
    data_list = json.loads(json_load())
    data_list.insert(0, data)
    json_write(data_list)
    return jsonify()


@application.route('/contents')
def getContens():
    data = json_load()
    return jsonify(data)


def json_write(data_list):
    with open('bbs/server/contents.json', 'w') as f:
        json.dump(data_list, f)


def json_load():
    with open('bbs/server/contents.json', 'r') as f:
        json_data = json.load(f)
        return json.dumps(json_data)


if __name__ == "__main__":
    application.run(host='0.0.0.0')
