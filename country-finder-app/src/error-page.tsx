import { Link, useRouteError, useNavigate } from 'react-router-dom';
import BackIcon from './assets/arrow-back-outline.svg';

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="[ flow wrapper ] [ text-center grid min-h-screen justify-items-center content-center ]"
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-neutral-400">
        {(error as { statusText: string }).statusText ||
          (error as Error).message}
      </p>
      <div className="[ navigation ] [ flex flex-wrap items-center justify-center gap-4 mt-12 font-semibold ]">
        <button
          className="[ button ] [ px-8 shadow-lg ]"
          onClick={() => navigate(-1)}
        >
          <img src={BackIcon} className="icon icon-stroke" />
          Back
        </button>
        <Link to="/" className="[ button ] [ text-sky-600 px-8 shadow-lg ]">
          Go to homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;