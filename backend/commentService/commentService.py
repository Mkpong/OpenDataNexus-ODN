from flask import Flask, jsonify, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import requests
from datetime import datetime
import secrets
import string

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://admin:Dlwodud3424!@127.0.0.1/commentODN'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    userEmail = db.Column(db.String(30), nullable=False)
    metadataId = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)
    createAt = db.Column(db.String(50), nullable=False)

    def __init__(self,userEmail, metadataId, content):
        self.userEmail = userEmail
        self.metadataId = metadataId
        self.content = content
        self.createAt = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def to_dict(self):
        return {
            "id": self.id,
            "userEmail": self.userEmail,
            "metadataId": self.metadataId,
            "content": self.content,
            "createAt": self.createAt
        }


# metadata_id로 Comment 불러오기
@app.route("/api/comment", methods=["get"])
def get_comment():
    # query string id 값 불러오기
    id=request.args.get('id')

    comments = Comment.query.filter_by(metadataId=id).all()
    if not comments:
        return jsonify({'message': 'Not Fount Comment'}), 404

    comment_list = [comment.to_dict() for comment in comments]

    response = make_response(jsonify(comment_list), 200)
    response.headers.add("Access-Control-Allow-Origin" , "*")
    return response

# Comment 등록하기
@app.route("/api/comment", methods=['post'])
def post_comment():
    data = request.get_json()
    userEmail = data.get('userEmail')
    metadataId = data.get('metadataId')
    content = data.get('content')

    new_comment = Comment(userEmail=userEmail, metadataId=metadataId, content=content)

    db.session.add(new_comment)
    db.session.commit()

    response = make_response(jsonify({"message" : "성공적으로 등록되었습니다!" , "commentId": new_comment.id}), 201)
    response.headers.add("Access-Control-Allow-Origin", '*')
    return response

@app.route("/api/comment", methods=['delete'])
def put_comment():
    # query String으로 Comment Id 받기
    id=request.args.get('id')

    comment = Comment.query.filter_by(id=id).first()
    if comment:
        db.session.delete(comment)
        db.session.commit()
        response = make_response(jsonify({"message" : "성공적으로 삭제되었습니다!"}), 200)
        response.headers.add("Access-Control-Allow-Origin", '*')
        return response
    else:
        response = make_response(jsonify({"message" : "Comment를 찾을 수 없습니다!"}), 404)
        response.headers.add("Access-Control-Allow-Origin", '*')
        return response


@app.route("/api/comment", methods=['put'])
def delete_comment():
    id = request.args.get('id')
    data = request.get_json()
    content = data.get('content')

    comment = Comment.query.filter_by(id=id).first()
    if comment:
        comment.content = content
        db.session.commit()
        response = make_response(jsonify({"message" : "성공적으로 수정되었습니다!"}), 200)
        response.headers.add("Access-Control-Allow-Origin", '*')
        return response
    else:
        response = make_response(jsonify({"message" : "Comment를 찾을 수 없습니다!"}), 404)
        response.headers.add("Access-Control-Allow-Origin", '*')
        return response

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5004, host='0.0.0.0')