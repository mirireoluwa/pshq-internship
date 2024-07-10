import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

interface Props {
  title: string
}

const Header = (props: Props) => {
  return (
    <header className= "site-header">
      <div className="[ inner ] [ wrapper cluster ]">
        <h1>
          <Link to = "/"> {props.title}</Link>
        </h1>
        <DarkModeToggle />
      </div>
    </header>
  )
}

export default Header