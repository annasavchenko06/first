import { Container, Flex, Section } from '@radix-ui/themes'

import { useEffect, useState } from 'react'
import { NumberParam, useQueryParam, withDefault } from 'use-query-params'

import { routes } from '~/app/route'
import Card from '~/shared/card'
import Link from '~/shared/link'
import { Pagination } from '~/shared/page'

import * as api from '../api'

export default function Component() {
  const [pokemonApiResponse, setPokemonApiResponse] = useState<api.getMany.Response | null>(null)
  const [page, setPage] = useQueryParam('page', withDefault(NumberParam, 1))

  const limit = 20

  useEffect(() => void getData(), [page])

  async function getData() {
    const data = await api.getMany.request((page - 1) * limit, limit)
    setPokemonApiResponse(data)
  }

  return (
    <main>
      <Container>
        <Section size='1'>
          <Pagination totalElements={pokemonApiResponse?.count} limit={limit} currentPage={page} onChange={setPage} />
        </Section>
        <Section size='1'>
          <Flex gap='2' asChild direction='column'>
            <ul>
              {pokemonApiResponse?.results?.map((item) => {
                return (
                  <Card key={item.name}>
                    <li>
                      <Link to={routes.Pokemon_getByName.getUrl(item.name)}>{item.name}</Link>
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
