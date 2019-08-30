const AWS = require('aws-sdk');
AWS.config.update({});

const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const browser = require('./src/browser')
const {AWS_S3_GENERATED_DOCUMENTS_BUCKET,
    AWS_S3_DOCUMENT_TEMPLATES_BUCKET} = process.env


const createS3FileLink = async (bucket, key) => {
    const signedUrlExpireSeconds = 60 * 5
    return await s3.getSignedUrl('getObject', {
        Bucket: bucket,
        Key: key,
        Expires: signedUrlExpireSeconds
    })
}


module.exports.handler = async ( event, context ) => {

    if( !AWS_S3_GENERATED_DOCUMENTS_BUCKET ) {
        throw "environment variable: AWS_S3_GENERATED_DOCUMENTS_BUCKET, is not defined"
    }

    if( !AWS_S3_DOCUMENT_TEMPLATES_BUCKET ) {
        throw "environment variable: AWS_S3_DOCUMENT_TEMPLATES_BUCKET, is not defined"
    }


    const { templateKey, outputKey, parameters = {} } = event
    const templatePath = await createS3FileLink( AWS_S3_DOCUMENT_TEMPLATES_BUCKET, templateKey );
    const printedPagePDF = await browser.printPageToPDF(templatePath, parameters)
    
    const params = {
        Bucket: AWS_S3_GENERATED_DOCUMENTS_BUCKET,
        Body: printedPagePDF, 
        Key: outputKey,
        Metadata: {
            contentType: 'application/pdf'
        }
    }

    const data = await s3.upload(params).promise()

    return {
        key: data.Key,
        bucket: data.Bucket,
        location: data.Location
    }
}