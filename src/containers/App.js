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

    this.getResultsForSearchValue = _.debounce(this.getResultsForSearchValue, 250).bind(this); 
    this.handleCloseErrorMsg = this.handleCloseErrorMsg.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSelectCharacter = this.handleSelectCharacter.bind(this);
    this.swDBupdate = this.swDBupdate.bind(this);
    
    this.state = {
      appError: '',
      lastRequestedUrl: undefined,
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

  getResultsForSearchValue(url = `https://swapi.co/api/people/?search=${this.state.searchValue}`) {
    const handleResponse = (err, res) => {
      if (err) {
        return this.setState(prevState => ({
          appError: err.message
        }));
      }

      // update the results only if requested url is the last requested url
      if (res.config && res.config.url === this.state.lastRequestedUrl) {
        this.setState({
          loading: false,
          searchResult: res.data
        });
      }
    }

    this.setState({
      loading: true,
      lastRequestedUrl: url
    })
    
    axios.get(url)
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
      searchResult: val.length === 0 ? undefined : prevState.searchResult
    }));

    if (val.length > 0) {
      this.getResultsForSearchValue();
    }
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
             onChange={this.handleSearchInputChange} placeholder="Start typing a name... Who is your favourite?"
             ref={(input) => { this.searchInput = input; }} 
            />

            <SearchResult 
             getResultsForSearchValue={this.getResultsForSearchValue}
             handleSelectCharacter={this.handleSelectCharacter}
             loading={this.state.loading} 
             searchResult={this.state.searchResult} 
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
