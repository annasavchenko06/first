import { Container, Flex, Section } from '@radix-ui/themes'

import { useEffect, useState } from 'react'

import { routes } from '~/app/route'
import Card from '~/shared/card'
import Link from '~/shared/link'

import * as api from '../api'

export default function Component() {
  const [pokemonApiResponse, setPokemonApiResponse] = useState<api.getMany.Response | null>(null)

  useEffect(() => void getData(), [])

  async function getData() {
    const data = await api.getMany.request()
    setPokemonApiResponse(data)
  }

  return (
    <main>
      <Container>
        <Section size='1'>
          <Flex gap='2' asChild direction='column'>
            <ul>
              {pokemonApiResponse?.results?.map((item) => {
                return (
                  <Card key={item.name}>
                    <li>
                      <Link to={routes.Habitat_getByName.getUrl(item.name)}>{item.name}</Link>
                    </li>
                  </Card>
                )
              })}
            </ul>
          </Flex>
        </Section>
      </Container>
    </main>
  )
}
