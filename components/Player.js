import React, {useRef, useState} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const Player = props => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  if (props.videoID === undefined || props.videoID === null) {
    return (
      <View>
        <Text style={styles.textNoPlayer}>There is no Youtube link!</Text>
      </View>
    );
  } else {
    return (
      <YoutubePlayer
        ref={playerRef}
        height={230}
        width={Dimensions.get('window').width}
        videoId={props.videoID}
        play={playing}
        onChangeState={event => console.log(event)}
        onReady={() => console.log('ready')}
        onError={e => console.log('error', e)}
        onPlaybackQualityChange={q => console.log(q)}
        volume={50}
        playbackRate={1}
        playerParams={{
          cc_lang_pref: 'us',
          showClosedCaptions: true,
        }}
      />
    );
  }
};

const styles = StyleSheet.create({
  textNoPlayer: {
    textAlign: 'center',
    fontSize: 28,
    color: '#900',
    fontWeight: 'bold',
    marginVertical: 10,
  }
})
export default Player;
