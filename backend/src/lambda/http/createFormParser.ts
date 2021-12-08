import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { CreateFPRequest } from '../../requests/CreateFPRequest'
import { getUserId } from '../utils'
import { CreateFormParser } from '../../helpers/formparsers'
import { createLogger } from '../../utils/logger'

const logger = createLogger('Create Todo Item')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const newTodo: CreateFPRequest = JSON.parse(event.body)
      // TODO: Implement creating a new TODO item
      const userId = getUserId(event)

      // TODO: Implement creating a new TODO item
      const newItem = await CreateFormParser(newTodo, userId)
      return {
        statusCode: 201,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          newItem
        })
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
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)
