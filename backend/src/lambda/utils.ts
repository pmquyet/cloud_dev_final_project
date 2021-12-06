import { APIGatewayProxyEvent } from 'aws-lambda'
import { parseUserId } from '../auth/utils'

/**
 * Get a user id from an API Gateway event
 * @param event an event from API Gateway
 *
 * @returns a user id from a JWT token
 */
export function getUserId(event: APIGatewayProxyEvent): string {
  let jwtToken = null
  const authorization = event.headers.Authorization
  if (authorization !== undefined) {
    const split = authorization.split(' ')
    jwtToken = split[1]
  }

  return parseUserId(jwtToken)
}
