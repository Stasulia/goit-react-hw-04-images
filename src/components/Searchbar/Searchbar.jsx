import React, { useState } from 'react';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleOnChange = event => {
    setSearchValue(event.currentTarget.value);
  };
  const handleOnSubmit = event => {
    event.preventDefault();
    if (!searchValue.trim()) return alert('Please, enter your request');
    onSubmit(searchValue);
    setSearchValue('');
  };
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleOnSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          onChange={handleOnChange}
          value={searchValue}
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
