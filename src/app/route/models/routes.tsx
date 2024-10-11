import { Suspense, lazy } from 'react'

import Header from '~/shared/header'
import Icon from '~/shared/icon'
import Logo from '~/shared/logo-icon'
import Nav from '~/shared/nav'
import { isDev } from '~/utils/core-client/is-dev'

import Habitat_getByName from '../../../entities/habitat/pages/get-by-name'
import Habitat_getMany from '../../../entities/habitat/pages/get-many'
import Pokemon_getByName from '../../../entities/pokemon/pages/get-by-name'
import Pokemon_getMany from '../../../entities/pokemon/pages/get-many'
import Main from '../../../pages/main'
import { type AppRoute } from './app-route'

// eslint-disable-next-line react-refresh/only-export-components
const Storybook = lazy(() => import('../../../pages/storybook/index'))

export const routes = {
  main: {
    getName: (): string => 'НСИ',
    getPath: () => '/',
    getUrl(): string {
      return this.getPath()
    },
    render: Main,
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      renderIcon: Logo,
      navigatable: false,
    },
  },

  Pokemon_getMany: {
    getName: (): string => 'Pokemon',
    getPath: () => '/pokemons',
    getUrl(): string {
      return this.getPath()
    },
    render: Pokemon_getMany,
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      renderIcon: Logo,
      navigatable: true,
    },
  },

  Pokemon_getByName: {
    getName: (): string => 'Pokemon',
    getPath: () => '/pokemons/:name',
    getUrl(name: string): string {
      return `/pokemons/${name}`
    },
    render: Pokemon_getByName,
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      renderIcon: Logo,
      navigatable: false,
    },
  },

  Habitat_getMany: {
    getName: (): string => 'Habitat',
    getPath: () => '/habitat',
    getUrl(): string {
      return this.getPath()
    },
    render: Habitat_getMany,
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      renderIcon: Logo,
      navigatable: true,
    },
  },
  Habitat_getByName: {
    getName: (): string => 'Habitat',
    getPath: () => '/habitat/:name',
    getUrl(name: string): string {
      return `/habitat/${name}`
    },
    render: Habitat_getByName,
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      renderIcon: Logo,
      navigatable: false,
    },
  },
  // Misc

  storybook: {
    getName: () => 'Storybook',
    getPath: () => '/storybook',
    getUrl() {
      return this.getPath()
    },
    render: () => (
      <Suspense fallback='loading...'>
        <Storybook />
      </Suspense>
    ),
    payload: {
      navigatable: isDev(),
      renderIcon: (props) => <Icon {...props} name='Star' />,
    },
  },

  notFound: {
    getName: () => 'Not found',
    getPath: () => '/not-found',
    getUrl() {
      return this.getPath()
    },
    render: () => 'Not Found',
    payload: {
      navigatable: false,
      renderHeader: Header,
      renderNav: Nav,
    },
  },
} satisfies Record<string, AppRoute>
