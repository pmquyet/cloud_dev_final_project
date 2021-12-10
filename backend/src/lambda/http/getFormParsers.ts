import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'

import { GetFormParsers } from '../../businessLogic/formparsers'
import { getUserId } from '../utils'

// TODO: Get all TODO items for a current user
const logger = createLogger('Get Todo Items')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      // Write your code here
      // TODO: Get all TODO items for a current user
      logger.info('Processing event: ', event)

      const userId = getUserId(event)
      const fps = await GetFormParsers(userId)

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          items: fps
        })
      }

      return undefined
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
)

handler.use(
  cors({
    credentials: true
  })
)
