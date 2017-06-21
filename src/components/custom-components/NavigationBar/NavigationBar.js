import React from 'react';
// Services
import RouterService from '../../../services/RouterService/RouterService';
// Style
import './NavigationBar.scss';

class NavigationBar extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      currentPage: RouterService.getCurrentPageName()
    };
  }

  onNavigateTo (page) {
    const currentPageName = RouterService.getCurrentPageName();

    if (currentPageName !== page) {
      RouterService.navigate(page);
      this.setState({
        currentPage: page
      });
    }
  }

  render () {
    const { currentPage } = this.state;

    return (
      <div className="nav-bar">
        <i className={`fa fa-search ${currentPage === '/search' ? 'active' : ''}`}
           onClick={this.onNavigateTo.bind(this, '/search')}>
          <span className="icon-title">Search</span>
        </i>
        <i className={`fa fa-list-alt ${currentPage === '/play-lists' ? 'active' : ''}`}
           onClick={this.onNavigateTo.bind(this, '/play-lists')}>
          <span className="icon-title">Playlists</span>
        </i>
        <i className={`fa fa-play-circle-o ${currentPage === '/recent-activity' ? 'active' : ''}`}
           onClick={this.onNavigateTo.bind(this, '/recent-activity')}>
          <span className="icon-title">Recent Activity</span>
        </i>
      </div>
    )
  }
}

export default NavigationBar;