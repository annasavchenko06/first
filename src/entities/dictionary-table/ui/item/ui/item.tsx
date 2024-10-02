import './item.scss'

import dayjs from 'dayjs'

import Avatar from '~/shared/avatar'
import Card from '~/shared/card'
import Flex from '~/shared/flex'
import Link from '~/shared/link'
import { routeMap } from '~/shared/route'
import Separator from '~/shared/separator'
import Text from '~/shared/text'
import TextHighlighter from '~/shared/text-highlighter'
import Tooltip from '~/shared/tooltip'
import { c } from '~/utils/core'

import { type DictionaryTable } from '../../../types/dictionary-table'

export interface Props {
  className?: string | undefined
  item: DictionaryTable
}

const displayName = 'dictionaryTable-Item'

/**
 * dictionaryTable-Item
 */
export default function Component(props: Props): JSX.Element {
  const { className, item } = props

  return (
    <Flex justify='between' direction='row' asChild={true}>
      <Card asChild={true} className={c(displayName, className)}>
        <Link to={`${routeMap.dictionaryTables_kn.getUrl(item.kn)}`}>
          <Flex direction='column'>
            <TextHighlighter tooltipContent='Название справочника'>{item.name}</TextHighlighter>
            <Text style={{ marginLeft: 'var(--space-1)' }} color='gray' size='2'>
              {item.kn}
            </Text>
          </Flex>
          <Flex gap='4' align='center'>
            <Flex align='center' gap='2'></Flex>
            <Separator orientation='vertical' />
            <Flex gap='2' align='center'>
              <Flex style={{ position: 'relative', width: '1rem', height: '1rem', marginRight: 'var(--space-1)' }}>
                <Avatar
                  style={{ position: 'absolute', top: '-70%', left: '-50%' }}
                  radius='full'
                  size='1'
                  fallback='a'
                  src={item.createdBy.avatar}
                />
                <Avatar
                  style={{ position: 'absolute', top: 0, left: 0 }}
                  radius='full'
                  size='1'
                  fallback='a'
                  src={item.updatedBy.avatar}
                />
              </Flex>
              <Flex direction='column'>
                <Tooltip content={`Создал пользователь: ${item.createdBy.name}`}>
                  <Text color='gray' as='div' size='1'>
                    {dayjs(item?.createdAt).format('DD.MM.YYYY HH:mm')}
                  </Text>
                </Tooltip>
                <Tooltip content={`Изменил пользователь: ${item.updatedBy.name}`}>
                  <Text color='gray' as='div' size='1'>
                    {dayjs(item?.updatedAt).format('DD.MM.YYYY HH:mm')}
                  </Text>
                </Tooltip>
              </Flex>
            </Flex>
          </Flex>
        </Link>
      </Card>
    </Flex>
  )
}

Component.displayName = displayName
