import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
const AWSXRay = require('aws-xray-sdk')
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { FormParserItem } from '../models/FormParserItem'

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('FormParsersAccess')

// TODO: Implement the dataLayer logic
export class FormParsersAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly fpsTable = process.env.FPS_TABLE,
    private readonly s3 = new XAWS.S3({ signatureVersion: 'v4' }),
    private readonly bucketName = process.env.ATTACHMENT_S3_BUCKET,
    private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION
  ) {}

  async GetFormParsers(userId: string): Promise<FormParserItem[]> {
    logger.info('Getting all todo items')

    const result = await this.docClient
      .query({
        TableName: this.fpsTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        },
        ScanIndexForward: false
      })
      .promise()

    return result.Items as FormParserItem[]
  }

  async CreateFormParser(fpItem: FormParserItem): Promise<FormParserItem> {
    logger.info('Creating a todo item')
    const newFPItem = {
      ...fpItem,
      attachmentUrl: `https://${this.bucketName}.s3.amazonaws.com/${fpItem.id}`
    }

    await this.docClient
      .put({
        TableName: this.fpsTable,
        Item: newFPItem
      })
      .promise()

    return newFPItem
  }

  async UpdateFormParser(fpItem: FormParserItem): Promise<string> {
    logger.info(`Updating a todo with ID ${fpItem.id}`)

    await this.docClient
      .update({
        TableName: this.fpsTable,
        Key: {
          userId: fpItem.userId,
          todoId: fpItem.id
        },
        ConditionExpression: 'todoId = :todoId',
        UpdateExpression:
          'set #n = :name, createdAt = :createdAt, done = :done',
        ExpressionAttributeValues: {
          // ':name': fpItem.name,
          // ':createdAt': fpItem.createdAt,
          // ':done': fpItem.done,
          ':todoId': fpItem.id
        },
        ExpressionAttributeNames: {
          '#n': 'name'
        },
        ReturnValues: 'UPDATED_NEW'
      })
      .promise()

    return 'success'
  }

  async DeleteFormParser(id: string, userId: string): Promise<string> {
    logger.info(`Updating a todo with ID ${id}`)
    await this.docClient
      .delete({
        TableName: this.fpsTable,
        Key: {
          userId: userId,
          todoId: id
        },
        ConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
          ':id': id
        }
      })
      .promise()

    return userId
  }

  async GenerateUploadUrl(id: string): Promise<string> {
    logger.info(`Generating an upload url for ID ${id}`)
    return this.s3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: id,
      Expires: parseInt(this.urlExpiration)
    }) as string
  }
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    logger.info('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}
