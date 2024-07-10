import { useSubmit } from 'react-router-dom';
import { ChangeEvent, useRef } from 'react';
import debounce from 'lodash/debounce';
import SearchIcon from '../assets/search-outline.svg';
import ClearIcon from '../assets/close-outline.svg';

interface Props {
  q: string | null
}

const SearchBox = ({ q }: Props) => {
  const submit = useSubmit();
  const ref = useRef<HTMLInputElement>(null);

  const debouncedSubmit = debounce((form: HTMLFormElement, replace: boolean) => {
    submit(form, { replace });
  }, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isFirstSearch = q === null;
    const inputValue = e.currentTarget.value.toLowerCase(); // Convert input value to lowercase
    debouncedSubmit(e.currentTarget.form as HTMLFormElement, !isFirstSearch);
  };

  const handleClear = () => {
    ref.current!.value = '';
    debouncedSubmit(ref.current!.form as HTMLFormElement, true); // Perform search reset on clear
  };

  return (
    <label className="searchbox">
      <img src={SearchIcon} className="icon icon-stroke" aria-hidden="true" />
      <input
        type="search"
        id="q"
        name="q"
        defaultValue={q || ''}
        onChange={handleChange}
        aria-label="Search for a country"
        placeholder="Search for a country..."
        ref={ref}
      />

      <button
        aria-label="Clear Search query"
        onClick={handleClear}
      >
        <img src={ClearIcon} className="icon icon-strike" aria-hidden="true" />
      </button>
    </label>
  );
};

export default SearchBox;
