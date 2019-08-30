rm -rf build

mkdir build

echo "AWS_S3_LAMBDA_CODE_STORAGE = $AWS_S3_LAMBDA_CODE_STORAGE"
echo "AWS_S3_GENERATED_DOCUMENTS_BUCKET = $AWS_S3_GENERATED_DOCUMENTS_BUCKET"
echo "AWS_S3_DOCUMENT_TEMPLATES_BUCKET = $AWS_S3_DOCUMENT_TEMPLATES_BUCKET"
echo "AWS_REGION = $AWS_REGION"
echo "AWS_STACK_NAME = $AWS_STACK_NAME"

sam build \
    --region $AWS_REGION \
    --template-file template.yml \
    --output-template-file build/packaged.yml \
    --parameter-values ParameterKey=AwsS3GeneratedDocumentBucket,ParameterValue=$AWS_S3_GENERATED_DOCUMENTS_BUCKET ParameterKey=AwsS3DocumentTemplatesBucket,ParameterValue=$AWS_S3_DOCUMENT_TEMPLATES_BUCKET ParameterKey=AwsStackName,ParameterValue=$AWS_STACK_NAME \
    --s3-bucket $AWS_S3_LAMBDA_CODE_STORAGE

