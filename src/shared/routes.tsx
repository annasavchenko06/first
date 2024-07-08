import { lazy } from 'react'
import { type Route } from '../lib/route'
import Main from '../pages/main'
import NormalizationConfigs from '~/pages/normalization-configs'
import NormalizationConfigs_name from '~/pages/normalization-configs/name'
import Processes from '~/pages/processes'
import Header from '~/ui/header'
import Nav from '~/ui/nav'

// eslint-disable-next-line react-refresh/only-export-components
const Storybook = lazy(() => import('../pages/storybook/index'))

export const routes = {
  main: {
    path: '/',
    renderMain: Main,
    getName: (): string => 'main',
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
  },

  normalizationConfigs: {
    path: '/normalization-configs',
    renderMain: NormalizationConfigs,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Конфигурации нормализации',
    navigatable: true,
  },

  normalizationConfigs_name: {
    path: '/normalization-configs/:name',
    renderMain: NormalizationConfigs_name,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Конфигурация нормализации',
    navigatable: true,
  },

  processes: {
    path: '/processes',
    renderMain: Processes,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Процессы',
    navigatable: true,
  },

  storybook: {
    path: '/storybook',
    renderMain: Storybook as unknown as () => JSX.Element,
    getName: (): string => 'storybook',
    navigatable: false,
  },

  notFound: {
    path: '/not-found',
    renderMain: () => 'Not Found',
    getName: () => 'not found',
    navigatable: false,
  },
} satisfies Record<string, Route>
