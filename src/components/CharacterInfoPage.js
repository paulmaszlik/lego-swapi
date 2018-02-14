import React from 'react';

const CharacterInfoPage = props => {
  return (
    <div className="row">
      <div className="col-12 center">
        <h1>{props.character.name}</h1>
      </div>
      <div className="col-2"></div>
      <div className="col-4 left">
        <b>Gender:</b> {props.character.gender} <br/>
        <b>Birth year:</b> {props.character.birth_year} <br/>
        <b>Homeworld:</b> TODO<br/>
        <b>Species:</b> TODO<br/>
        <b>Height:</b> {props.character.height} <br/>
        <b>Mass:</b> {props.character.mass} <br/>
        <b>Hair color:</b> {props.character.hair_color} <br/>
        <b>Skin color:</b> {props.character.skin_color} <br/>
        <b>Eye color:</b> {props.character.eye_color} <br/>
      </div>
      <div className="col-4 left">
        <b>Movies:</b> 
        <b>Vehicles:</b> 
        <b>Starships:</b> 
      </div>
      <div className="col-2"></div>
    </div>
  );
}

export default CharacterInfoPage;