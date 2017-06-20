import React, { Component } from 'react';
// Components
import SpinnerGlobal from '../custom-components/System/Spinner/SpinnerGlobal';
import Messenger from '../custom-components/System/Messenger/Messenger';
import DialogAdapter from '../custom-components/Dialogs/DialogAdapter';
// Style
import './Page.scss';

class Page extends Component {
  constructor (props) {
    super(props);
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