/**
 * author: liminjie
 * date: 2017/3/30
 * desc: 即将上映的Tab页面
 */

import React, {Component} from "react";
import {Animated, ScrollView, View} from "react-native";

export default class TabAllScreen extends Component {

    state = {
        fadeAnim: new Animated.Value(0),
        scrollY: new Animated.Value(0),
    }

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 10000,
            },
        ).start();
    }

    _renderHeader() {
        let headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 150],
            outputRange: [1, 0]
        })
        return (
            <View>
                <Animated.View style={[{backgroundColor: "#ffffff", height: 150}, {opacity: headerOpacity}]}>


                </Animated.View>
            </View>
        )
    }

    render() {

        return (
            <View style={{
                flex: 1,
                backgroundColor: '#ff6083'
            }}>
                <ScrollView
                    style={{
                        backgroundColor: '#333333'
                    }}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
                    )}
                    scrollEventThrottle={16}
                >
                    {this._renderHeader()}
                    <View style={{backgroundColor: "#ff4f5c", height: 60}}/>
                    <View style={{backgroundColor: "#eaff5d", height: 60}}/>
                    <View style={{backgroundColor: "#6ccfff", height: 60}}/>
                    <View style={{backgroundColor: "#65ff5f", height: 60}}/>
                    <View style={{backgroundColor: "#ff4f5c", height: 60}}/>
                    <View style={{backgroundColor: "#eaff5d", height: 60}}/>
                    <View style={{backgroundColor: "#6ccfff", height: 60}}/>
                    <View style={{backgroundColor: "#65ff5f", height: 60}}/>
                    <View style={{backgroundColor: "#ff4f5c", height: 60}}/>
                    <View style={{backgroundColor: "#eaff5d", height: 60}}/>
                    <View style={{backgroundColor: "#6ccfff", height: 60}}/>
                    <View style={{backgroundColor: "#65ff5f", height: 60}}/>
                </ScrollView>
            </View>

        );
    }
}