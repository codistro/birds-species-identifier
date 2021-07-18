from typing import SupportsComplex
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from werkzeug.wrappers import response
from model.Classifier import Classifier
import json

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['GET'])
def hello_world():
    response = jsonify(message="get")
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route("/uploadImage", methods=['POST'])
def upload_image():
    file = request.files['file']
    classifier = Classifier(file)
    birds, scores = classifier.classify()
    response = {'birds': birds, 'scores': scores}
    return json.dumps(response)
