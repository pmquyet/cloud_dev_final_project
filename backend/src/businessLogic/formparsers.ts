import { FormParsersAccess } from '../dataLayer/formParsersAcess'
// import { AttachmentUtils } from './attachmentUtils'
import { FormParserItem } from '../models/FormParserItem'
import { CreateFPRequest } from '../requests/CreateFPRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
// import * as createError from 'http-errors'

// TODO: Implement businessLogic
const formParserAccess = new FormParsersAccess()
const logger = createLogger('formparsers')

export async function GetFormParsers(
  userId: string
): Promise<FormParserItem[]> {
  logger.info('In GetTodo() function')
  return await formParserAccess.GetFormParsers(userId)
}

export async function CreateFormParser(
  createFPRequest: CreateFPRequest,
  userId: string
): Promise<FormParserItem> {
  logger.info('In CreateTodo() function')
  const fpId = uuid.v4()

  return await formParserAccess.CreateFormParser({
    userId: userId,
    id: fpId,
    createdAt: new Date().toISOString(),
    ClientRef: createFPRequest.ClientRef,
    AGE_AT_TEST: createFPRequest.AGE_AT_TEST,
    AVERAGE_STRESS: createFPRequest.AVERAGE_STRESS,
    CUBE_DIMENSION: createFPRequest.CUBE_DIMENSION,
    DATE_CAST: createFPRequest.DATE_CAST,
    DATE_TESTED: createFPRequest.DATE_TESTED,
    GRADE: createFPRequest.GRADE,
    LOCATION: createFPRequest.LOCATION,
    MAX_LOAD: createFPRequest.MAX_LOAD,
    MODE_OF_FAILURE: createFPRequest.MODE_OF_FAILURE,
    SPECIFIED_STRENGTH: createFPRequest.SPECIFIED_STRENGTH,
    STRESS_FALURE: createFPRequest.STRESS_FALURE,
    SUPPLIER: createFPRequest.SUPPLIER,
    S3FILE_ID: createFPRequest.S3FILE_ID
  })
}

export async function DeleteFormParser(
  id: string,
  userId: string
): Promise<string> {
  logger.info('In DeleteFP() function')
  return await formParserAccess.DeleteFormParser(id, userId)
}
