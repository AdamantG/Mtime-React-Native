/**
 * author: liminjie
 * date: 2017/5/15
 * desc: 长评论列表item
 */

'use strict';

import React, {Component} from "react";
import {Image, Text, View} from "react-native";

export default class HotLongCommentItem extends Component {

    render() {
        const comment = this.props.comment.item;
        const image = comment.headurl;//用户头像
        const name = comment.nickname;//用户名
        const title = comment.title;//标题
        const content = comment.content;//内容
        const date = comment.modifyTime;//用户评论时间
        const rating = comment.rating;//用户评分

        return (
            <View style={{padding: 10}}>
                {/*标题*/}
                <Text style={{
                    color: '#333333',
                    fontSize: 16,
                    paddingVertical: 10
                }}>{title}</Text>
                {/*内容*/}
                <Text style={{
                    color: '#333333',
                    fontSize: 14,
                    paddingVertical: 10
                }}>{content}</Text>
                <View style={{flexDirection: 'row'}}>
                    {/*头像*/}
                    <Image source={{uri: image}}
                           style={{width: 40, height: 40, marginRight: 10, borderRadius: 20}}/>
                    <View style={{flex: 1}}>
                        {/*昵称*/}
                        <Text style={{flex: 1, color: '#939393', fontSize: 14}}>{name}</Text>
                        <View style={{flexDirection: 'row'}}>
                            {/*日期*/}
                            <Text style={{
                                color: '#939393',
                                fontSize: 12
                            }}>{this.formatDate(new Date(date * 1000))}</Text>
                            {/*评分*/}
                            {this._renderRating(rating)}
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    _renderRating(rating) {
        if (rating > 0) {
            return (
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        paddingHorizontal: 3,
                        color: '#ffffff',
                        fontSize: 12,
                        backgroundColor: '#639e02',
                    }}>{rating}</Text>
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
}
