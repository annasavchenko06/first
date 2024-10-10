import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { routes } from '~/app/route'

import * as api from '../api'

export default function Component() {
  const [pokemonApiResponse, setPokemonApiResponse] = useState<api.getMany.Response | null>(null)
  useEffect(() => void getData(), [])

  async function getData() {
    const data = await api.getMany.request()
    setPokemonApiResponse(data)
  }

  return (
    <ul>
      {pokemonApiResponse?.results?.map((item) => {
        return (
          <li key={item.name}>
            <Link to={routes.Pokemon_getByName.getUrl(item.name)}>{item.name}</Link>
          </li>
        )
      })}
    </ul>
  )
}
