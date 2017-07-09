import React from 'react';
// Components
import SpinnerGlobal from '../custom-components/System/Spinner/SpinnerGlobal';
import Messenger from '../custom-components/System/Messenger/Messenger';
import DialogAdapter from '../custom-components/Dialogs/DialogAdapter';
// Services
import AuthService from '../../services/AuthService/AuthService';
import SocialAuthService from '../../services/AuthService/SocialAuthService';
import {getCookie} from '../../utils/commons';
// Style
import './Page.scss';

class Page extends React.Component {
  constructor (props) {
    super(props);

    this.checkAuth();
  }

  checkAuth () {
    // get cookie is social login
    const social = getCookie('_SAN');

    if (social) {
      // load social sdk + auto authorisation
      SocialAuthService[social].onInit();
      return;
    }
    // only load socials sdk, without auto authorisation
    SocialAuthService.google.onLoad();
    AuthService.checkBasicAuth();
  }

  render () {
    const { props } = this;

    return (
      <div className='app-content'>
        <header>{props.header}</header>
        <main>{props.content}</main>
        <footer>{props.footer}</footer>
        <SpinnerGlobal />
        <DialogAdapter />
        <Messenger />
      </div>
    )
  }
}

export default Page;