/**
 * author: liminjie
 * date: 2017/5/12
 * desc: 短评论列表item
 */

'use strict';

import React, {Component} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../style/Styles";

export default class HotMovieCommentItem extends Component {

    render() {
        const comment = this.props.comment.item;
        const image = comment.caimg;//用户头像
        const name = comment.ca;//用户名
        const content = comment.ce;//用户评论内容
        const date = comment.cd;//用户评论时间
        const rating = comment.cr;//用户评分
        const commentCount = comment.commentCount > 0 ? comment.commentCount : '赞';//点赞数

        return (
            <TouchableOpacity style={{flexDirection: 'row', padding: 10}}>
                {/*头像*/}
                <Image source={{uri: image}}
                       style={{width: 40, height: 40, marginRight: 10, borderRadius: 20}}/>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        {/*昵称*/}
                        <Text style={{flex: 1, color: '#939393', fontSize: 14}}>{name}</Text>
                        {/*评分*/}
                        <Text style={{color: '#639e02', fontSize: 14}}>评{rating}</Text>
                    </View>
                    {/*评论内容*/}
                    <Text style={{
                        color: '#333333',
                        fontSize: 14,
                        paddingVertical: 10
                    }}>{content}</Text>
                    <View style={{flexDirection: 'row'}}>
                        {/*日期*/}
                        <Text style={{
                            flex: 1,
                            color: '#939393',
                            fontSize: 14
                        }}>{this.formatDate(new Date(date * 1000))}</Text>
                        <TouchableOpacity
                            style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../image/ic_reply.png')} style={{width: 16, height: 16}}/>
                            <Text style={{color: '#939393', fontSize: 12, marginHorizontal: 10}}>回复</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../image/ic_like.png')} style={{width: 16, height: 16}}/>
                            <Text style={{color: '#939393', fontSize: 12, marginLeft: 10}}>{commentCount}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
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
}
