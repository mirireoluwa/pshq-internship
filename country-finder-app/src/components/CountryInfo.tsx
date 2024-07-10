import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { getCountry } from "../countries";
import { Country } from "../data/entities";
import CountryButton from "./CountryButton";
import InfoLine from "./InfoLine";

interface Props {
  country: Country;
  level: "summary" | "detail";
}

export type Ref = HTMLAnchorElement;

const CountryInfo = forwardRef<Ref, Props>((props, ref) => {
  const {
    name,
    code,
    nativeName,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders,
  } = props.country;

  return props.level === "detail" ? (
    <>
      <h2>{name}</h2>

      <div className="flex flex-wrap gap-8 justify-between">
        <div className="[ infolines ] [ flow ]">
          <InfoLine title="Native Name" text={nativeName} />
          <InfoLine title="Population" text={population} />
          <InfoLine title="Region" text={region} />
          <InfoLine title="Sub Region" text={subregion} />
          <InfoLine title="Capital" text={capital} />
        </div>
        <div className="[ infolines ] [ flow ]">
          <InfoLine title="Top Level Domain" text={tld} />
          <InfoLine title="Currencies" text={currencies} />
          <InfoLine title="Languages" text={languages} />
        </div>
      </div>

      {borders?.[0] && (
        <InfoLine title="Border Countries">
          <ul className="cluster">
            {borders
              .map((b) => getCountry(b))
              .map((c) => (
                <li key={c.code}>
                  <Link to={`/country/${c.code}`} className="border border-gray-300 rounded-md p-2 shadow-md transition-shadow duration-200 hover:shadow-lg">
                    <CountryButton country={c} />
                  </Link>
                </li>
              ))}
          </ul>
        </InfoLine>
      )}
    </>
  ) : (
    <>
      <h3>
        <Link to={`country/${code}`} ref={ref} className="border border-gray-300 rounded-md p-2 inline-block shadow-md transition-shadow duration-200 hover:shadow-lg">
          {name}
        </Link>
      </h3>
      <div className="[ infolines ] [ flow ]">
        <InfoLine title="Population" text={population} />
        <InfoLine title="Region" text={region} />
        <InfoLine title="Capital" text={capital} />
      </div>
    </>
  );
});

export default CountryInfo;