import { createLogger } from '../utils/logger'
import { FormParsersAccess } from './formParsersAcess'

// TODO: Implement the fileStogare logic

const fpAccess = new FormParsersAccess()
const logger = createLogger('formparsers')

export async function GenerateUploadUrl(fpId: string): Promise<string> {
  logger.info('In GenerateUploadUrl() function')
  return await fpAccess.GenerateUploadUrl(fpId)
}
