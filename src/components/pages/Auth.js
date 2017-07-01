import React from 'react';
// Services
import URL_Service from '../../services/QueryParamService/URLservice';
import AuthService from '../../services/AuthService/AuthService'

class Auth extends React.Component {
  constructor (props) {
    super(props);

    const auth = {
      socialName: props.params.social,
      code: URL_Service.getQueryParam('code')
    };

    if (auth.code && auth.socialName) {
      console.log(auth.socialName, auth.code);
      AuthService.socialAuth(auth.socialName, auth.code);
    }
  }

  render() {
    return (
      <div className="auth">Social Authorization</div>
    )
  }
}

export default Auth;
