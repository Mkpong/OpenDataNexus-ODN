from flask import Flask, jsonify, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import requests
from datetime import datetime
import secrets
import string

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://admin:Dlwodud3424!@mysql-dataset-service:3306/datasetODN'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

class Metadata(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userEmail = db.Column(db.String(120), nullable=False)
    bucketName = db.Column(db.String(80), nullable=False)
    bucketId = db.Column(db.String(40), nullable=False)
    createAt = db.Column(db.String(50), nullable=False)
    updateAt = db.Column(db.String(50), nullable=True)
    downloadCnt = db.Column(db.Integer)
    size = db.Column(db.String(20), nullable=False)
    overview = db.Column(db.Text)
    details = db.Column(db.Text)
    useMethods = db.Column(db.Text)
    field = db.Column(db.String(50))
    type = db.Column(db.String(50))
    isModify = db.Column(db.Boolean, nullable=False)
    # tags = db.Column(db.JSON)

    def __init__(self, userEmail, bucketName, bucketId, overview, details, useMethods, field, type, isModify):
        self.userEmail = userEmail
        self.bucketName = bucketName
        self.bucketId = bucketId
        self.createAt = datetime.now().strftime("%Y-%m-%d")
        self.updateAt = ""
        self.downloadCnt = 0
        self.size = "0"
        self.overview = overview
        self.details = details
        self.useMethods = useMethods
        self.field = field
        self.type = type
        self.isModify = isModify

    def to_dict(self):
        return {
            "id": self.id,
            "userEmail": self.userEmail,
            "bucketName": self.bucketName,
            "bucketId": self.bucketId,
            "createAt": self.createAt,
            "updateAt": self.updateAt,
            "downloadCnt": self.downloadCnt,
            "size": self.size,
            "overview": self.overview,
            "details": self.details,
            "useMethods": self.useMethods,
            "field": self.field,
            "type": self.type,
            "isModify": self.isModify
        }

# bucketId를 위한 난수 생성
def generate_random_string(length):
    # 소문자와 숫자로 이루어진 문자열 생성
    characters = string.ascii_lowercase + string.digits
    # 지정한 길이만큼의 난수 생성
    random_string = ''.join(secrets.choice(characters) for _ in range(length))
    return random_string

@app.route("/api/dataset/metadata", methods=["post"])
def add_metadata():
    metadata = request.get_json()
    userEmail = metadata.get('userEmail')
    bucketName = metadata.get('bucketName')
    overview = metadata.get('overview')
    details = metadata.get('details')
    useMethods = metadata.get('useMethods')
    field = metadata.get('field')
    type = metadata.get('type')
    isModify = metadata.get('isModify')

    print("userEmail : " ,userEmail, flush=True)


    # 이미 존재하는 버킷인지 확인
    bucket = Metadata.query.filter_by(bucketName=bucketName).first()

    # 만약 이미 존재하는 버킷이면 Error
    if bucket:
        return jsonify({"message": "Not Found"}), 404
    # BucketId Random 생성
    bucketId = generate_random_string(30)
    while(Metadata.query.filter_by(bucketId=bucketId).first()): # 만약 존재하면 ID 랜덤 생성
        bucketId = generate_random_string(30)
        
    new_dataset = Metadata(userEmail=userEmail, bucketName=bucketName, bucketId=bucketId, overview=overview, details=details, useMethods=useMethods, field=field, type=type, isModify=isModify)


    db.session.add(new_dataset)
    db.session.commit()

    print("Buffer Clear", flush=True)

    response = make_response(jsonify({'message': '데이터셋이 성공적으로 등록되었습니다!', 'bucketId': bucketId}), 200)
    response.headers.add('Access-Control-Allow-Origin', '*') 
    return response

@app.route("/api/dataset/metadata", methods=['put'])
def update_metadata():
    metadata = request.get_json()
    id=metadata.get('id')
    overview = metadata.get('overview')
    details = metadata.get('details')
    useMethods = metadata.get('useMethods')

    bucket = Metadata.query.filter_by(id=id).first()
    if not bucket:
        return jsonify({"message": "Not Found"}), 404

    bucket.updateAt = datetime.now().strftime("%Y-%m-%d")
    bucket.overview = overview
    bucket.details = details
    bucket.useMethods = useMethods
    db.session.commit()

    return jsonify(bucket.to_dict()), 200

# metadata id를 사용하여 데이터 셋 metadata 불러오기
@app.route("/api/dataset/one", methods=['get'])
def find_dataset_by_id():
    if request.args.get('id'):
        dataset = Metadata.query.filter_by(id=request.args.get('id')).first()
    # bucketName은 존재 여부
    elif request.args.get('bucketname'):
        dataset = Metadata.query.filter_by(bucketName=request.args.get('bucketname')).first()
        if not dataset:
            return jsonify({"message" : "생성가능"}), 200
        else:
            return jsonify({"message" : "생성불가능"}), 409
    else:
        return jsonify({"message" : "Not Found"}), 404

    response = make_response(jsonify(dataset.to_dict()), 200)
    response.headers.add("Access-Control-Allow-Origin", '*')
    return response

@app.route("/api/dataset/metadata", methods=['delete'])
def delete_dataset():
    id = request.args.get('id')

    metadata = Metadata.query.filter_by(id=id).first()
    if not metadata:
        response = make_response(jsonify({"message" : "Dataset을 찾을 수 없습니다!"}), 404)
        response.headers.add("Access-Control-Allow-Origin", '*')
        return response

    bucketId = metadata.bucketId

    # 버킷에서 해당 데이터 셋 삭제
    response_transfer = requests.delete(f"http://220.149.232.224:30080/api/transfer?id={bucketId}")
    if response_transfer.status_code == 500:
        # 버킷 삭제 실패시 오류 반환
        response = make_response(jsonify({"message" : "버킷 삭제 실패!"}), 500)
        response.headers.add("Access-Control-Allow-Origin", '*')
        return response
    # elif response_transfer.status_code == 404:
    #     db.session.delete(metadata)
    #     db.session.commit()
    #     response = make_response(jsonify({"message" : "버켓이 존재하지 않아 metadata 삭제"}), 200)
    #     response.headers.add("Access-Control-Allow-Origin", '*')
    #     return response

    # 해당 dataset id를 가지고 있는 모든 comment 삭제 로직 구현
    response_comment = requests.delete(f"http://220.149.232.224:30080/api/comment/all?id={metadata.id}")
    if response_comment == 500:
        response = make_response(jsonify({"message" : "Comment 삭제 실패!"}), 500)
        response.headers.add("Access-Control-Allow-Origin", '*')
        return response
    elif response_comment == 404:
        db.session.delete(metadata)
        db.session.commit()
        response = make_response(jsonify({"message" : "Comment가 존재하지 않아 metadata 삭제"}), 200)
        response.headers.add("Access-Control-Allow-Origin", '*')
        return response       

    db.session.delete(metadata)
    db.session.commit()

    response = make_response(jsonify({"message" : "Dataset 삭제 성공"}), 200)
    response.headers.add("Access-Control-Allow-Origin", '*')
    return response

    

@app.route("/api/dataset/all", methods=['get'])
def get_all_dataset():
    datasets = Metadata.query.all()

    datasets_list = [dataset.to_dict() for dataset in datasets]

    response = make_response(jsonify(datasets_list), 200)
    response.headers.add("Access-Control-Allow-Origin", '*')
    return response

# bucket에 데이터 추가 (bucketId)
@app.route("/api/dataset/data/<bucketid>", methods=["post"])
def add_data(bucketid):
    files = request.files

    # transferServer을 통해 파일 업로드 
    file = files["file"]
    file_data = {'file': (file.filename, file.stream, file.content_type)}
    data = {'bucket': bucketid }
    response = requests.post("http://220.149.232.224:30080/api/transfer/upload", files=file_data, data=data)
    print(response)
    return "Not Implement"

@app.route("/api/dataset/data/size/<bucketid>", methods=['put'])
def update_dataset_size(bucketid):
    # 데이터 셋 메타데이터 불러오기
    bucket = Metadata.query.filter_by(bucketId=bucketid).first()
    if not bucket:
        return jsonify({"message" : "Not Found bucket"}), 404
    response = requests.get(f"http://220.149.232.224:30080/api/transfer/bucketsize?bucketid={bucketid}")
    size = response.json().get('size')
    if size:
        bucket.size = size
    db.session.commit()

    return jsonify({"message": "size update complete"}), 200

@app.route("/api/dataset/data/downloadcnt/<bucketid>", methods=['put'])
def update_dataset_downloadcnt(bucketid):
    bucket = Metadata.query.filter_by(bucketId=bucketid).first()
    if not bucket:
        return jsonify({"message" : "Not Found bucket"}), 404
    bucket.downloadCnt = bucket.downloadCnt + 1
    db.session.commit()

    return jsonify({"message": "downloadCnt update complete"}), 200

# 검색 기능
@app.route("/api/dataset/data/search", methods=['get'])
def serach_dataset():
    query = Metadata.query
    if request.args.get('field'):
        query = query.filter_by(field=request.args.get('field'))
    if request.args.get('type'):
        query = query.filter_by(type=request.args.get('type'))
    if request.args.get('keyword'):
        pattern = f"%{request.args.get('keyword')}%"
        query = query.filter(Metadata.bucketName.like(pattern))
    
    result = query.all()
    datasets_list = [dataset.to_dict() for dataset in result]

    response = make_response(jsonify(datasets_list), 200)
    response.headers.add("Access-Control-Allow-Origin", '*')
    return response

    

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000, host='0.0.0.0')

