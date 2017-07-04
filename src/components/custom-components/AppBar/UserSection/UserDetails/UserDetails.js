import React from 'react';
// M-UI components
import {Popover} from 'material-ui';
// Settings
import {USER_IMG_DEFAULT} from '../../../../../settings';
// Services
import Settings_SRV from '../../../../../services/AppSettings/AppSettings';
// Styles
import './UserDetails.scss';

class UserDetails extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      showDetails: false,
      Messages: Settings_SRV.getValue('account', 'showMessages'),
      Friends: Settings_SRV.getValue('account', 'showFriends')
    };
    this.anchorEl = null;
  }

  onToggleDetails = (e) => {
    const { showDetails } = this.state;

    this.anchorEl = e.currentTarget;
    this.setState({
      showDetails: !showDetails
    });
  };

  getDetailItems() {
    return [
      {
        name: 'Profile',
        action: 'open_profile',
        icon: 'fa-address-card-o'
      },
      {
        name: 'Friends',
        action: 'open_friends',
        icon: 'fa-users',
        number: 0,
        hidden: !Settings_SRV.getValue('account', 'showFriends')
      },
      {
        name: 'Messages',
        action: 'open_messages',
        icon: 'fa-envelope-open',
        number: 0,
        hidden: !Settings_SRV.getValue('account', 'showMessages')
      },
      {
        name: 'Likes',
        action: 'open_likes',
        icon: 'fa-heart',
        number: 0
      },
      {
        name: 'Playlists',
        action: 'open_playlists',
        icon: 'fa-list-alt',
        number: 0
      },
      {
        name: 'Sign out',
        action: 'sign_out',
        icon: 'fa-sign-out'
      }
    ];
  }

  onCallAction (name) {
    const { onAction } = this.props;

    if (onAction) {
      onAction(name);
    }
    this.onClosePopOver();
  }

  onClosePopOver =()=> {
    this.setState({
      showDetails: false
    });
  };

  render () {
    const { user } = this.props;
    const { showDetails } = this.state;

    return (
      <div className="user-details">
        <div className="content" onClick={this.onToggleDetails}>
          <div className="avatar">
            <img src={user.avatar_url || USER_IMG_DEFAULT} alt="avatar"/>
          </div>
          <div className="user-name">
            <span>{user.username}</span>
          </div>
          <div className="user-notifications">
            <i className="fa fa-bell" />
          </div>
        </div>
        <Popover
          open={showDetails}
          anchorEl={this.anchorEl}
          style={{background: 'black'}}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.onClosePopOver}
        >
          <div className="details">
            {this.getDetailItems().map((item, index) => {
              if (item.hidden) {
                return false;
              }
              return (
                <div
                  className="details-item"
                  key={index}
                  onClick={this.onCallAction.bind(this, item.action)}>
                  <i className={`fa ${item.icon}`} />
                  <span>{item.name}</span>
                  {!!item.number && <span className="count-value">{item.number}</span>}
                </div>
              )
            })}
          </div>
        </Popover>
      </div>
    )
  }
}

export default UserDetails;