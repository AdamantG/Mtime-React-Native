/**
 * author: liminjie
 * date: 2017/3/30
 * desc: APP注册入口
 */

import React from "react";
//noinspection ES6UnusedImports
import {AppRegistry, Text, View} from "react-native";
import {StackNavigator, TabNavigator} from "react-navigation";
import MovieComingScreen from "./screen/MovieComingScreen";
import MovieShowScreen from "./screen/MovieShowScreen";

const TabScreen = TabNavigator({
        正在热映: {screen: MovieShowScreen},
        即将上映: {screen: MovieComingScreen},
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
}

const stack = StackNavigator({
    Home: {screen: TabScreen},
});

AppRegistry.registerComponent('app', () => stack);