import React from 'react';
// MU components
import { Dialog, Tabs, Tab, FlatButton, TextField, Checkbox, Avatar } from 'material-ui';
import ActionDone from 'material-ui/svg-icons/action/done';
import { List, ListItem } from 'material-ui/List';
// Components
import IncludeTracks from './IncludeTracks/IncludeTracks';

// Styles
import './ToPlayListDialog.scss';

class ToPlayListDialog extends React.Component {
  constructor (props) {
    super(props);

    this.initDialogData();
  }

  initDialogData () {
    this.dialog = {
      title: 'Add track to Playlist',
      style: {
        width: '500px'
      },
      bodyStyle: {
        padding: 0
      },
      actionButtons: [
        <FlatButton
          label="Cancel"
          primary={false}
          onTouchTap={this.onCloseDialog}
        />,
        <FlatButton
          label="Proceed"
          primary={true}
          onTouchTap={this.onAddTracks}
        />
      ],
      formData: {}
    };
    this.state = {
      loading: false,
      activeTab: 'playlists',
      errors: {}
    };
    this.styles = {
      list: {
        padding: 0
      },
      listItem: {
        padding: 0,
        border: '1px solid #dcdcdc'
      },
      listItemInnerDiv: {
        padding: '18px 0 18px 65px'
      },
      avatar: {
        borderRadius: 0
      }
    };

    // TODO: custom storage
    const playLists = window.localStorage.getItem('playlists');
    this.playlists = playLists ? JSON.parse(playLists) : [];
  }

  onAddTracks = () => {
    const { dialog, props, state } = this;

    if (state.activeTab === 'add-new') {
      this.playlists.push(Object.assign(dialog.formData, {
        tracks: [ props.data ]
      }));
      // TODO: custom functionality
      window.localStorage.setItem('playlists', JSON.stringify(this.playlists));
    }

    props.onClose();
  };

  onCloseDialog = () => {
    this.props.onClose();
  };

  onChangeField (key, e, value) {
    this.dialog.formData[ key ] = value;
  }

  onTabChange = (value) => {
    this.setState({
      activeTab: value
    });
  };

  render () {
    const { dialog, state, styles } = this;
    const { data } = this.props;

    return (
      <Dialog
        title={dialog.title}
        contentStyle={dialog.style}
        bodyStyle={dialog.bodyStyle}
        actions={dialog.actionButtons}
        open={true}
        modal={false}>
        <div className="playlist-container">
          <Tabs onChange={this.onTabChange} value={state.activeTab}>
            <Tab
              icon={<i className="fa fa-th-list"/>}
              label={'Add to PlayList'}
              value={'playlists'}
            >
              <div className="tab-content">
                <div className="play-lists">
                  <List style={styles.list}>
                    {
                      this.playlists.length && <h3>No playLists</h3>
                    }
                    {
                      this.playlists.map((item, index) => {
                        return (
                          <div key={index} className="play-list-item">
                            <ListItem
                              style={styles.listItem}
                              innerDivStyle={styles.listItemInnerDiv}
                              leftAvatar={
                                <Avatar src={item.image} size={40} style={styles.avatar}/>
                              }
                              rightIcon={
                                <Checkbox
                                  defaultChecked={false}
                                  checkedIcon={<ActionDone />}
                                />
                              }
                              primaryText={<span>{item.name}</span>}
                            />
                          </div>
                        )
                      })
                    }
                  </List>
                </div>
                <IncludeTracks tracks={[data]} />
              </div>
            </Tab>
            <Tab
              icon={<i className="fa fa-plus-circle"/>}
              label={'Create new'}
              value={'add-new'}
            >
              <div className="tab-content">
                <TextField
                  floatingLabelText="New play list name"
                  onChange={this.onChangeField.bind(this, 'name')}
                  fullWidth={true}
                />
                <TextField
                  floatingLabelText="Image URL"
                  onChange={this.onChangeField.bind(this, 'image')}
                  fullWidth={true}
                />
                <IncludeTracks tracks={[data]} />
              </div>
            </Tab>
          </Tabs>
        </div>
      </Dialog>
    )
  }
}

export default ToPlayListDialog;