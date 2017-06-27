import React from 'react';
// Settings
import {USER_IMG_DEFAULT} from '../../../../settings';
// Styles
import './UserDetails.scss';

class UserDetails extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      showDetails: false
    };

    this.detailItems = [
      {
        name: 'Profile',
        action: 'open_profile',
        icon: 'fa-address-card-o'
      },
      {
        name: 'Friends',
        action: 'open_friends',
        icon: 'fa-users',
        number: 0
      },
      {
        name: 'Messages',
        action: 'open_messages',
        icon: 'fa-envelope-open',
        number: 0
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

  onToggleDetails = (e) => {
    const { showDetails } = this.state;

    this.setState({
      showDetails: !showDetails
    });
  };

  onCallAction (name) {
    const { onAction } = this.props;

    if (onAction) {
      onAction(name);
    }
  }

  render () {
    const { user } = this.props;
    const { showDetails } = this.state;
    const { detailItems } = this;

    return (
      <div className="user-details" onClick={this.onToggleDetails}>
        <div className="avatar">
          <img src={user.avatar_url || USER_IMG_DEFAULT} alt="avatar"/>
        </div>
        <div className="user-name">
          <span>{user.username}</span>
        </div>
        <div className="user-notifications">
          <i className="fa fa-bell" />
        </div>
        {
          showDetails &&
          <div className="details">
            {detailItems.map((item, index) => {
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
        }
      </div>
    )
  }
}

export default UserDetails;