import boto3

from dotenv import load_dotenv
import os

load_dotenv()

S3_CLIENT = boto3.client(
    's3',
    endpoint_url='http://sidequest-sq-s3-1::9000', 
    aws_access_key_id=os.getenv('MINIO_USER', 'minioadmin'),
    aws_secret_access_key=os.getenv('MINIO_PASSWORD', 'minioadmin'),
)

def get_upload_url(filename):
    
    url = S3_CLIENT.generate_presigned_url(
        'get_object',
        Params={'Bucket': 'my-bucket', 'Key': filename},
        ExpiresIn=3600  # 1 hour
    )

    return url

