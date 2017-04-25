/**
 * author: liminjie
 * date: 2017/3/30
 * desc: 导演
 */

'use strict';

import React, {Component} from "react";
import {Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NavigationActions} from "react-navigation";

export default class Director extends Component {
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

const styles = StyleSheet.create({
    textNormal: {
        color: '#333333',
        fontSize: 14,
    },
});