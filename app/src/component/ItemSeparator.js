/**
 * author: liminjie
 * date: 2017/4/7
 * desc:列表分隔线
 */

'use strict';

import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {styles} from "../style/Styles";

const SEPARATOR_HEIGHT = StyleSheet.hairlineWidth;

export default class ItemSeparator extends Component {

    render() {
        return <View style={styles.separator}/>;
    }
}
