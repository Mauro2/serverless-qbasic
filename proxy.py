import flask
import subprocess
import os
from flask import request

proxy = flask.Flask(__name__)

def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    if request.method == 'OPTIONS':
        response.headers['Access-Control-Allow-Methods'] = 'DELETE, GET, POST, PUT'
        headers = request.headers.get('Access-Control-Request-Headers')
        if headers:
            response.headers['Access-Control-Allow-Headers'] = headers
    return response

@proxy.route("/init", methods=[ "POST" ])
def init():
    return flask.jsonify(ok=True)

@proxy.route("/run", methods=[ "POST" ])
def run():
    msg = flask.request.get_json(force=True, silent=True)

    if not msg or not isinstance(msg, dict):
        r = flask.jsonify({ "error": "Invalid payload." })
        r.status_code = 400
        return r
    else:
        input_string = msg.get("value", {}).get("input", {})

        with open("/root/dos/INPUT.STR", "w") as fp:
            fp.write("\"%s\"\n" % input_string)
            print(input_string)

        subprocess.call([
            "dosbox", "./PRINT.EXE", "-c", "C:\\QBASIC.EXE /run C:\\PRIME.BAS > C:\\LOG.TXT", "-exit"
        ], cwd="/root/dos")

        output = "???"

        with open("/root/dos/LOG.TXT", "r") as fp:
            output = fp.read().strip()

        return flask.jsonify(input=input_string, output=output)

if __name__ == "__main__":
    proxy.after_request(add_cors_headers)
    proxy.run(host='0.0.0.0', port=int(os.getenv('PORT')), threaded=False)
