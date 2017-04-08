/**
 * author: liminjie
 * date: 2017/4/7
 * desc:列表分隔线
 */

import React, {Component} from "react";
import {StyleSheet, View} from "react-native";

const SEPARATOR_HEIGHT = StyleSheet.hairlineWidth;

export default class ItemSeparator extends Component {

    render() {
        return <View style={styles.separator}/>;
    }
}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: 'gray',
    },
});