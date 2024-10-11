import { Container, DataList } from '@radix-ui/themes'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Card from '~/shared/card'

import * as api from '../api'

export default function Component() {
  const { name = '' } = useParams()
  const [pokemonApiResponse, setPokemonApiResponse] = useState<api.getByName.Response | null>(null)
  useEffect(() => void getData(), [])

  async function getData() {
    const data = await api.getByName.request(name)
    setPokemonApiResponse(data)
  }

  return (
    <main>
      <Container>
        <Card>
          <DataList.Root size='1'>
            <DataList.Item align='center'>
              <DataList.Label>Name:</DataList.Label>
              <DataList.Value>{pokemonApiResponse?.name}</DataList.Value>
            </DataList.Item>

            <DataList.Item align='center'>
              <DataList.Label>ID:</DataList.Label>
              <DataList.Value>{pokemonApiResponse?.id}</DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Card>
      </Container>
    </main>
  )
}
