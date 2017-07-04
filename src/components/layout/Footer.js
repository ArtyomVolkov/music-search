import React from 'react';
// Components
import Player from '../custom-components/Player/Player';
// Style
import './Footer.scss';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="footer-container">
        <Player />
      </div>
    )
  }
}

export default Footer;
