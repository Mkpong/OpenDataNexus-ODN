from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://admin:Dlwodud3424!@127.0.0.1/userODN'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

jwt_secretKey = "va20ofsl3r08h3n1rjjl"

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

@app.route('/api/user/register' , methods=['post'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    new_user = User(name=name, email=email, password=password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User added successfully!"}), 201

@app.route('/api/user/register/test', methods=['get'])
def register_test():
    name = "이재영"
    email = "leeja042499@gmail.com"
    password = "1234"

    new_user = User(name = name, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return "SUCCESS"

@app.route('/api/user/login' , methods=['post'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not user.password == password:
        return jsonify({'message': '이메일 또는 비밀번호가 일치하지 않습니다.'}), 401

    # JWT Token 발급
    header_jwt = {
            'alg': "HS512",
            'typ': "JWT"
    }
    payload_jwt = {
            "email": user.email,
            "exp": datetime.utcnow() + timedelta(hours=6)
    }

    token = jwt.encode(payload_jwt, jwt_secretKey, algorithm='HS512', headers=header_jwt)
    print(token)

    return jsonify({'message': '로그인이 성공적으로 완료되었습니다.'}), 200

@app.route('/api/user/login/test' , methods=['get'])
def login_test():
    email = "leeja042499@gmail.com"
    password = "1234"

    user = User.query.filter_by(email=email).first()

    if not user or not user.password == password:
        return "Fail"

    return "Login Success"



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5001, host='0.0.0.0')
