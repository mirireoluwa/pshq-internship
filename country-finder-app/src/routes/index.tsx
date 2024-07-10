import { Form, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { useEffect } from 'react'
import { getCountries, getRegions } from '../countries'
import { Country } from '../data/entities'
import SearchBox from '../components/SearchBox'
import Card from '../components/Card'
import FilterBox from '../components/FilterBox'


export const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const r = url.searchParams.get('region')

  const countries = getCountries(q, r)
  const regions = getRegions()
  return { countries, regions, q, r }
}

const Index = () => {
  const { countries, regions, q, r } = useLoaderData() as {
    countries: Country[]
    regions: Set<string>
    q: string | null
    r: string | null
  }

  useEffect(() => {
    ;(document.getElementById('q') as HTMLInputElement).value = q || ''
    ;(document.getElementById('region') as HTMLSelectElement).value = r || ''
  }, [q, r])

  return (
    <>
      <Form role="search" className="flex flex-wrap gap-8 justify-between">
        <SearchBox q={q} />
        <FilterBox options={regions} selected={r} />
      </Form>

      {countries.length ? (
        <>
          <h2 className="sr-only">Countries</h2>
          <ul className="card-grid">
            {countries.map((country) => (
              <li key={country.code}>
                <Card country={country} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Your search doesn't match any country.</p>
      )}
    </>
  )
}

export default Index