/**
 * author: liminjie
 * date: 2017/5/1
 * desc: 视频播放页面
 */

'use strict';

import React, {Component} from "react";
import {TouchableOpacity, View, StyleSheet, Text} from "react-native";
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
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.fullScreen}
                    onPress={() => this.setState({paused: !this.state.paused})}
                >
                    <Video
                        ref={(ref: Video) => {
                            this.video = ref
                        }}
                        /* For ExoPlayer */
                        source={{uri: url}}
                        style={styles.fullScreen}
                        rate={this.state.rate}
                        paused={this.state.paused}
                        volume={this.state.volume}
                        muted={this.state.muted}
                        resizeMode={this.state.resizeMode}
                        onLoad={this.onLoad}
                        onProgress={this.onProgress}
                        onEnd={this.onEnd}
                        onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                        onAudioFocusChanged={this.onAudioFocusChanged}
                        repeat={false}
                    />
                </TouchableOpacity>

                <View style={styles.controls}>
                    <View style={styles.generalControls}>
                        <View style={styles.rateControl}>
                            <TouchableOpacity onPress={() => {
                                if (this.state.fullScreen) {
                                    this.video.dismissFullscreenPlayer();
                                } else {
                                    this.video.presentFullscreenPlayer();
                                }
                            }}>
                                <Text style={[styles.controlOption,]}>全屏</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.volumeControl}>
                            {this.renderVolumeControl(0.5)}
                            {this.renderVolumeControl(1)}
                            {this.renderVolumeControl(1.5)}
                        </View>

                        <View style={styles.resizeModeControl}>
                            {this.renderResizeModeControl('cover')}
                            {this.renderResizeModeControl('contain')}
                            {this.renderResizeModeControl('stretch')}
                        </View>
                    </View>

                    <View style={styles.trackingControls}>
                        <View style={styles.progress}>
                            <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]}/>
                            <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]}/>
                        </View>
                    </View>
                </View>
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

    renderRateControl(rate) {
        const isSelected = (this.state.rate === rate);

        return (
            <TouchableOpacity onPress={() => {
                this.video.presentFullscreenPlayer();
                this.setState({rate})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {rate}x
                </Text>
            </TouchableOpacity>
        );
    }

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