import React from 'react';

class Auth extends React.Component {
  constructor (props) {
    super(props);

    console.log(props.params);
  }

  render() {
    return (
      <div className="auth">Auth</div>
    )
  }
}

export default Auth;
