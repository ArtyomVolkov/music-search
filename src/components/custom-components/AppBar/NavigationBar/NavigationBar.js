import React from 'react';
// Services
import RouterService from '../../../../services/RouterService/RouterService';
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
    const { authorized } = this.props;

    return (
      <div className="nav-bar">
        <i className={`fa fa-search ${currentPage === '/search' ? 'active' : ''}`}
           onClick={this.onNavigateTo.bind(this, '/search')}>
          <span className="icon-title">Search</span>
        </i>
        {
          authorized &&
          <i className={`fa fa-list-alt ${currentPage === '/play-lists' ? 'active' : ''}`}
             onClick={this.onNavigateTo.bind(this, '/play-lists')}>
            <span className="icon-title">Playlists</span>
          </i>
        }
        {
          authorized &&
          <i className={`fa fa-star ${currentPage === '/favorites' ? 'active' : ''}`}
             onClick={this.onNavigateTo.bind(this, '/favorites')}>
            <span className="icon-title">Favorites</span>
          </i>
        }
        {
          authorized &&
          <i className={`fa fa-line-chart ${currentPage === '/statistic' ? 'active' : ''}`}
             onClick={this.onNavigateTo.bind(this, '/statistic')}>
            <span className="icon-title">Statistic</span>
          </i>
        }
      </div>
    )
  }
}

export default NavigationBar;