/**
 * author: liminjie
 * date: 2017/5/17
 * desc: 最受关注的电影
 */

'use strict';

import React, {Component} from "react";
import {Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NavigationActions} from "react-navigation";
import {styles} from "../style/Styles";

export default class Attention extends Component {
    render() {
        const attention = this.props.attention.item;
        let image = attention.image;//电影封面
        const title = attention.title;//电影名
        const rMonth = attention.rMonth;//月
        const rDay = attention.rDay;//日
        const wantedCount = attention.wantedCount;//想看人数

        if (image === undefined) {
            image = 'http://img31.mtime.cn/ph/1463/1893463/1893463_1280X720X2.jpg';
        }
        return (
            <TouchableOpacity style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                margin: 5,
                width: 100,
            }} onPress={this._onPressToDetail}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{fontSize: 13}}>{rMonth}月{rDay}日 </Text>
                    <View style={{flex: 1, height: 0.7, backgroundColor: '#999999'}}/>
                </View>
                <Image source={{uri: image}} style={{width: 100, height: 140}}/>
                <Text style={{fontSize: 14, color: 'black'}} numberOfLines={1}>{title}</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{fontSize: 12, flex: 1}}>{wantedCount}人想看 </Text>
                    <Image source={require('../image/ic_like_selected.png')} style={{width: 12, height: 12}}/>
                </View>
            </TouchableOpacity>
        );

    }

    _onPressToDetail = () => {
        const movieId = this.props.attention.item.id;
        this.props.navigation.navigate('Detail', {movieId: movieId});
    };
}