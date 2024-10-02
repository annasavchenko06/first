import './item.scss'

import Card from '~/shared/card'
import Flex from '~/shared/flex'
import Link from '~/shared/link'
import { routeMap } from '~/shared/route'
import TextHighlighter from '~/shared/text-highlighter'
import { c } from '~/utils/core'

import { StoreConfig } from '../../../types/store-config'

export interface Props {
  className?: string | undefined
  item: StoreConfig
}

const displayName = 'storeConfig-Item'

/**
 * storeConfig-Item
 */
export default function Component(props: Props): JSX.Element {
  const { className, item } = props

  return (
    <Card key={item.kn} asChild={true} className={c(displayName, className)}>
      <Flex justify='between' asChild>
        <Link to={`${routeMap.storeConfigs_kn.getUrl(item.kn)}`}>
          <Flex gap='2'>
            <TextHighlighter tooltipContent='Название'>{item.kn}</TextHighlighter>
          </Flex>
          <Flex gap='2' align='center'></Flex>
        </Link>
      </Flex>
    </Card>
  )
}

Component.displayName = displayName
