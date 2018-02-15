import React from 'react';

const numberOfResults = (count) => 
(
  <div>
    {count} characther{count>1?`s`:``} found.
    {count>10?(<small>(show 10 results/page)</small>):undefined}
  </div>
);

const SearchResult = props => {
  return (
    <div>
      {props.loading && (
        <div className="loader"></div>
      )}

      {!props.loading && props.searchResult && (
        <div>
          <p>
            {numberOfResults(props.searchResult.count)}
          </p>

          {props.searchResult.results.map(oneResult => (
            <div 
             className="SearchResult--oneResult" 
             key={oneResult.name} 
             onClick={() => props.handleSelectCharacter(oneResult.name)}>{oneResult.name}
            </div>
          ))}

          {props.searchResult.previous && (
            <a 
             onClick={() => {props.getResultsForSearchValue(props.searchResult.previous)}}
             className="SearchResult--pageButton" 
            >
              Previous page
            </a>
          )}

          {props.searchResult.next && (
            <a 
             onClick={() => {props.getResultsForSearchValue(props.searchResult.next)}}
             className="SearchResult--pageButton" 
            >
              Next page
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResult;