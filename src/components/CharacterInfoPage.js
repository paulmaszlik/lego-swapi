import React from 'react';
import CharacterInfoDetailFromDB from './CharacterInfoDetailFromDB';
import CharacterInfoPropertyName from './CharacterInfoPropertyName';

const CharacterInfoPage = props => {
  return (
    <div className="CharacterInfoPage row">
      <div className="CharacterInfoPage--title center">
        {props.character.name}
      </div>
      <div className="col-4 left">
        <CharacterInfoPropertyName name="Gender"/> {props.character.gender} <br/>
        <CharacterInfoPropertyName name="Birth year"/> {props.character.birth_year} <br/>
        <CharacterInfoPropertyName name="Height (cm)"/> {props.character.height} <br/>
        <CharacterInfoPropertyName name="Mass (kg)"/> {props.character.mass} <br/>
        <CharacterInfoPropertyName name="Hair color"/> {props.character.hair_color} <br/>
        <CharacterInfoPropertyName name="Skin color"/> {props.character.skin_color} <br/>
        <CharacterInfoPropertyName name="Eye color"/> {props.character.eye_color} <br/>
      </div>
      <div className="col-4 left">
        <CharacterInfoPropertyName name="Homeworld"/>
        <CharacterInfoDetailFromDB
         dataType="planets" 
         url={props.character.homeworld} 
         swDB={props.swDB}
         swDBupdate={props.swDBupdate}
        />
        <CharacterInfoPropertyName name="Species"/>
        <CharacterInfoDetailFromDB
         dataType="species" 
         url={props.character.species[0]} 
         swDB={props.swDB}
         swDBupdate={props.swDBupdate}
        />
        <CharacterInfoPropertyName name="Movies"/>
        {props.character.films.map(film => (
        <CharacterInfoDetailFromDB
          key={film}
          dataType="films" 
          url={film} 
          swDB={props.swDB}
          swDBupdate={props.swDBupdate}
         />)
        )}
      </div>
      <div className="col-4 left">
        <CharacterInfoPropertyName name="Vehicles"/>
        {props.character.vehicles.length === 0 && (<div>-</div>)}
        {props.character.vehicles.map(vehicle => (
        <CharacterInfoDetailFromDB
          key={vehicle}
          dataType="vehicles" 
          url={vehicle} 
          swDB={props.swDB}
          swDBupdate={props.swDBupdate}
         />)
        )} 
        <CharacterInfoPropertyName name="Starships"/>
        {props.character.starships.length === 0 && (<div>-</div>)}
        {props.character.starships.map(starship => (
        <CharacterInfoDetailFromDB
          key={starship}
          dataType="starships" 
          url={starship} 
          swDB={props.swDB}
          swDBupdate={props.swDBupdate}
         />)
        )} 
      </div>
    </div>
  );
}

export default CharacterInfoPage;