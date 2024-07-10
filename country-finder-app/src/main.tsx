import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import Root from './routes/root';
import ErrorPage from './error-page';
import Country, { loader as countryLoader } from './routes/country';
import Index, { loader as countriesLoader } from './routes/index';

import './css/main.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: countriesLoader,
      },
      {
        path: 'country/:countryCode',
        element: <Country />,
        loader: countryLoader,
      },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Toggle dark mode based on system and user preference
if (
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}