import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

import { FormParserItem } from '../../models/FormParserItem'
import { UpdateFormparser } from '../../businessLogic/formparsers'
import { createLogger } from '../../utils/logger'
const logger = createLogger('update FP')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const updatedFP: FormParserItem = JSON.parse(event.body)
  logger.info('update FP', { updatedFP })

  try {
    await UpdateFormparser(updatedFP)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: ''
    }
  } catch (error) {
    logger.error('Error: ' + error.message)

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: error.message
    }
  }
}
