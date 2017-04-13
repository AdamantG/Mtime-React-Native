/**
 * author: liminjie
 * date: 2017/3/30
 * desc: 即将上映的Tab页面
 */

import React, {Component} from "react";
import {Animated, ScrollView, Text, View, StyleSheet, Image} from "react-native";

const TITLE_HEIGHT = 50;
const ICON_SIZE = 20;
const HEADER_HEIGHT = 250;

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
        return (
            <View style={{
                height: HEADER_HEIGHT,
            }}>
                <View style={[{backgroundColor: "#ffffff", flex: 1}]}/>
                <View style={[{backgroundColor: "#ffffff", flex: 1}]}/>
                <View style={{
                    backgroundColor: "#6ccfff",
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                }}/>
            </View>
        )
    }

    _renderFixHeader() {
        //固定Title
        let title = this.state.scrollY.interpolate({
            inputRange: [0, TITLE_HEIGHT],
            outputRange: [0, 0]
        });
        //根据滑动距离改变透明度
        let opacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_HEIGHT - TITLE_HEIGHT],
            outputRange: [0, 1]
        });
        return (
            <Animated.View
                style={[styles.header, {transform: [{translateY: title}],}]}>
                <Animated.View style={[styles.headerBackground, {opacity: opacity}]}>
                    <View style={styles.headerTitle}>
                        <View><Text style={styles.headerTitleText}>电影名称</Text></View>
                    </View>
                </Animated.View>
                <View style={styles.headerTitle}>
                    <Image style={[styles.headerIcon, {position: "absolute", left: 10,}]}
                           source={require('../image/ic_arrow.png')}/>
                    <Image style={[styles.headerIcon, {position: "absolute", right: 10,}]}
                           source={require('../image/ic_arrow.png')}/>
                    <Image style={[styles.headerIcon, {position: "absolute", right: ICON_SIZE + 10 + 10,}]}
                           source={require('../image/ic_arrow.png')}/>
                </View>
            </Animated.View>
        );
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#333333'
            }}>
                <ScrollView
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
                {this._renderFixHeader()}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    header: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        height: TITLE_HEIGHT,
    },
    headerTitle: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitleText: {
        color: 'white',
        fontSize: 18,
    },
    headerBackground: {
        backgroundColor: "#1d2635",
        height: TITLE_HEIGHT
    },
    headerIcon: {
        width: ICON_SIZE,
        height: ICON_SIZE,
    },
});