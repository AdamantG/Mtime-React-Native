/**
 * author: liminjie
 * date: 2017/4/8
 * desc: 电影详情页面
 */

'use strict';

import React, {Component} from "react";
import {Animated, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {NavigationActions} from "react-navigation";
import Director from "../component/Director";
import Actor from "../component/Actor";
import {styles} from "../style/Styles";

const TITLE_HEIGHT = 50;
const ICON_SIZE = 20;
const HEADER_HEIGHT = 250;
const DEFAULT_MARGIN = 20;

export default class MovieDetailScreen extends Component {

    state = {
        data: null,//json
        dataFetched: false,//请求得到数据
        scrollY: new Animated.Value(0),//Y轴滑动距离
        collected: false,//顶部收藏
        storyExpanded: false,
        comment: null,//评论
        commentFetched: false,//请求得到数据
    };

    componentDidMount() {

        let id = -1;
        try {
            const navigation = this.props.navigation;
            const params = navigation.state.params;
            id = params.movieId;
        } catch (error) {
        }
        let movieId = id > -1 ? id : 125805;
        fetch('https://ticket-api-m.mtime.cn/movie/detail.api?locationId=365&movieId=' + movieId)
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    dataFetched: true,
                    data: responseData.data,
                });
            });
        fetch('https://ticket-api-m.mtime.cn/movie/hotComment.api?movieId=' + movieId)
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    commentFetched: true,
                    comment: responseData.data,
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
                    {this._renderVideoImg()}
                    {this._renderMovieBox()}
                    {this._renderMiniComment()}
                    {this._renderPlusComment()}
                    <View style={{height: DEFAULT_MARGIN}}/>
                </ScrollView>
                {this._renderFixHeader()}
            </View>

        );
    }

    //详情卡片
    _renderHeader() {
        let img;
        if (this.state.dataFetched) {
            img = this.state.data.basic.img;
        } else {
            img = '#949494';
        }
        const name = this.state.dataFetched ? this.state.data.basic.name : '电影名称';
        const nameEn = this.state.dataFetched ? this.state.data.basic.nameEn : 'Movie Name';
        const mins = this.state.dataFetched ? this.state.data.basic.mins : '影片时长';
        const typeArray = this.state.dataFetched ? this.state.data.basic.type : '影片类型';
        let type = '';
        for (let i = 0; i < typeArray.length; i++) {
            type = type + typeArray[i];
            if (i != typeArray.length - 1) {
                type = type + '/';
            }
        }
        const releaseDate = this.state.dataFetched ? this.state.data.basic.releaseDate : '上映时间';
        const releaseArea = this.state.dataFetched ? this.state.data.basic.releaseArea : '地区';
        const commentSpecial = this.state.dataFetched ? this.state.data.basic.commentSpecial : '评价';
        const rate = this.state.dataFetched ? this.state.data.basic.overallRating : '评分';

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
                    {/*海报封面*/}
                    <TouchableOpacity style={[{backgroundColor: "#ffffff", marginLeft: 7, height: 143}]}
                                      onPress={this._onPressVideo}>
                        <Image source={{uri: img}} resizeMode={Image.resizeMode.cover}
                               style={[{width: 100, height: 155, margin: 2}]}/>
                        <View style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image source={require('../image/ic_video_play.png')} style={{width: 40, height: 40}}/>
                        </View>
                    </TouchableOpacity>
                    {/*影片简介*/}
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
                    {/*评分*/}
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
        const name = this.state.dataFetched ? this.state.data.basic.name : '电影名称';
        return (
            <Animated.View
                style={[styles.header, {transform: [{translateY: title}],}]}>
                {/*电影名称*/}
                <Animated.View style={[styles.headerBackground, {opacity: opacity}]}>
                    <View style={styles.headerTitle}>
                        <View><Text style={styles.headerTitleText}>{name}</Text></View>
                    </View>
                </Animated.View>
                <View style={styles.headerTitle}>
                    {/*返回*/}
                    <TouchableOpacity
                        style={{position: "absolute", left: 10,}}
                        onPress={this._onPressBack}
                    >
                        <Image source={require('../image/ic_arrow_left.png')} style={styles.headerIcon}/>
                    </TouchableOpacity>
                    {/*收藏*/}
                    <TouchableOpacity
                        style={{position: "absolute", right: ICON_SIZE + 10 + 10,}}
                        onPress={this._onPressCollect}
                    >
                        <Image source={collectImg} style={styles.headerIcon}/>
                    </TouchableOpacity>
                    {/*分享*/}
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
        if (this.state.dataFetched) {
            const story = this.state.data.basic.story;
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
                    {/*剧情简介*/}
                    <Text style={[storyStyle]}>剧情：{story}</Text>
                    {/*折叠&展开*/}
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
    }

    //导演&演员
    _renderDirectorActor() {
        if (this.state.dataFetched) {
            const actors = this.state.data.basic.actors;
            const director = this.state.data.basic.director;
            return (
                <View style={{
                    backgroundColor: "#ffffff",
                    marginTop: DEFAULT_MARGIN,
                }}>
                    <ScrollView horizontal={true}>
                        <View style={{flexDirection: 'row'}}>
                            {/*导演*/}
                            <View style={{padding: 5}}>
                                <View style={{
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    padding: 5
                                }}><Text style={{color: '#474747', fontSize: 14}}>导演</Text></View>
                                <TouchableOpacity>
                                    <Director director={director}/>
                                </TouchableOpacity>
                            </View>
                            {/*分隔线*/}
                            <View style={{width: 0.5, alignSelf: 'stretch'}}>
                                <View style={{height: 100, backgroundColor: '#939393', marginTop: 50}}/>
                            </View>
                            {/*主要演员*/}
                            <View style={{padding: 5}}>
                                <View style={{
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    padding: 5
                                }}><Text style={{color: '#474747', fontSize: 14}}>主要演员</Text></View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    {
                                        actors.map((actor, i) => {
                                            return (
                                                <TouchableOpacity key={i}>
                                                    <Actor actor={actor}/>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        height: 50,
                        paddingHorizontal: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{color: '#939393', fontSize: 14}}>全部</Text>
                        <Image source={require('../image/ic_arrow_right.png')} style={{width: 18, height: 18}}/>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    //视频&图片
    _renderVideoImg() {
        if (this.state.dataFetched) {
            const video = this.state.data.basic.video;
            const stageImg = this.state.data.basic.stageImg;
            return (
                <View style={{
                    backgroundColor: "#ffffff",
                    marginTop: DEFAULT_MARGIN,
                    flexDirection: 'row'
                }}>
                    {/*视频*/}
                    <TouchableOpacity style={{flex: 1, paddingBottom: 10, paddingHorizontal: 10}}
                                      onPress={this._onPressVideo}>
                        <View style={{height: 40, alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{flex: 1, color: '#474747', fontSize: 14}}>视频</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{color: '#939393', fontSize: 14}}>{video.count}</Text>
                                <Image source={require('../image/ic_arrow_right.png')} style={{width: 18, height: 18}}/>
                            </View>
                        </View>
                        <View>
                            <Image source={{uri: video.img}} style={{height: 120}}/>
                            <View style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                right: 0,
                                bottom: 0,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../image/ic_video_play.png')} style={{width: 40, height: 40}}/>
                            </View>

                        </View>
                    </TouchableOpacity>
                    {/*分隔线*/}
                    <View style={{width: 0.5, alignSelf: 'stretch'}}>
                        <View style={{height: 120, backgroundColor: '#939393', marginTop: 40}}/>
                    </View>
                    {/*图片*/}
                    <View style={{paddingBottom: 10, paddingHorizontal: 10}}>
                        <View style={{height: 40, alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{flex: 1, color: '#474747', fontSize: 14}}>图片</Text>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{color: '#939393', fontSize: 14}}>{stageImg.count}</Text>
                                <Image source={require('../image/ic_arrow_right.png')} style={{width: 18, height: 18}}/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity >
                            <Image source={{uri: stageImg.list[0].imgUrl}} style={{width: 120, height: 120}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }

    //电影票房
    _renderMovieBox() {
        if (this.state.dataFetched) {
            const boxOffice = this.state.data.boxOffice;
            return (
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: "#ffffff",
                    marginTop: DEFAULT_MARGIN,
                    paddingVertical: 10
                }}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#ff8601', fontSize: 14}}>{boxOffice.ranking}</Text>
                        <Text style={{color: '#939393', fontSize: 12}}>票房排名</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#ff8601', fontSize: 14}}>{boxOffice.todayBoxDes}</Text>
                        <Text style={{color: '#939393', fontSize: 12}}>今日实时(万)</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#ff8601', fontSize: 14}}>{boxOffice.totalBoxDes}</Text>
                        <Text style={{color: '#939393', fontSize: 12}}>累计票房(亿)</Text>
                    </View>

                </View>
            );
        }

    }

    //短评
    _renderMiniComment() {
        if (this.state.commentFetched) {
            const mini = this.state.comment.mini;
            return (
                <View style={{marginTop: DEFAULT_MARGIN, backgroundColor: "#ffffff"}}>
                    <View style={{paddingHorizontal: 10,}}>
                        <View style={{height: 40, alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{flex: 1, color: '#474747', fontSize: 14}}>短评</Text>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{color: '#939393', fontSize: 14}}>全部</Text>
                                <Image source={require('../image/ic_arrow_right.png')} style={{width: 18, height: 18}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={{flexDirection: 'row', paddingHorizontal: 10}}>
                        {/*头像*/}
                        <Image source={{uri: mini.list[0].headImg}}
                               style={{width: 40, height: 40, marginRight: 10, borderRadius: 20}}/>
                        <View style={{flex: 1}}>
                            <View style={{flexDirection: 'row'}}>
                                {/*昵称*/}
                                <Text style={{flex: 1, color: '#939393', fontSize: 14}}>{mini.list[0].nickname}</Text>
                                {/*评分*/}
                                <Text style={{color: '#639e02', fontSize: 14}}>评{mini.list[0].rating}</Text>
                            </View>
                            {/*评论内容*/}
                            <Text style={{
                                color: '#333333',
                                fontSize: 14,
                                paddingVertical: 10
                            }}>{mini.list[0].content}</Text>
                            <View style={{flexDirection: 'row'}}>
                                {/*日期*/}
                                <Text style={{
                                    flex: 1,
                                    color: '#939393',
                                    fontSize: 14
                                }}>{this.formatDate(new Date(mini.list[0].commentDate * 1000))}</Text>
                                <TouchableOpacity
                                    style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Image source={require('../image/ic_reply.png')} style={{width: 16, height: 16}}/>
                                    <Text style={{color: '#939393', fontSize: 12, marginHorizontal: 10}}>回复</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Image source={require('../image/ic_like.png')} style={{width: 16, height: 16}}/>
                                    <Text style={{color: '#939393', fontSize: 12, marginLeft: 10}}>赞</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{height: 0.5, backgroundColor: '#939393', margin: 10}}/>
                    <TouchableOpacity style={{flexDirection: 'row', paddingHorizontal: 10}}>
                        {/*头像*/}
                        <Image source={{uri: mini.list[1].headImg}}
                               style={{width: 40, height: 40, marginRight: 10, borderRadius: 20}}/>
                        <View style={{flex: 1}}>
                            <View style={{flexDirection: 'row'}}>
                                {/*昵称*/}
                                <Text style={{flex: 1, color: '#939393', fontSize: 14}}>{mini.list[1].nickname}</Text>
                                {/*评分*/}
                                <Text style={{color: '#639e02', fontSize: 14}}>评{mini.list[1].rating}</Text>
                            </View>
                            {/*评论内容*/}
                            <Text style={{
                                color: '#333333',
                                fontSize: 14,
                                paddingVertical: 10
                            }}>{mini.list[1].content}</Text>
                            <View style={{flexDirection: 'row'}}>
                                {/*日期*/}
                                <Text style={{
                                    flex: 1,
                                    color: '#939393',
                                    fontSize: 14
                                }}>{this.formatDate(new Date(mini.list[1].commentDate * 1000))}</Text>
                                <TouchableOpacity
                                    style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Image source={require('../image/ic_reply.png')} style={{width: 16, height: 16}}/>
                                    <Text style={{color: '#939393', fontSize: 12, marginHorizontal: 10}}>回复</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Image source={require('../image/ic_like.png')} style={{width: 16, height: 16}}/>
                                    <Text style={{color: '#939393', fontSize: 12, marginLeft: 10}}>赞</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{height: 0.5, backgroundColor: '#939393', margin: 10}}/>
                    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={{color: '#ff8601', fontSize: 14, marginBottom: 10}}>查看更多{mini.total}条评论</Text>
                    </TouchableOpacity>
                </View>
            );
        }

    }

    /**
     * 时间戳转日期
     * @param commentDate
     */
    formatDate(commentDate) {
        const year = commentDate.getYear();
        const month = commentDate.getMonth() + 1;
        const date = commentDate.getDate();
        const hour = commentDate.getHours();
        const minute = commentDate.getMinutes();
        const second = commentDate.getSeconds();
        return "20" + (year - 100) + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }

    //影评（长评）
    _renderPlusComment() {
        if (this.state.commentFetched) {
            const plus = this.state.comment.plus;
            return (
                <View style={{marginTop: DEFAULT_MARGIN, backgroundColor: "#ffffff"}}>
                    <View style={{paddingHorizontal: 10,}}>
                        <View style={{height: 40, alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{flex: 1, color: '#474747', fontSize: 14}}>影评</Text>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{color: '#939393', fontSize: 14}}>全部</Text>
                                <Image source={require('../image/ic_arrow_right.png')} style={{width: 18, height: 18}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={{paddingHorizontal: 10}}>
                        {/*标题*/}
                        <Text style={{color: '#333333', fontSize: 14}}>{plus.list[0].title}</Text>
                        <View style={{flexDirection: 'row', paddingVertical: 10, alignItems: 'center'}}>
                            {/*头像*/}
                            <Image source={{uri: plus.list[0].headImg}}
                                   style={{width: 20, height: 20, borderRadius: 10}}/>
                            {/*昵称*/}
                            <Text style={{
                                color: '#939393',
                                paddingHorizontal: 3,
                                fontSize: 12
                            }}>{plus.list[0].nickname}</Text>
                            {/*评分*/}
                            <Text
                                style={{color: '#639e02', paddingRight: 3, fontSize: 12}}>评{plus.list[0].rating}分</Text>
                            <Text style={{color: '#939393', paddingHorizontal: 3, fontSize: 12}}>|</Text>
                            {/*评论数目*/}
                            <Text
                                style={{color: '#939393', paddingHorizontal: 3, fontSize: 12}}>{plus.list[0].replyCount}评论</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{height: 0.5, backgroundColor: '#939393', marginHorizontal: 10, marginBottom: 10}}/>
                    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={{color: '#ff8601', fontSize: 14, marginBottom: 10}}>查看更多{plus.total}条影评</Text>
                    </TouchableOpacity>
                </View>
            );
        }

    }

    _onPressBack = () => {
        const navigation = this.props.navigation;
        const params = navigation.state.params;
        navigation.dispatch(NavigationActions.back());
    };

    _onPressCollect = () => {
        this.setState({
            collected: !this.state.collected,
        })
    };

    _onPressShare = () => {

    };

    _onPressVideo = () => {
        const navigation = this.props.navigation;
        const params = navigation.state.params;
        navigation.navigate('VideoList', {movieId: params.movieId});
    };
}
