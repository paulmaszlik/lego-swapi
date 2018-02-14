import React from 'react';

const ErrorBar = props => {
  return (
    <div>
      {props.errorMessage && 
      (<div className="ErrorBar">
        <h3 className="ErrorBar--title">Error occured!</h3>
        {props.errorMessage}
        <div className="ErrorBar--closeButton">
          <button onClick={props.handleCloseErrorMsg}>Close this message</button>
        </div>
      </div>)}
    </div>
  );
}

export default ErrorBar;