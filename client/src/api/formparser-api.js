import { apiEndpoint } from '../config'

import Axios from 'axios'

export async function getFormParsers(idToken) {
  console.log('Fetching formparser')

  const response = await Axios.get(`${apiEndpoint}/formparser`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
  console.log('formparser:', response.data)
  return response.data.items
}

export async function createFormParser(idToken, newTodo) {
  const response = await Axios.post(
    `${apiEndpoint}/formparser`,
    JSON.stringify(newTodo),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
  return response.data
}

export async function patchFormParser(idToken, fpItem) {
  await Axios.patch(`${apiEndpoint}/formparser`, JSON.stringify(fpItem), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
}

export async function deleteFormParser(idToken, id) {
  await Axios.delete(`${apiEndpoint}/formparser/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(idToken, id) {
  const response = await Axios.post(
    `${apiEndpoint}/formparser/${id}/attachment`,
    '',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl, file) {
  await Axios.put(uploadUrl, file)
}

export async function getSignedUrl(idToken, id) {
  const response = await Axios.put(
    `${apiEndpoint}/formparser/${id}/openfile`,
    '',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
  return response.data.signeddUrl
}
