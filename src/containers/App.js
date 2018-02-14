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

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleCloseErrorMsg = this.handleCloseErrorMsg.bind(this);
    this.handleSelectCharacter = this.handleSelectCharacter.bind(this);
    this.getResults = _.debounce(this.getResults, 250); 

    this.state = {
      appError: '',
      loading: false,
      searchValue: '',
      searchResult: undefined,
      selectedCharacter: undefined
    }
  }

  getResults() {
    if (!this.state.searchValue) return;

    const handleResponse = (err, res) => {
      if (err) {
        return this.setState(prevState => ({
          appError: err.message
        }));
      }

      // update the results only if params uquals with input (for latest result)
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

  handleSearchInputChange(e) {
    let val = e.target.value.trim();

    this.setState(prevState => ({
      searchValue: val,
      loading: val.length > 0,
      searchResult: val.length === 0 ? undefined : prevState.searchResult
    }));

    this.getResults();
  }

  handleCloseErrorMsg() {
    this.setState({
      appError: undefined
    })
  }

  handleSelectCharacter(nameOfCharacter) {
    let character = this.state.searchResult.results.filter(res => {
      return res.name === nameOfCharacter;
    });

    this.setState({
      searchValue: nameOfCharacter,
      selectedCharacter: character[0],
      searchResult: undefined
    });
  }

  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-12">
            <ErrorBar errorMessage={this.state.appError} handleCloseErrorMsg={this.handleCloseErrorMsg} />
            <h1>Star Wars Character Database</h1>
            <input type="text" className="searchInput" value={this.state.searchValue} onChange={this.handleSearchInputChange} placeholder="Start typing a name of SW character..."/>
            <SearchResult loading={this.state.loading} searchResult={this.state.searchResult} handleSelectCharacter={this.handleSelectCharacter} />
            {this.state.selectedCharacter && (
              <CharacterInfoPage character={this.state.selectedCharacter}/>
            )} 
          </div>
        </div>
      </div>
    );
  }
}

export default App;
