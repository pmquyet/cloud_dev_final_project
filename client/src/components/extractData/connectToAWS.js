const AWS = require('aws-sdk')

const connectToAWS = () => {
  var credentials = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY
  }
  AWS.config.update({
    credentials: credentials,
    region: process.env.REACT_APP_AWS_REGION
  })
  return AWS
}
export default connectToAWS
