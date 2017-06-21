import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { withModalMounter } from '/imports/ui/components/modal/service';

import Service from './service';
import Audio from './component';
import AudioModal from './audio-modal/component';

class AudioContainer extends Component {
  render() {
    return (
      <Audio {...this.props}>
        {this.props.children}
      </Audio>
    );
  }
}

let didMountedAutoJoin = false;

export default withModalMounter(createContainer(({ mountModal }) => {
  const APP_CONFIG = Meteor.settings.public.app;

  return {
    init: () => {
      Service.init();
      if (didMountedAutoJoin) return;
      mountModal(<AudioModal handleJoinListenOnly={Service.joinListenOnly} />);
      didMountedAutoJoin = true;
    },
  };
}, AudioContainer));
