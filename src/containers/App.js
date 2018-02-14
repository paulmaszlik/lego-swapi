import _ from 'underscore';
import axios from 'axios'
import React, { Component } from 'react';

import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleCloseErrorMsg = this.handleCloseErrorMsg.bind(this);
    this.getResults = _.debounce(this.getResults, 250); 

    this.state = {
      appError: undefined,
      searchValue: '',
      loading: false,
      result: undefined
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
          result: res.data
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

    this.setState({
      searchValue: val,
      loading: val.length > 0
    });

    this.getResults();
  }

  handleCloseErrorMsg() {
    this.setState({
      appError: undefined
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.appError && (
          <div>
            {this.state.appError}
            <a onClick={this.handleCloseErrorMsg}>Close this message</a>
          </div>
        )}
        <h1>Star Wars Character Database</h1>
        <input type="text" value={this.state.searchValue} onChange={this.handleSearchInputChange} placeholder="Start typing a name of SW character..."/>
        {this.state.loading && (
          <p>Loading</p>
        )}

        {!this.state.loading && this.state.searchValue && this.state.result && (
          <div>
            <p>
              {this.state.result.count} character found.
            </p>
            {this.state.result.results.map(oneResult => (
              <p key={oneResult.name}>{oneResult.name}</p>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default App;
