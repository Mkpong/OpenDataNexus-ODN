from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/api/user")
def userTest():
	return "Success"

if __name__ == '__main__':
	app.run(host='0.0.0.0', debug=True, port=5001)

