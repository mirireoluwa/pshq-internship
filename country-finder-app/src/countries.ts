import data from '../data.json'
import { Country } from './data/entities'

const countries = data.countries.map((c) => new Country(c))
const countryCodes = ['DEU', 'USA', 'BRA', 'ISL', 'AFG', 'ALA', 'ALB', 'DZA']
const initialCountries = countryCodes.map((code) => getCountry(code))

function getCountries(query: string | null, region: string | null): Country[] {
  if (!region && !query) {
    return initialCountries
  }

  let result = countries
  if (region) {
    result = result.filter((c) => c.region === region)
  }

  if (query) {
    result = result.filter(({ name }) =>
      name.toLowerCase().includes(query.trim().toLowerCase()),
    )
  }

  return result
}

function getCountry(code: string): Country {
  return countries.find((c) => c.code === code)!
}

function getRegions(): Set<string> {
  const regions = new Set<string>()
  countries.forEach((c) => {
    regions.add(c.region)
  })
  return regions
}

export { getCountries, getCountry, getRegions }