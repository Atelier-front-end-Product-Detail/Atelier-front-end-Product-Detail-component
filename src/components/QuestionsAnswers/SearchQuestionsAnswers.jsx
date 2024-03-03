import React, {useState, useEffect} from 'react';


const SearchQuestionsAnswers = ({handleSearch}) => {
  const [searchValue, setSearchValue] = useState('')

  const search = (e) => {
    setSearchValue(e.target.value)
  }
  return (
    <div>
      <input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." onChange={search} value={searchValue}></input>
      <button type="button" onClick={() => {handleSearch(searchValue)}}>Search</button>
    </div>
  )
}

export default SearchQuestionsAnswers