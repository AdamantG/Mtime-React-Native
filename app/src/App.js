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

const TabScreen = TabNavigator({

    即将上映: {screen: MovieShowScreen},
    正在热映: {screen: MovieShowScreen},
    }, {
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
    Home: {screen: TabScreen},
    Detail: {screen: MovieComingScreen},
    VideoList: {screen: VideoListScreen}
}, {
    headerMode: 'none',
});


AppRegistry.registerComponent('app', () => stack);