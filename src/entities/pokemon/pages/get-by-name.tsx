import { Container, DataList, Flex } from '@radix-ui/themes'

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
          <Flex justify='between'>
            <Card>
              <DataList.Root size='1'>
                <DataList.Item align='center'>
                  <DataList.Label>Name:</DataList.Label>
                  <DataList.Value>{pokemonApiResponse?.name}</DataList.Value>
                </DataList.Item>

                <DataList.Item align='center'>
                  <DataList.Label>Height:</DataList.Label>
                  <DataList.Value>{pokemonApiResponse?.height}</DataList.Value>
                </DataList.Item>

                <DataList.Item align='center'>
                  <DataList.Label>Weight:</DataList.Label>
                  <DataList.Value>{pokemonApiResponse?.weight}</DataList.Value>
                </DataList.Item>

                <DataList.Item align='center'>
                  <DataList.Label>ID:</DataList.Label>
                  <DataList.Value>{pokemonApiResponse?.id}</DataList.Value>
                </DataList.Item>

                <DataList.Item align='center'>
                  <DataList.Label>Order:</DataList.Label>
                  <DataList.Value>{pokemonApiResponse?.order}</DataList.Value>
                </DataList.Item>
              </DataList.Root>
            </Card>

            <img width={200} height={200} src={pokemonApiResponse?.sprites.front_default}></img>
          </Flex>
        </Card>
      </Container>
    </main>
  )
}
