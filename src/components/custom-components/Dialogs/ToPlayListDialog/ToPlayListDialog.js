import React from 'react';
// MU components
import { Dialog, Tabs, Tab, FlatButton, Checkbox, Avatar } from 'material-ui';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionInput from 'material-ui/svg-icons/action/input';
import { List, ListItem } from 'material-ui/List';
// Components
import IncludeTracks from './IncludeTracks/IncludeTracks';
import FormData from '../../FormData/FormData';

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
      formData: {}
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
        borderRadius: 0,
        top: 1,
        left: 1
      }
    };

    // TODO: custom storage
    const playLists = window.localStorage.getItem('playlists');
    this.playlists = playLists ? JSON.parse(playLists) : [];
    this.formData = [
      {
        key: 'name',
        validation: [{
          key: 'required',
          value: true,
          message: 'This value is required'
        }, {
          key: 'minLength',
          value: 3,
          message: 'Min length must be more then 2 symbols'
        }, {
          key: 'reservedNames',
          value: this.playlists.map((item) => item.name),
          message: 'Playlist with such name has already exists'
        }],
        type: 'textField',
        label: 'New play list name'
      },
      {
        key: 'image',
        type: 'textField',
        label: 'Image URL'
      }
    ];
    this.state = {
      loading: false,
      activeTab: this.playlists.length ? 'playlists' : 'add-new',
      checkedPlayLists: [],
      trackIds: this.props.data.tracks.map((track) => track.fileId),
      validForm: true
    };
  }

  onAddTracks = () => {
    const { dialog, props, state } = this;

    const selectedTracks = props.data.tracks.filter((track) => {
      return state.trackIds.indexOf(track.fileId) !== -1;
    });

    if (state.activeTab === 'add-new') {
      this.playlists.push(Object.assign(dialog.formData, {
        tracks: selectedTracks
      }));
    }

    if (state.activeTab === 'playlists') {
      this.playlists.map((list) => {
        if (state.checkedPlayLists.indexOf(list.name) === -1) {
          return;
        }
        selectedTracks.map((track) => {
          if (list.tracks.find((item) => track.mbid === item.mbid)) {
            return;
          }
          list.tracks.push(track);
        });
      });
    }

    // TODO: custom data storage
    window.localStorage.setItem('playlists', JSON.stringify(this.playlists));
    props.onClose();
  };

  onCloseDialog = () => {
    this.props.onClose();
  };

  onChangeField = (key, value, formData) => {
    if (formData.valid) {
      this.dialog.formData = formData.fields;
    }

    this.setState({
      validForm: formData.valid
    });
  };

  onTabChange = (value) => {
    this.setState({
      activeTab: value
    });
  };

  onTogglePlaylist (name) {
    const { checkedPlayLists } = this.state;
    const indexPlayList = checkedPlayLists.indexOf(name);

    indexPlayList === -1 ? checkedPlayLists.push(name) : checkedPlayLists.splice(indexPlayList, 1);
    this.setState({
      checkedPlayLists: checkedPlayLists
    });
  }

  onChangeTracksNumber = (trackIds) => {
    this.setState({
      trackIds: trackIds
    });
  };

  isDisabled () {
    const { checkedPlayLists, trackIds, activeTab, validForm } = this.state;

    if (activeTab === 'add-new') {
      return !validForm || !trackIds.length;
    }

    return !checkedPlayLists.length || !trackIds.length;
  }

  render () {
    const { dialog, state, styles } = this;
    const { data } = this.props;

    return (
      <Dialog
        title={dialog.title}
        contentStyle={dialog.style}
        bodyStyle={dialog.bodyStyle}
        actions={[
          <FlatButton
            label="Cancel"
            primary={false}
            onTouchTap={this.onCloseDialog}
          />,
          <FlatButton
            label="Proceed"
            disabled={this.isDisabled()}
            primary={true}
            onTouchTap={this.onAddTracks}
          />
        ]}
        open={true}
        modal={false}>
        <div className="playlist-container">
          <Tabs onChange={this.onTabChange} value={state.activeTab}>
            <Tab
              className={!this.playlists.length ? 'disabled' : ''}
              icon={<i className="fa fa-th-list"/>}
              label={'Add to PlayList'}
              value={'playlists'}
            >
              <div className="tab-content">
                {
                  !!this.playlists.length &&
                  <div>
                    <div className="play-lists">
                      <List style={styles.list}>
                        {
                          this.playlists.map((item, index) => {
                            return (
                              <div key={index} className="play-list-item">
                                <ListItem
                                  style={styles.listItem}
                                  innerDivStyle={styles.listItemInnerDiv}
                                  onTouchTap={this.onTogglePlaylist.bind(this, item.name)}
                                  leftAvatar={
                                    <Avatar src={item.image} size={50} style={styles.avatar}/>
                                  }
                                  rightIcon={
                                    <Checkbox
                                      checked={state.checkedPlayLists.indexOf(item.name) !== -1}
                                      checkedIcon={<ActionDone />}
                                      uncheckedIcon={<ActionInput />}
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
                  </div>
                }
              </div>
            </Tab>
            <Tab
              icon={<i className="fa fa-plus-circle"/>}
              label={'Create new'}
              value={'add-new'}>
              <div className="tab-content">
                <FormData data={this.formData} onChange={this.onChangeField} classNameForm="form"/>
              </div>
            </Tab>
          </Tabs>
          <IncludeTracks
            tracks={data.tracks}
            limit={true}
            onChange={this.onChangeTracksNumber}
          />
        </div>
      </Dialog>
    )
  }
}

export default ToPlayListDialog;