/**
 * author: liminjie
 * date: 2017/3/30
 * desc: 即将上映的Tab页面
 */

'use strict';

import React, {Component} from "react";
import {Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NavigationActions} from "react-navigation";

const TITLE_HEIGHT = 50;
const ICON_SIZE = 20;
const HEADER_HEIGHT = 250;
const DEFAULT_MARGIN = 20;

export default class MovieComingScreen extends Component {

    state = {
        data: null,
        scrollY: new Animated.Value(0),
        collected: false,
    };

    componentDidMount() {
        let movieId = this.props.navigation.state.movieId;
        if (movieId instanceof Object) {

        } else {
            movieId = 125805;
        }
        let url = 'https://ticket-api-m.mtime.cn/movie/detail.api?locationId=365&movieId=' + movieId;
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                console.log(responseData);
                this.setState({
                    data: responseData.data,
                });
            });
    }

    _renderHeader() {
        let img = 'http://img5.mtime.cn/mt/2017/04/13/092925.62009817_1280X720X2.jpg';

        // console.log(this.state.data);
        // let img;
        // if (this.state.data.basic.img instanceof Object) {
        //     img = this.state.data.basic.img;
        // } else {
        //     let img = 'http://img5.mtime.cn/mt/2017/04/13/092925.62009817_1280X720X2.jpg';
        // }

        return (
            <View style={{
                height: HEADER_HEIGHT,
            }}>
                <Image source={{uri: img}} resizeMode={Image.resizeMode.cover}
                       style={[{backgroundColor: "#ffffff", flex: 1.05}]}/>
                <View style={[{backgroundColor: "#ffffff", flex: 1}]}/>
                <View style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: HEADER_HEIGHT * (1 / 3),
                    bottom: 0,
                    flexDirection: 'row'
                }}>
                    <View style={[{backgroundColor: "#ffffff", marginLeft: 7}]}>
                        <Image source={{uri: img}} resizeMode={Image.resizeMode.cover}
                               style={[{width: 100, height: 155, margin: 2}]}/>
                    </View>
                    <View style={[{flexDirection: 'column', flex: 2.5, marginHorizontal: 5}]}>
                        <Text style={{fontSize: 16, color: '#ffffff'}}>电影名称</Text>
                        <Text style={{color: '#ffffff'}}>English</Text>
                        <Text style={{color: '#333333', marginTop: 5}}>90分钟</Text>
                        <Text style={{color: '#333333', marginTop: 5}}>剧情/悬疑</Text>
                        <Text style={{color: '#333333', marginTop: 5}}>2017年03月31日中国上映</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                            <Text style={{
                                width: 20,
                                height: 20,
                                textAlign: 'center',
                                fontSize: 24,
                                fontWeight: 'bold',
                                color: '#ff8601'
                            }}>“</Text>
                            <Text style={{color: '#ff8601', fontSize: 14,}}>一句话评价</Text>
                        </View>
                    </View>
                    <View style={{
                        width: 43,
                        height: 43,
                        backgroundColor: '#639e02',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                        marginRight: 10,
                    }}>
                        <Text style={{color: '#ffffff'}}>7.4</Text>
                    </View>
                </View>
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
        //收藏图标
        let collectImg = this.state.collected ? require('../image/ic_collect_selected.png') : require('../image/ic_collect_normal.png');
        return (
            <Animated.View
                style={[styles.header, {transform: [{translateY: title}],}]}>
                <Animated.View style={[styles.headerBackground, {opacity: opacity}]}>
                    <View style={styles.headerTitle}>
                        <View><Text style={styles.headerTitleText}>电影名称</Text></View>
                    </View>
                </Animated.View>
                <View style={styles.headerTitle}>
                    <TouchableOpacity
                        style={{position: "absolute", left: 10,}}
                        onPress={this._onPressBack}
                    >
                        <Image source={require('../image/ic_arrow.png')} style={styles.headerIcon}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{position: "absolute", right: ICON_SIZE + 10 + 10,}}
                        onPress={this._onPressCollect}
                    >
                        <Image source={collectImg} style={styles.headerIcon}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{position: "absolute", right: 10,}}
                        onPress={this._onPressShare}
                    >
                        <Image source={require('../image/ic_share.png')} style={styles.headerIcon}/>
                    </TouchableOpacity>
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
                    style={{
                        backgroundColor: '#ebebeb',
                    }}
                >
                    {this._renderHeader()}
                    <View style={{backgroundColor: "#ff4f5c", height: 60, marginTop: DEFAULT_MARGIN}}/>
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

    _onPressBack = () => {
        this.props.navigation.dispatch(NavigationActions.back());
    }

    _onPressCollect = () => {
        this.setState({
            collected: !this.state.collected,
        })
    }

    _onPressShare = () => {

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