# AWS SAM deployable
Ready to deploy lambda to generate pdf documents from HTML pages using mustache annotation.

## Steps to deploy
- 1. Clone REPO

- 2. `npm i`

- 3. Create `.env` file in the root directory:
```
AWS_S3_BUCKET= # generated pdf files destination bucket without `s3://`
AWS_REGION= # Region code
AWS_STACK_NAME= # Application stack name
```

- 3. `npm run deploy`


## Testing 

sam local invoke --event tests/test-payload.json