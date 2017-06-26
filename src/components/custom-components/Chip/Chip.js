import React from 'react';

// Style
import './Chip.scss';

class Chip extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { tagName, children } = this.props;
    return (
      <div className={`chip ${tagName}`}>
        <span className="tag-content">{children}</span>
      </div>
    )
  }
}

export default Chip;