import React, {useState, useEffect} from 'react';


const SearchQuestionsAnswers = ({handleSearch}) => {
  const [searchValue, setSearchValue] = useState('')

  const search = (e) => {
    setSearchValue(e.target.value)
  }
  return (
    <div className="questions-search-container">
      <input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." onChange={(e) => {
        handleSearch(e.target.value);
        search(e)
      }} value={searchValue} className="question-search"></input>
      <button className="question-search-btn" type="button"><span className="material-symbols-outlined">
search
</span></button>
    </div>
  )
}

export default SearchQuestionsAnswers