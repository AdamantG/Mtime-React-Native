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
                    {this._renderDirectorActor()}
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

    //详情卡片
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
                       style={[{backgroundColor: "#ffffff", flex: 1}]}/>
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

    //滚动收缩后的头部
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

    //剧情简介
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

    //导演&演员
    _renderDirectorActor() {
        // const actors = this.state.data.basic.actors;
        // const director = this.state.data.basic.director;
        const director = {
            "directorId": 903521,
            "img": "http://img31.mtime.cn/ph/2016/09/02/144150.57291017_1280X720X2.jpg",
            "name": "D·J·卡卢索",
            "nameEn": "D.J. Caruso"
        };
        const actors = [
            {
                "actorId": 913378,
                "img": "http://img31.mtime.cn/ph/2014/09/01/170748.64755972_1280X720X2.jpg",
                "name": "范·迪塞尔",
                "nameEn": "Vin Diesel",
                "roleImg": "http://img5.mtime.cn/mg/2017/04/13/145450.41310609.jpg",
                "roleName": "多米尼克·托莱多"
            },
            {
                "actorId": 912746,
                "img": "http://img5.mtime.cn/ph/2016/12/16/113419.88212648_1280X720X2.jpg",
                "name": "道恩·强森",
                "nameEn": "Dwayne Johnson",
                "roleImg": "http://img5.mtime.cn/mg/2017/04/13/145502.47656575.jpg",
                "roleName": "卢克·霍布斯"
            },
            {
                "actorId": 923232,
                "img": "http://img31.mtime.cn/ph/2014/08/06/135708.93055500_1280X720X2.jpg",
                "name": "查理兹·塞隆",
                "nameEn": "Charlize Theron",
                "roleImg": "http://img5.mtime.cn/mg/2017/04/13/145523.95072264.jpg",
                "roleName": "塞弗"
            },
            {
                "actorId": 912464,
                "img": "http://img31.mtime.cn/ph/2014/03/17/100024.35937750_1280X720X2.jpg",
                "name": "杰森·斯坦森",
                "nameEn": "Jason Statham",
                "roleImg": "http://img5.mtime.cn/mg/2017/04/13/145514.14658869.jpg",
                "roleName": "德卡特·肖"
            },
            {
                "actorId": 937947,
                "img": "http://img31.mtime.cn/ph/2014/03/14/153310.59934779_1280X720X2.jpg",
                "name": "米歇尔·罗德里格兹",
                "nameEn": "Michelle Rodriguez",
                "roleImg": "http://img5.mtime.cn/mg/2017/04/13/145606.29346955.jpg",
                "roleName": "莱蒂"
            },
            {
                "actorId": 1762245,
                "img": "http://img31.mtime.cn/ph/2015/04/13/163248.27065805_1280X720X2.jpg",
                "name": "娜塔莉·艾玛努埃尔",
                "nameEn": "Nathalie Emmanuel",
                "roleImg": "http://img5.mtime.cn/mg/2017/04/13/145628.36166369.jpg",
                "roleName": "拉姆齐"
            },
            {
                "actorId": 901235,
                "img": "http://img31.mtime.cn/ph/2015/04/27/162743.33568954_1280X720X2.jpg",
                "name": "库尔特·拉塞尔",
                "nameEn": "Kurt Russell",
                "roleImg": "http://img5.mtime.cn/mg/2017/04/13/145547.43070490.jpg",
                "roleName": "无名氏先生"
            },
            {
                "actorId": 1264937,
                "img": "http://img31.mtime.cn/ph/2014/05/01/161031.89864319_1280X720X2.jpg",
                "name": "斯科特·伊斯特伍德",
                "nameEn": "Scott Eastwood",
                "roleImg": "",
                "roleName": "小无名氏先生"
            },
            {
                "actorId": 914213,
                "img": "http://img31.mtime.cn/ph/2016/08/25/172352.92378397_1280X720X2.jpg",
                "name": "泰瑞斯·吉布森",
                "nameEn": "Tyrese Gibson",
                "roleImg": "",
                "roleName": "罗曼"
            },
            {
                "actorId": 931076,
                "img": "http://img31.mtime.cn/ph/2016/08/25/173424.86239571_1280X720X2.jpg",
                "name": "卢达·克里斯",
                "nameEn": "Ludacris",
                "roleImg": "",
                "roleName": "特佳"
            },
            {
                "actorId": 936981,
                "img": "http://img31.mtime.cn/ph/2014/03/14/153427.50328146_1280X720X2.jpg",
                "name": "海伦·米伦",
                "nameEn": "Helen Mirren",
                "roleImg": "",
                "roleName": "Magdalene Shaw       (uncredited)"
            },
            {
                "actorId": 914501,
                "img": "http://img31.mtime.cn/ph/2016/08/26/165754.93484957_1280X720X2.jpg",
                "name": "埃尔莎·帕塔奇",
                "nameEn": "Elsa Pataky",
                "roleImg": "",
                "roleName": "Elena"
            },
            {
                "actorId": 1645713,
                "img": "http://img31.mtime.cn/ph/2016/04/15/094031.35608362_1280X720X2.jpg",
                "name": "卢克·伊万斯",
                "nameEn": "Luke Evans",
                "roleImg": "",
                "roleName": "Owen"
            },
            {
                "actorId": 1466328,
                "img": "http://img5.mtime.cn/ph/2017/04/14/111553.21082716_1280X720X2.jpg",
                "name": "克里斯托弗·海维尤",
                "nameEn": "Kristofer Hivju",
                "roleImg": "",
                "roleName": "Rhodes"
            },
            {
                "actorId": 2136738,
                "img": "http://img5.mtime.cn/ph/2017/04/14/111920.71006196_1280X720X2.jpg",
                "name": "艾登·艾斯特拉",
                "nameEn": "Eden Estrella",
                "roleImg": "",
                "roleName": "Sam"
            },
            {
                "actorId": 919056,
                "img": "http://img5.mtime.cn/ph/2017/04/14/111730.81740493_1280X720X2.jpg",
                "name": "",
                "nameEn": "Celestin Cornielle",
                "roleImg": "",
                "roleName": "Raldo"
            },
            {
                "actorId": 2207753,
                "img": "http://img5.mtime.cn/ph/2017/04/14/111825.77444506_1280X720X2.jpg",
                "name": "",
                "nameEn": "Janmarco Santiago",
                "roleImg": "",
                "roleName": "Fernando"
            },
            {
                "actorId": 2111414,
                "img": "http://img31.mtime.cn/ph/2016/03/18/151902.31570214_1280X720X2.jpg",
                "name": "",
                "nameEn": "Marko Caka",
                "roleImg": "",
                "roleName": "Operative       (uncredited)"
            },
            {
                "actorId": 2203565,
                "img": "http://img31.mtime.cn/ph/2016/08/30/100330.15393071_1280X720X2.jpg",
                "name": "",
                "nameEn": "Ágúst Bjarnason",
                "roleImg": "",
                "roleName": "Lieutenant Branson       (uncredited)"
            },
            {
                "actorId": 2205648,
                "img": "http://img5.mtime.cn/ph/2017/04/13/172736.15043526_1280X720X2.jpg",
                "name": "",
                "nameEn": "Benjamin Donlow",
                "roleImg": "",
                "roleName": "Business Pedestrian       (uncredited)"
            }];
        return (
            <View style={{
                backgroundColor: "#ffffff",
                marginTop: DEFAULT_MARGIN,
            }}>
                <ScrollView horizontal={true}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{padding: 5}}>
                            <View style={{
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                padding: 5
                            }}><Text style={{color: '#474747', fontSize: 16}}>导演</Text></View>
                            <Director director={director}/>
                        </View>
                        <View style={{width: 10, justifyContent: 'center', alignItems: 'flex-start'}}><View
                            style={{width: 10, backgroundColor: '#939393', marginTop: 50}}/></View>
                        <View style={{padding: 5}}>
                            <View style={{
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                padding: 5
                            }}><Text style={{color: '#474747', fontSize: 16}}>主要演员</Text></View>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                {
                                    actors.map((actor, i) => {
                                        return (
                                            <Actor key={i} actor={actor}/>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>

                </ScrollView>
                <View style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                }}>
                    <Text>全部</Text>
                </View>
            </View>

        );
    }

    _onPressBack = () => {
        this.props.navigation.dispatch(NavigationActions.back());
    };

    _onPressCollect = () => {
        this.setState({
            collected: !this.state.collected,
        })
    };

    _onPressShare = () => {

    };
}

class Director extends Component {
    render() {
        const director = this.props.director;
        const img = director.img;
        const name = director.name;
        const nameEn = director.nameEn;
        return (
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                padding: 5
            }}>
                <Image source={{uri: img}} style={{width: 100, height: 100, marginBottom: 5}}/>
                <Text numberOfLines={1}
                      style={[styles.textNormal, {width: 100, textAlign: 'center', fontSize: 12}]}>{name}</Text>
                <Text numberOfLines={1}
                      style={[styles.textNormal, {width: 100, textAlign: 'center', fontSize: 12}]}>{nameEn}</Text>
            </View>
        );

    }
}

class Actor extends Component {
    render() {
        const actor = this.props.actor;
        const img = actor.img;
        const name = actor.name;
        const nameEn = actor.nameEn;
        const roleName = actor.roleName;
        return (
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                padding: 5
            }}>
                <Image source={{uri: img}} style={{width: 100, height: 100, marginBottom: 5}}/>
                <Text numberOfLines={1}
                      style={[styles.textNormal, {width: 100, textAlign: 'center', fontSize: 12}]}>{name}</Text>
                <Text numberOfLines={1}
                      style={[styles.textNormal, {width: 100, textAlign: 'center', fontSize: 12}]}>{nameEn}</Text>
                <Text numberOfLines={1}
                      style={[styles.textNormal, {width: 100, textAlign: 'center', fontSize: 12}]}>饰:{roleName}</Text>
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
    storyExpand: {
        color: '#333333',
        fontSize: 14,
        lineHeight: 22,
    },
    storyCollapse: {
        color: '#333333',
        fontSize: 14,
        height: 40,
        lineHeight: 22,
    },
    textNormal: {
        color: '#333333',
        fontSize: 14,
    },
});