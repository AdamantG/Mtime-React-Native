/**
 * author: liminjie
 * date: 2017/5/1
 * desc: 视频播放页面
 */

'use strict';

import React, {Component} from "react";
import {Image, Text, TouchableOpacity, View, Animated, FlatList} from "react-native";
import {NavigationActions} from "react-navigation";
import {styles} from "../style/Styles";
import VideoItem from "../component/VideoItem";
import ItemSeparator from "../component/ItemSeparator";
import ListFooter from "../component/ListFooter";
import Video from "react-native-video";

export default class VideoPlayScreen extends Component {

    render() {
        const navigation = this.props.navigation;
        const params = navigation.state.params;
        const video = params.video;
        const url = video.url;
        const hightUrl = video.hightUrl;

        return (
            <View style={{
                flex: 1
            }}>
                <Video source={{uri: url}}   // Can be a URL or a local file.
                       resizeMode="contain"                      // Fill the whole screen at aspect ratio.*
                       repeat={true}                           // Repeat forever.
                       playInBackground={false}
                       style={{
                           position: 'absolute',
                           top: 0,
                           left: 0,
                           bottom: 0,
                           right: 0,
                       }}
                />

            </View>

        );
    }

    _onPressBack = () => {
        const navigation = this.props.navigation;
        const params = navigation.state.params;
        navigation.dispatch(NavigationActions.back());
    };
}
