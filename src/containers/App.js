import _ from 'underscore';
import axios from 'axios'
import React, { Component } from 'react';

import CharacterInfoPage from '../components/CharacterInfoPage';
import ErrorBar from '../components/ErrorBar';
import SearchResult from '../components/SearchResult';

import '../css/App.css';
import '../css/simple-grid.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.getResultsForSearchValue = _.debounce(this.getResultsForSearchValue, 250); 
    this.handleCloseErrorMsg = this.handleCloseErrorMsg.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSelectCharacter = this.handleSelectCharacter.bind(this);
    this.swDBupdate = this.swDBupdate.bind(this);
    
    this.state = {
      appError: '',
      loading: false,
      searchValue: '',
      searchResult: undefined,
      selectedCharacter: undefined,
      swDB: {
        vehicles: [],
        starships: [],
        species: [],
        planets: [],
        films: []
      }
    }
  }

  getResultsForSearchValue() {
    if (!this.state.searchValue) return;

    const handleResponse = (err, res) => {
      if (err) {
        return this.setState(prevState => ({
          appError: err.message
        }));
      }

      console.log(res.data);

      // update the results only if params equals with input (for latest result)
      if (res.config && res.config.params && res.config.params.search === this.state.searchValue) {
        this.setState({
          loading: false,
          searchResult: res.data
        });
      }
    }

    axios.get('https://swapi.co/api/people/?search=', {
      params: {
        search: this.state.searchValue
      }
    })
    .then(res => handleResponse(null, res))
    .catch(res => handleResponse(res))
  }
  
  handleCloseErrorMsg() {
    this.setState({
      appError: undefined
    })
  }

  handleSearchInputChange(e) {
    let val = e.target.value.trim();

    this.setState(prevState => ({
      searchValue: val,
      loading: val.length > 0,
      searchResult: val.length === 0 ? undefined : prevState.searchResult
    }));

    this.getResultsForSearchValue();
  }

  handleSelectCharacter(nameOfCharacter) {
    // get selected character data from search result list
    let character = this.state.searchResult.results.filter(res => {
      return res.name === nameOfCharacter;
    })[0];
    
    this.setState({
      searchValue: '',
      selectedCharacter: character,
      searchResult: undefined
    });

    // set focus back to input field
    this.searchInput.focus();
  }

  swDBupdate(dataType, data) {
    this.setState(prevState => {
      let newState = {
        swDB: {
          ...prevState.swDB
        }
      }

      // add new data to local state db
      newState.swDB[dataType] = [...newState.swDB[dataType], data];
      
      return newState;
    });
  }

  render() {
    return (
      <div className="App container">
        <ErrorBar errorMessage={this.state.appError} handleCloseErrorMsg={this.handleCloseErrorMsg} />
        <div className="row">
          <div className="col-12">
            <h1>Star Wars Character Database</h1>

            <input 
             autoFocus 
             type="text" 
             className="searchInput" 
             value={this.state.searchValue} 
             onChange={this.handleSearchInputChange} placeholder="Start typing a name..."
             ref={(input) => { this.searchInput = input; }} 
            />

            <SearchResult 
             loading={this.state.loading} 
             searchResult={this.state.searchResult} 
             handleSelectCharacter={this.handleSelectCharacter}
            />

            {this.state.selectedCharacter && (
              <CharacterInfoPage character={this.state.selectedCharacter} swDB={this.state.swDB} swDBupdate={this.swDBupdate}/>
            )} 
          </div>
        </div>
      </div>
    );
  }
}

export default App;
