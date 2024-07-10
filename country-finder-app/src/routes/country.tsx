import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom'
import { getCountry } from '../countries'

import Flag from '../components/Flag'
import CountryInfo from '../components/CountryInfo'
import BackIcon from '../assets/arrow-back-outline.svg'
import { Country } from '../data/entities'

export const loader = ({ params }: LoaderFunctionArgs) => {
  const country = getCountry(params.countryCode!)
  return { country }
}

const CountryPage = () => {
  const navigate = useNavigate()
  const { country } = useLoaderData() as { country: Country }

  return (
    <>
      <nav className="navigation">
        <button className="[ button ] [ px-8 shadow-md transition-shadow duration-200 hover:shadow-lg ]" onClick={() => navigate(-1)}>
          <img src={BackIcon} className="icon icon-stroke" />
          Back
        </button>
      </nav>
      <div className="country">
        <div className="flag">
          <Flag png={country.flag.png} />
        </div>
        <div className="[ content ] [ flow ]">
          <CountryInfo country={country} level="detail" />
        </div>
      </div>
    </>
  )
}

export default CountryPage;