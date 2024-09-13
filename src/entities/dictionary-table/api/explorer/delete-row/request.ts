import { SYSNAME } from '~/entities/dictionary-table/constants/name'
import { type Response } from '~/shared/api'
import api from '~/shared/axios'
import { type Where } from '~/shared/where'

import { type DictionaryTable } from '../../../types/dictionary-table'
import { url } from '../../common'

export const NAME = `${SYSNAME}.explorerDeleteRow`

export type RequestData = { kn: string; where: Where }

export type ResponseData = DictionaryTable

export const buildURL = (): string => `${url}/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api<ResponseData, Response<ResponseData>, RequestData>(buildURL(), {
    method: 'DELETE',
    data: requestData,
  })

  return response
}
