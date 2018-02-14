import React from 'react';

const numberOfResults = (count) => (`${count} characther${count>1?`s`:``} found.`);

const SearchResult = props => {
  return (
    <div>
      {props.loading && (
        <p>Loading</p>
      )}

      {!props.loading && props.searchResult && (
        <div>
          <p>
              {numberOfResults(props.searchResult.count)}
          </p>
          {props.searchResult.results.map(oneResult => (
              <div className="SearchResult--oneResult" key={oneResult.name} onClick={() => props.handleSelectCharacter(oneResult.name)}>{oneResult.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResult;