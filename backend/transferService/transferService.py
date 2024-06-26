from flask import Flask, request, jsonify, send_file
from minio import Minio
from minio.error import S3Error
import os
import tempfile
import zipfile
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

minio_client = Minio(
        'minio-transfer-service:9005',
        access_key='leeja042499@gmail.com',
        secret_key='Dlwodud3424!',
        secure=False
)

def bucket_exists(bucketName):
    # loading All Bucket
    buckets = minio_client.list_buckets()

    # already exist bucket -> return True
    for bucket in buckets:
        if bucket.name == bucketName:
            return True
    return False

def create_bucket(bucketName):
    #create bucket
    minio_client.make_bucket(bucketName)
    print(f"Bucket '{bucketName}' created successfully")

def saveFile(bucketName, fileName, file):
    _, temp_file_path = tempfile.mkstemp()
    file.save(temp_file_path)

    minio_client.fput_object(bucketName, fileName, temp_file_path)

    os.remove(temp_file_path)    

@app.route('/api/transfer/upload', methods=['POST'])
def upload_file():
    # file, bucket loading
    file = request.files.get('file')
    bucket_name = request.form.get('bucket')
    file_name = file.filename

    # If not exist bucket -> create bucket
    if(bucket_exists(bucket_name)==False):
        create_bucket(bucket_name)

    if not file:
        return jsonify({"error": "No file provided"}), 400
    if not bucket_name:
        return jsonify({"error": "No bucket provided"}), 400

    try:
        saveFile(bucket_name, file_name, file)
        return jsonify({"message": "File uploaded successfully", "filename": file_name}), 200

    except S3Error as e:
        return jsonify({"error": str(e)}), 500

def get_bucket_files(bucketName):
    objects = minio_client.list_objects(bucketName, recursive=True)
    files = [obj.object_name for obj in objects]
    return files

@app.route('/api/transfer/download/all/<bucketid>', methods=['get'])
def download_dataset_all(bucketid):
    files = get_bucket_files(bucketid)

    with tempfile.TemporaryDirectory() as temp_dir:
        zip_file_name = bucketid+".zip"
        zip_file_path = os.path.join(temp_dir, zip_file_name)
        with zipfile.ZipFile(zip_file_path, 'w') as zipf:
            for file in files:
                temp_file_path = os.path.join(temp_dir, file)
                minio_client.fget_object(bucketid, file, temp_file_path)
                zipf.write(temp_file_path, file)

        return send_file(zip_file_path, as_attachment=True)

@app.route("/api/transfer", methods=['delete'])
def delete_bucket():
    id = request.args.get('id')

    # 버킷이 존재하지 않으면 404 반환
    if not bucket_exists(id):
        return jsonify({"message" : "버킷이 존재하지 않습니다!"}), 404

    try:
        objects = minio_client.list_objects(id, recursive=True)
        for obj in objects:
            minio_client.remove_object(id, obj.object_name)
    except S3Error as e:
        return jsonify({"error": str(e)}), 500

    try:
        minio_client.remove_bucket(id)
        return jsonify({"message" : "{id} 버킷 삭제 완료"}), 200
    except S3Error as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/transfer/bucketsize" , methods=['get'])
def get_bucket_size():
    bucketId = request.args.get('bucketid')
    if not bucketId:
        return jsonify({"Message": "Cannot Find Bucket"}), 404
    
    try:
        bucket_size = 0
        objects = minio_client.list_objects(bucketId, recursive=True)
        for obj in objects:
            bucket_size += obj.size
        bucket_size = bucket_size / (1024*1024)
        bucket_size_str = "{:.2f}".format(bucket_size)
        return jsonify({"size": bucket_size_str}), 200
    except S3Error as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
