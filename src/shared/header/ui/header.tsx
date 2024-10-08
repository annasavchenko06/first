import './header.scss'

import Checkbox from '~/shared/checkbox'
import Flex from '~/shared/flex'
import { HighlightedText } from '~/shared/text'
import { Switch } from '~/shared/theme'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

const NAME = 'ui-Header'

/**
 * ui-Header
 */
export default function Component(): JSX.Element {
  const isProd = localStorage.getItem('env') === 'production'

  return (
    <header className={c(NAME)}>
      <div className={`${NAME}_breadscrumbs`}>
        {process.env.NODE_ENV === 'development' && (
          <Flex justify='center' align='center' gap='m'>
            <HighlightedText color={isProd ? 'green' : 'red'}>
              <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                production
                <Checkbox
                  variant='soft'
                  defaultChecked={isProd}
                  onCheckedChange={(value): void => {
                    if (value) {
                      localStorage.setItem('env', 'production')
                    } else {
                      localStorage.setItem('env', 'development')
                    }
                    location.reload()
                  }}
                />
              </label>
            </HighlightedText>
          </Flex>
        )}
      </div>
      <Flex className={`${NAME}_settings`} gap='4' align='center'>
        <Switch />
      </Flex>
    </header>
  )
}

Component.displayName = NAME
