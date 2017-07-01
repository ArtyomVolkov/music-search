import React from 'react';
// style
import './../../styles/commons.scss';

class NotFound extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="not-found">
        <h1>404 PAGE NOT FOUND</h1>
      </div>
    )
  }
}

export default NotFound;
