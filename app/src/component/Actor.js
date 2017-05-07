/**
 * author: liminjie
 * date: 2017/3/30
 * desc: 主要演员
 */

'use strict';

import React, {Component} from "react";
import {Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NavigationActions} from "react-navigation";
import {styles} from "../style/Styles";

export default class Actor extends Component {
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