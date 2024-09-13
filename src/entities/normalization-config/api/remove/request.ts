import { Response } from '~/shared/api'
import api from '~/shared/axios'

import { RequestData, ResponseData } from './types'

export const buildURL = (requestData: RequestData): string => `/api/v1/normalization-configs/${requestData.id}`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  // TODO validation

  const response = await api.delete<ResponseData, Response<ResponseData>, RequestData>(buildURL(requestData))

  return response
}
