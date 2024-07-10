import { useRef } from 'react';
import { Country } from '../data/entities';
import Flag from './Flag';
import CountryInfo from './CountryInfo';

interface Props {
  country: Country;
}

const Card = ({ country }: Props) => {
  const ref = useRef<HTMLAnchorElement>(null);

  let up: number, down: number;

  return (
    <div
      className="card cursor-pointer"
      onMouseDown={() => (down = +new Date())}
      onMouseUp={() => {
        up = +new Date();
        if (up - down < 200) {
          ref.current?.click();
        }
      }}
    >
      <div className="flag frame">
        <Flag png={country.flag.png} />
      </div>
      <div className="text">
        <CountryInfo country={country} level="summary" ref={ref} />
      </div>
    </div>
  );
};

export default Card;