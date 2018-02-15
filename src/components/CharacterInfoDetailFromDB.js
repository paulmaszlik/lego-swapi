import _ from 'underscore';
import axios from 'axios';
import React from 'react';

export default class CharacterInfoDetailFromDB extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: undefined
    }
  }

  componentWillMount() {
    this.getDetail(this.props.url, this.props.swDB, this.props.dataType)
  }

  componentWillReceiveProps(nextProps) {
    // if the props are the same don't update info
    if (this.props.url === nextProps.url) return;

    this.setState({
      value: undefined
    });

    this.getDetail(nextProps.url, nextProps.swDB, nextProps.dataType)
  }

  // getDetials resolve an url by type for character info page
  // once resolve an url, store it in app's state - get value from there next time
  getDetail(url, swDB, dataType) {
    if (!url) {
      return this.setState({
        value: 'unknown'
      });
    }

    // let search the value in local state
    let resultFromLocalswDB = _.findWhere(swDB[dataType], {"url": url});
    let parameterName = dataType === 'films' ? 'title' : 'name';

    // if we found it, set it and return from this function
    if (resultFromLocalswDB) {
      return this.setState({
        value: resultFromLocalswDB[parameterName]
      });
    }

    // if there is no local state value for this url -> get it from swapi
    axios.get(url).then(response => {
      // save it to app's state
      this.props.swDBupdate(dataType, response.data);

      this.setState({
        value: response.data[parameterName]
      });
    });
  }

  render() {
    return (
      <div className="CharacterInfoDetailFromDB">
        {!this.state.value && (<div className="loader loader-small"></div>)}
        {this.state.value}
      </div>
    );
  } 
}