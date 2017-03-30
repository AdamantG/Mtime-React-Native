import React from "react";
import {AppRegistry} from "react-native";
import {StackNavigator, TabNavigator, TabNavigatorConfig} from "react-navigation";
import ChatScreen from "./screen/ChatScreen";
import TabAllScreen from "./screen/TabAllScreen";
import TabRecentScreen from "./screen/TabRecentScreen";
import * as TabView from "react-navigation";

const TabScreen = TabNavigator({
    电影: {screen: TabRecentScreen},
    我的: {screen: TabAllScreen},
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: '#e91e63',
        activeBackgroundColor: '#888888',
        inactiveTintColor: '#888888',
        inactiveBackgroundColor: '#e91e63',
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: 'white',
        },
    }
});

TabScreen.navigationOptions = {
    header: {
        visible: false
    }
}

const stack = StackNavigator({
    Tab: {screen: TabScreen},
    Chat: {screen: ChatScreen},
});


AppRegistry.registerComponent('app', () => stack);