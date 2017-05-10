/**
 * author: liminjie
 * date: 2017/5/10
 * desc: 演职员
 */

'use strict';

import React, {Component} from "react";
import {Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NavigationActions} from "react-navigation";
import {styles} from "../style/Styles";

export default class Credit extends Component {
    render() {
        const credit = this.props.credit;
        const image = credit.image;//头像
        const name = credit.name;//中文名
        const nameEn = credit.nameEn;//英文名
        const personate = credit.personate;//饰演角色名
        const roleCover = credit.roleCover;//角色封面
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                padding: 10,
            }}>
                {this._renderImage(image)}
                <View style={{flex: 1, justifyContent: 'center'}}>
                    {this._renderName(name)}
                    {this._renderNameEn(nameEn)}
                    {this._renderPersonate(personate)}
                </View>
                {this._renderRoleCover(roleCover)}
            </View>
        );
    }

    //人物头像
    _renderImage(image) {
        if (image === undefined) {
            return (
                <View style={{width: 60, height: 60}}/>
            )
        }
        return (
            <Image source={{uri: image}} style={{width: 60, height: 60,}} resizeMode={Image.resizeMode.cover}/>
        )
    }

    //中文名
    _renderName(name) {
        if (name === undefined) {
            return (
                <View/>
            )
        }
        return (
            <Text numberOfLines={1} style={[styles.textNormal, {textAlign: 'center', fontSize: 12}]}>{name}</Text>
        )
    }

    //英文名
    _renderNameEn(nameEn) {
        if (nameEn === undefined) {
            return (
                <View/>
            )
        }
        return (
            <Text numberOfLines={1} style={[styles.textNormal, {textAlign: 'center', fontSize: 12}]}>{nameEn}</Text>
        )
    }

    //饰演角色名
    _renderPersonate(personate) {
        if (personate === undefined) {
            return (
                <View/>
            )
        }
        return (
            <Text numberOfLines={1}
                  style={[styles.textNormal, {textAlign: 'center', fontSize: 12}]}>饰:{personate}</Text>
        )
    }

    //角色封面
    _renderRoleCover(roleCover) {
        if (roleCover === undefined) {
            return (
                <View style={{width: 60, height: 60}}/>
            )
        }
        return (
            <Image source={{uri: roleCover}} style={{width: 60, height: 60, borderRadius: 50}}/>
        )
    }
}