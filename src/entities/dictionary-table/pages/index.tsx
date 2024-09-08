import React from 'react'
import { NumberParam, useQueryParams, withDefault } from 'use-query-params'

import { Item, api } from '~/entities/dictionary-table'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Container from '~/ui/container'
import Flex from '~/ui/flex'
import Heading from '~/ui/layout/variants/heading'
import Link from '~/ui/link'
import Pagination from '~/ui/pagination'
import Section from '~/ui/section'

import { SYSNAME } from '../constants/name'

export interface Props {
  className?: string | undefined
}

const displayName = `${SYSNAME}-Page_list`

/**
 * page-DictionaryTable
 */
export default function Component(): JSX.Element {
  const [{ page = 1, take = 10 }, setPaginationParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    take: withDefault(NumberParam, 10),
  })

  const fetcherList = api.fetchList.useCache({ take, skip: (page - 1) * take }, { keepPreviousData: true })

  return (
    <main className={displayName}>
      <Container p='1.5rem'>
        <Section size='1'>
          <Flex width='100%' justify='between'>
            <Heading.Root
              loading={fetcherList.isLoading && fetcherList.data === undefined}
              route={routes.dictionaryTables}
              backRoute={routes.main}
              renderIcon={routes.dictionaryTables.renderIcon}
            >
              <Heading.BackToParent />
              <Heading.Name />
            </Heading.Root>
            <Flex align='center' gap='2'>
              <Button size='1' variant='outline' asChild>
                <Link to={routes.storeConfigs_kn.getURL('dictionary-tables')}>Хранилище</Link>
              </Button>
              <Button asChild>
                <Link to={routes.dictionaryTables_create.getURL()}>Создать</Link>
              </Button>
            </Flex>
          </Flex>
        </Section>
        <Section size='1'>
          <Pagination
            currentPage={page}
            limit={take}
            loading={fetcherList.isFetching}
            totalElements={fetcherList.data?.total}
            onChange={(page) => setPaginationParams({ page }, 'replace')}
          />
        </Section>
        <Section size='1'>
          <Flex gap='4' direction={'column'}>
            {fetcherList.data?.items?.map((item) => {
              return <Item key={item.kn} item={item} />
            })}
          </Flex>
        </Section>
        <Section></Section>
      </Container>
    </main>
  )
}

Component.displayName = displayName
