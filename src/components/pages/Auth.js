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
      AuthService.setSocialCookie(auth.socialName, auth.code);
    }
  }

  render() {
    return (
      <div className="authorization-content">
        <h1>Social Authorization</h1>
      </div>
    )
  }
}

export default Auth;
