/**
 * author: liminjie
 * date: 2017/5/1
 * desc: 视频播放页面
 */

'use strict';

import React, {Component} from "react";
import {TouchableOpacity, View, StyleSheet, Text, Image} from "react-native";
import {NavigationActions} from "react-navigation";
import {styles} from "../style/Styles";
import Video from "react-native-video";

export default class VideoPlayScreen extends Component {

    state = {
        fullScreen: false,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0.0,
        currentTime: 0.0,
        paused: true,
    };

    video: Video;

    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

        const navigation = this.props.navigation;
        const params = navigation.state.params;
        const video = params.video;
        const url = video.url;
        const hightUrl = video.hightUrl;

        return (
            <View style={{
                flex: 1,
                backgroundColor: '#000000',
            }}>
                <TouchableOpacity
                    style={{flex: 1,}}
                    onPress={() =>
                        // this.setState({paused: !this.state.paused});
                        this.video.presentFullscreenPlayer()
                    }
                >
                    <Video
                        ref={(ref: Video) => {
                            this.video = ref
                        }}
                        /* For ExoPlayer */
                        source={{uri: url}}
                        style={{flex: 1, backgroundColor: '#000000'}}
                        resizeMode='contain'
                        onLoad={this.onLoad}
                        onProgress={this.onProgress}
                        onEnd={this.onEnd}
                        onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                        onAudioFocusChanged={this.onAudioFocusChanged}
                        repeat={false}
                    />
                </TouchableOpacity>

                {/*返回*/}
                <TouchableOpacity
                    style={{position: "absolute", top: 20, left: 10,}}
                    onPress={this._onPressBack}
                >
                    <Image source={require('../image/ic_arrow_left.png')} style={styles.headerIcon}/>
                </TouchableOpacity>
            </View>
        );
    }

    onLoad = (data) => {
        this.setState({duration: data.duration});
    };

    onProgress = (data) => {
        this.setState({currentTime: data.currentTime});
    };

    onEnd = () => {
        this.setState({paused: true})
        this.video.seek(0)
    };

    onAudioBecomingNoisy = () => {
        this.setState({paused: true})
    };

    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        this.setState({paused: !event.hasAudioFocus})
    };

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };


    renderResizeModeControl(resizeMode) {
        const isSelected = (this.state.resizeMode === resizeMode);

        return (
            <TouchableOpacity onPress={() => {
                this.setState({resizeMode})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }

    renderVolumeControl(volume) {
        const isSelected = (this.state.volume === volume);

        return (
            <TouchableOpacity onPress={() => {
                this.setState({volume})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {volume * 100}%
                </Text>
            </TouchableOpacity>
        )
    }

    _onPressBack = () => {
        const navigation = this.props.navigation;
        const params = navigation.state.params;
        navigation.dispatch(NavigationActions.back());
    };
}