import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SearchQuestionsAnswers({ handleSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const search = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="questions-search-container">
      <input
      data-testid="search"
        type="text"
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
        onChange={(e) => {
          handleSearch(e.target.value);
          search(e);
        }}
        value={searchValue}
        className="question-search"
      />
      <button className="question-search-btn" type="button">
        <span className="material-symbols-outlined">
          search
        </span>
      </button>
    </div>
  );
}

SearchQuestionsAnswers.propTypes = {
handleSearch: PropTypes.func
};

export default SearchQuestionsAnswers;
