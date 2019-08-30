aws s3api create-bucket \
    --bucket $AWS_S3_LAMBDA_CODE_STORAGE \
    --region $AWS_REGION \
    --create-bucket-configuration LocationConstraint=$AWS_REGION
    
aws s3api create-bucket \
    --bucket $AWS_S3_GENERATED_DOCUMENTS_BUCKET \
    --region $AWS_REGION \
    --create-bucket-configuration LocationConstraint=$AWS_REGION

aws s3api create-bucket \
    --bucket $AWS_S3_DOCUMENT_TEMPLATES_BUCKET \
    --region $AWS_REGION \
    --create-bucket-configuration LocationConstraint=$AWS_REGION

