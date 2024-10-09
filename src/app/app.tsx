import './layout/ui/reset/reset.css'

import '@radix-ui/themes/styles.css'

import { createPortal } from 'react-dom'

import { RouteControllerAdapterLayout } from '~/app/layout'
import { routes } from '~/app/route'
import { Controller as RouteController, Provider as RouteProvider } from '~/app/route'
import { QueryClientProvider, QueryDevtools, queryClient } from '~/shared/query'
import Theme from '~/shared/theme'
import { NotificationToastList } from '~/shared/toast'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteProvider>
        <Theme>
          <NotificationToastList />
          <RouteController context={{}} routeMap={routes} render={RouteControllerAdapterLayout} />
          {createPortal([<QueryDevtools key='0' position='bottom-right' />], document.body)}
        </Theme>
      </RouteProvider>
    </QueryClientProvider>
  )
}

export default App
