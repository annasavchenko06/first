import { Link } from '@radix-ui/themes'

import { type LinkProps, Link as RouteLink } from 'react-router-dom'

import { c } from '~/utils/core'

export interface Props extends LinkProps {}

export const NAME = 'ui-Link'

/**
 * ui-Li
 */
export default function Component(props: Props): JSX.Element {
  const { className, ...linkProps } = props

  return (
    <Link asChild>
      <RouteLink {...linkProps} className={c(className, NAME)} />
    </Link>
  )
}

Component.displayName = NAME
