import { Link } from 'react-router-dom'
import { NumberParam, useQueryParams, withDefault } from 'use-query-params'
import { api, Item } from '~/entities/target-table'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Container from '~/ui/container'
import Flex from '~/ui/flex'
import Heading from '~/ui/heading'
import Pagination from '~/ui/pagination'
import Section from '~/ui/section'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-TargetTable'

/**
 * page-TargetTable
 */
export default function Component(): JSX.Element {
  const [{ page = 1, take = 10 }, setPaginationParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    take: withDefault(NumberParam, 10),
  })

  const fetcherList = api.fetchList.useCache({ take, skip: (page - 1) * take })

  return (
    <main className={displayName}>
      <Container p='1.5rem'>
        <Section size='1'>
          <Flex width='100%' justify='between'>
            <Heading>{routes.targetTables.getName()}</Heading>
            <Button size='1' asChild>
              <Link to={routes.targetTables_create.getURL()}>Создать</Link>
            </Button>
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
