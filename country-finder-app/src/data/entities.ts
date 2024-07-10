export type RestCountryBasic = CountryCode & {
  name: Name
  capital?: string | string[]
  region: string
  population: number
  flags: { png: string; alt?: string }
}

export type RestCountryFull = RestCountryBasic &
  TopLevelDomain & {
    nativeName?: string
    currencies?: Currencies
    subregion?: string
    languages?: Languages
    borders?: string[]
    flag: string
  }

export type CountryCode = {
  [key in 'alpha3Code' | 'cca3']?: string
}

export type Name =
  | string
  | {
      common: string
      nativeName: { [key: string]: { common: string } }
    }

export type TopLevelDomain = {
  [key in 'topLevelDomain' | 'tld']?: string[]
}

export type Currencies =
  | { [key: string]: { name: string; symbol: string } }
  | {
      code: string
      name: string
      symbol: string
    }[]

export type Languages =
  | { [key: string]: string }
  | {
      iso639_1: string
      iso639_2: string
      name: string
      nativeName: string
    }[]

export class Country {
  #alpha3Code?: string
  #cca3?: string
  #name: Name
  #capital?: string | string[]
  #region: string
  #population: number
  #flags: { png: string; alt?: string }
  #topLevelDomain?: string[]
  #tld?: string[]
  #nativeName?: string
  #currencies?: Currencies
  #subregion?: string
  #languages?: Languages
  #borders?: string[]
  #flag?: string

  constructor(country: RestCountryFull | RestCountryBasic) {
    this.#alpha3Code = country.alpha3Code
    this.#cca3 = country.cca3
    this.#name = country.name
    this.#capital = country.capital
    this.#region = country.region
    this.#population = country.population
    this.#flags = country.flags

    if ('flag' in country) {
      this.#topLevelDomain = country.topLevelDomain
      this.#tld = country.tld
      this.#nativeName = country.nativeName
      this.#currencies = country.currencies
      this.#subregion = country.subregion
      this.#languages = country.languages
      this.#borders = country.borders
      this.#flag = country.flag
    }
  }

  get code(): string | undefined {
    return this.#alpha3Code ?? this.#cca3
  }

  get name(): string {
    return typeof this.#name === 'string' ? this.#name : this.#name.common
  }

  get capital(): string | undefined {
    return this.#capital?.toString()
  }

  get region(): string {
    return this.#region
  }

  get population(): string {
    return this.#population.toLocaleString('en-US')
  }

  get flag(): { png: string; alt?: string; emoji?: string } {
    return {
      ...this.#flags,
      emoji: this.#flag,
    }
  }

  get tld(): string | undefined {
    return this.#topLevelDomain?.join(', ') ?? this.#tld?.join(', ')
  }

  get nativeName(): string | undefined {
    if (typeof this.#name === 'string') {
      return this.#nativeName
    } else {
      return Object.values(this.#name.nativeName).map((n) => n.common)[0]
    }
  }

  get currencies(): string | undefined {
    const currencies = this.#currencies

    if (Array.isArray(currencies)) {
      return currencies?.map((c) => c.name).join(', ')
    }

    if (currencies) {
      return Object.values(currencies)
        .map((c) => c.name)
        .join(', ')
    }
  }

  get subregion(): string | undefined {
    return this.#subregion
  }

  get languages(): string | undefined {
    const languages = this.#languages

    if (Array.isArray(languages)) {
      return languages.map((l) => l.name).join(', ')
    }

    if (languages) {
      return Object.values(languages).join(', ')
    }
  }

  get borders(): string[] | undefined {
    return this.#borders
  }
}
