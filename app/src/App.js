/**
 * author: liminjie
 * date: 2017/3/30
 * desc: APP注册入口
 */

'use strict';

import React from "react";
import {StackNavigator, TabNavigator} from "react-navigation";
import {AppRegistry} from "react-native";
import MovieComingScreen from "./screen/MovieComingScreen";
import MovieShowScreen from "./screen/MovieShowScreen";
import VideoListScreen from "./screen/VideoListScreen";
import MovieDetailScreen from "./screen/MovieDetailScreen";
import VideoPlayScreen from "./screen/VideoPlayScreen";
import ImageListScreen from "./screen/ImageListScreen";
import ImageDetailScreen from "./screen/ImageDetailScreen";
import CreditListScreen from "./screen/CreditListScreen";
import HotMovieCommentListScreen from "./screen/HotMovieCommentListScreen";
import HotLongCommentListScreen from "./screen/HotLongCommentListScreen";
import MovieComingListScreen from "./screen/MovieComingListScreen";

const TabScreen = TabNavigator({
        正在热映: {screen: MovieShowScreen},
        即将上映: {screen: MovieDetailScreen},
        //即将上映: {screen: MovieComingScreen},
    }, {
        swipeEnabled: false,
        animationEnabled: false,
        lazy: true,
        tabBarPosition: 'top',
        tabBarOptions: {
            activeTintColor: '#ffffff',
            inactiveTintColor: '#999999',
            tabStyle: {
                height: 40,
            },
            style: {
                backgroundColor: '#1d2635',
            },
            indicatorStyle: {
                backgroundColor: "white",
            }
        },
    }
);

TabScreen.navigationOptions = {
    header: {
        visible: false
    },
};

const stack = StackNavigator({
    //Home: {screen: TabScreen},          //主页
    Home: {screen: MovieComingListScreen},          //主页
    Detail: {screen: MovieDetailScreen},//电影详情
    CreditList: {screen: CreditListScreen},//演职员表
    VideoList: {screen: VideoListScreen},//视频列表
    VideoPlay: {screen: VideoPlayScreen},//视频播放
    ImageList: {screen: ImageListScreen},//剧照列表
    ImageDetail: {screen: ImageDetailScreen},//剧照放大浏览
    HotMovieCommentList: {screen: HotMovieCommentListScreen},//短评论列表
    HotLongCommentList: {screen: HotLongCommentListScreen},//长评论列表
}, {
    headerMode: 'none',
});

AppRegistry.registerComponent('app', () => stack);