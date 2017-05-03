/**
 * author: liminjie
 * date: 2017/4/30
 * desc: 预告片&拍摄花絮Item
 */

'use strict';

import React, {Component} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default class VideoItem extends Component {

    render() {
        const video = this.props.video.item;
        const image = video.image;//视频图片
        const title = video.title;//预告片名称
        const length = video.length;//预告片时长

        return (
            <TouchableOpacity style={{flexDirection: 'row', padding: 15}} onPress={this._onPressToVideoPlay}>
                <View >
                    <Image source={{uri: image}} resizeMode={Image.resizeMode.cover}
                           style={[{width: 120, height: 78,}]}/>
                    <Image source={require('../image/ic_video_play.png')} style={{
                        position: "absolute",
                        right: 5,
                        bottom: 5,
                        width: 25,
                        height: 25,
                    }}/>
                </View>
                <View style={{marginLeft: 10}}>
                    <Text style={{fontSize: 14, color: '#333333', marginBottom: 10}}>{title}</Text>
                    <Text style={{fontSize: 12, color: '#939393'}}>片长：{this.formatSeconds(length)}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    /**
     * 秒转分秒
     * @param value 总秒数
     * @returns {string} XX分XX秒
     */
    formatSeconds = (value) => {
        let theTime = parseInt(value);// 秒
        let theTime1 = 0;// 分
        let theTime2 = 0;// 小时
        if (theTime > 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60);
                theTime1 = parseInt(theTime1 % 60);
            }
        }
        let result = "" + parseInt(theTime) + "秒";
        if (theTime1 > 0) {
            result = "" + parseInt(theTime1) + "分" + result;
        }
        if (theTime2 > 0) {
            result = "" + parseInt(theTime2) + "小时" + result;
        }
        return result;
    };

    _onPressToVideoPlay = () => {
        const video = this.props.video.item;
        this.props.navigation.navigate('VideoPlay', {video: video});
    };
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    img: {
        width: 80,
        height: 123,
    },
    detail: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        marginLeft: 10,
    },
    detail_title: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text_title: {
        color: '#333333',
        fontSize: 16,
        fontWeight: 'bold'
    },
    text_rank: {
        color: '#5d8a1c',
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    text_special: {
        color: '#ff8601',
        fontSize: 15,
    },
    text_date_cinema: {
        color: '#999999',
        fontSize: 12,
    },
    text_version: {
        fontSize: 12,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 5,
        marginHorizontal: 2,
        textAlign: 'center',
    },
});
