import React from 'react';

const SearchResult = props => {
  return (
    <div>
      {props.loading && (
        <p>Loading</p>
      )}

      {!props.loading && props.searchResult && (
        <div>
          <p>
              {props.searchResult.count} character found.
          </p>
          {props.searchResult.results.map(oneResult => (
              <p key={oneResult.name} onClick={() => props.handleSelectCharacter(oneResult.name)}>{oneResult.name}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResult;