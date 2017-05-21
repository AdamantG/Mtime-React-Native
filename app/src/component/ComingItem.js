/**
 * author: liminjie
 * date: 2017/5/18
 * desc: 即将上映的Item
 */

'use strict';

import React, {Component} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";

export default class ComingItem extends Component {

    render() {
        const coming = this.props.coming;
        let image = coming.image;//电影封面
        const title = coming.title;//电影名
        const releaseDate = coming.releaseDate;//上映日期
        const actor1 = coming.actor1;//演员1
        const actor2 = coming.actor2;//演员2
        const director = coming.director;//导演
        const type = coming.type;//影片类型
        const videoCount = coming.videoCount;//影片类型
        const wantedCount = coming.wantedCount;//想看人数
        const isTicket = coming.isTicket;//预售

        if (image === undefined) {
            image = 'http://img31.mtime.cn/ph/1463/1893463/1893463_1280X720X2.jpg';
        }

        return (
            <TouchableOpacity style={{flexDirection: 'row', padding: 10}} onPress={this._onPressToDetail}>
                {this._renderImage(videoCount, image)}
                <View style={{paddingHorizontal: 5, flex: 1}}>
                    <Text style={{fontSize: 15, color: 'black'}}>{title}</Text>
                    {/*<View style={{flexDirection: 'row', marginVertical: 5, alignItems: 'center'}}>*/}
                        {/*<Text style={{fontSize: 12, color: '#999999'}}>  {releaseDate}</Text>*/}
                    {/*</View>*/}
                    <View style={{flexDirection: 'row', marginVertical: 5}}>
                        <Text style={{fontSize: 12, color: '#ff8601'}}>{wantedCount}</Text>
                        <Text style={{fontSize: 12, color: '#999999'}}>人想看 - {type}</Text>
                    </View>
                    <Text numberOfLines={1} style={{fontSize: 12, color: '#999999'}}>{actor1}/{actor2}/{director}</Text>
                </View>
                {this._renderButton(isTicket)}
            </TouchableOpacity>
        );
    }

    _renderImage(videoCount, image) {
        if (videoCount > 0) {
            return (
                <TouchableOpacity style={[{backgroundColor: "#ffffff",}]}
                                  onPress={this._onPressToVideo}>
                    <Image source={{uri: image}} resizeMode={Image.resizeMode.cover}
                           style={[{width: 50, height: 80}]}/>
                    <View style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={require('../image/ic_video_play.png')} style={{width: 25, height: 25}}/>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={[{backgroundColor: "#ffffff",}]}>
                    <Image source={{uri: image}} resizeMode={Image.resizeMode.cover}
                           style={[{width: 50, height: 80,}]}/>
                </View>
            )
        }
    }

    _renderButton(isTicket) {
        if (isTicket) {
            return (
                <TouchableOpacity style={{
                    alignSelf: 'flex-end',
                    borderRadius: 2,
                    borderColor: '#639e02',
                    borderWidth: 1,
                    width: 50,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{color: '#639e02', fontSize: 12}}>预售</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={{
                    alignSelf: 'flex-end',
                    borderRadius: 2,
                    borderColor: '#ff8601',
                    borderWidth: 1,
                    width: 50,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{color: '#ff8601', fontSize: 12}}>想看</Text>
                </TouchableOpacity>
            );
        }
    }

    _onPressToVideo = () => {
        const movieId = this.props.coming.id;
        this.props.navigation.navigate('VideoList', {movieId: movieId});
    };

    _onPressToDetail = () => {
        const movieId = this.props.coming.id;
        this.props.navigation.navigate('Detail', {movieId: movieId});
    };


}
