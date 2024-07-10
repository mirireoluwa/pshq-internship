import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Country } from '../data/entities';


interface Props {
  country: Country
}

const CountryButton: FC<Props> = (props: Props) => {
  return (
    <Link
      to = { `../country/${props.country.code}`}
      className = "button py-1 px-7"
      >
        {props.country.name}
      </Link>
  );
};

export default CountryButton;