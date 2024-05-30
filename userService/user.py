from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/api/user/test")
def userTest():
	return "Success"

if __name__ == '__main__':
	app.run(debug=True, port=5000)

