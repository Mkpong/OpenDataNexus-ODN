import requests

file_path = './test1.txt'
bucket_name = 'test-bucket'

url = 'http://127.0.0.1:5002/upload'

files = {'file': open(file_path, 'rb')}
data = {'bucket': bucket_name}
response = requests.post(url, files=files, data=data)

print(response.text)
