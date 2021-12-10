import configJson from './auth_config.json'

const apiId = 'a75qklyoei'
export const apiEndpoint = `https://${apiId}.execute-api.ap-southeast-1.amazonaws.com/dev65`

export function getConfig() {
  const audience =
    configJson.audience && configJson.audience !== 'YOUR_API_IDENTIFIER'
      ? configJson.audience
      : null

  return {
    domain: configJson.domain,
    clientId: configJson.clientId,
    ...(audience ? { audience } : null)
  }
}
