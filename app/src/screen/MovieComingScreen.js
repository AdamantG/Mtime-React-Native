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
        data: null,//json
        scrollY: new Animated.Value(0),//Y轴滑动距离
        collected: false,//顶部收藏
        fetched: false,//请求得到数据
        storyExpanded: false,
    };

    componentDidMount() {
        let id = -1;
        try {
            const params = this.props.navigation.state.params;
            id = params.movieId;
        } catch (error) {
        }
        let movieId = id > -1 ? id : 125805;
        let url = 'https://ticket-api-m.mtime.cn/movie/detail.api?locationId=365&movieId=' + movieId;
        console.log(movieId);
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    fetched: true,
                    data: responseData.data,
                });
            });
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
                    {this._renderStory()}
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

    _renderHeader() {
        let img;
        if (this.state.fetched) {
            img = this.state.data.basic.img;
        } else {
            img = '#949494';
        }
        const name = this.state.fetched ? this.state.data.basic.name : '电影名称';
        const nameEn = this.state.fetched ? this.state.data.basic.nameEn : 'Movie Name';
        const mins = this.state.fetched ? this.state.data.basic.mins : '影片时长';
        const typeArray = this.state.fetched ? this.state.data.basic.type : '影片类型';
        let type = '';
        for (let i = 0; i < typeArray.length; i++) {
            type = type + typeArray[i];
            if (i != typeArray.length - 1) {
                type = type + '/';
            }
        }
        const releaseDate = this.state.fetched ? this.state.data.basic.releaseDate : '上映时间';
        const releaseArea = this.state.fetched ? this.state.data.basic.releaseArea : '地区';
        const commentSpecial = this.state.fetched ? this.state.data.basic.commentSpecial : '评价';
        const rate = this.state.fetched ? this.state.data.basic.overallRating : '评分';

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
                        <Text style={{fontSize: 16, color: '#ffffff'}}>{name}</Text>
                        <Text numberOfLines={1} style={{color: '#ffffff'}}>{nameEn}</Text>
                        <Text style={{color: '#333333', marginTop: 5}}>{mins}</Text>
                        <Text style={{color: '#333333', marginTop: 5}}>{type}</Text>
                        <Text style={{
                            color: '#333333',
                            marginTop: 5
                        }}>{releaseDate.substring(4, 6) * 1}月{releaseDate.substring(6, 8)}日{releaseArea}上映</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                            <Text style={{
                                width: 20,
                                height: 20,
                                textAlign: 'center',
                                fontSize: 24,
                                fontWeight: 'bold',
                                color: '#ff8601'
                            }}>“</Text>
                            <Text numberOfLines={1} style={{color: '#ff8601', fontSize: 14,}}>{commentSpecial}</Text>
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
                        <Text style={{color: '#ffffff'}}>{rate}</Text>
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
        const name = this.state.fetched ? this.state.data.basic.name : '电影名称';
        return (
            <Animated.View
                style={[styles.header, {transform: [{translateY: title}],}]}>
                <Animated.View style={[styles.headerBackground, {opacity: opacity}]}>
                    <View style={styles.headerTitle}>
                        <View><Text style={styles.headerTitleText}>{name}</Text></View>
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

    _renderStory() {

        const story = this.state.fetched ? this.state.data.basic.story : '';
        const storyStyle = this.state.storyExpanded ? styles.storyExpand : styles.storyCollapse;
        const storyIcon = this.state.storyExpanded ? require('../image/ic_story_collapse.png') : require('../image/ic_story_expand.png');
        return (
            <View style={{
                backgroundColor: "#ffffff",
                marginTop: DEFAULT_MARGIN,
                flexDirection: 'column',
                paddingTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
                alignItems: 'center'
            }}>
                <Text style={[storyStyle]}>剧情：{story}</Text>
                <TouchableOpacity onPress={() => {
                    this.setState({
                        storyExpanded: !this.state.storyExpanded
                    });
                }}>
                    <Image source={storyIcon} resizeMode={Image.resizeMode.center} style={{height: 20, margin: 5}}/>
                </TouchableOpacity>

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
    storyExpand: {
        lineHeight: 22,
    },
    storyCollapse: {
        height: 40,
        lineHeight: 22,
    }
});