import './nav.scss'

import { createElement } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { routes } from '~/app/route'
import { getCurrent } from '~/app/route'
import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Logo from '~/shared/logo-icon'
import Tooltip from '~/shared/tooltip'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

const displayName = 'ui-Nav'

/**
 * ui-Nav
 */
export default function Component(): JSX.Element {
  const location = useLocation()
  const navigatables = Object.entries(routes).filter(([, route]) => route.payload.navigatable)
  const current = getCurrent(routes, `/${location.pathname.split('/')[1]}`)

  return (
    <nav className={c(displayName)}>
      <Flex className='logo' align='center' justify='center'>
        <Button variant='outline' size='2' square={true} asChild>
          <Link to={routes.main.getUrl()}>
            <Logo height='1rem' width='2rem' />
          </Link>
        </Button>
      </Flex>
      <Flex className='navigatables' direction='column' gap='2'>
        {navigatables.map(([key, route]) => {
          const isCurrent = current === route

          return (
            <Tooltip side='right' key={key} content={route.getName()}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Link to={(route.getUrl as any)()}>
                <Button size='2' square={true} variant={isCurrent ? 'solid' : 'soft'}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {createElement((route as any).payload.renderIcon)}
                </Button>
              </Link>
            </Tooltip>
          )
        })}
      </Flex>
    </nav>
  )
}

Component.displayName = displayName
