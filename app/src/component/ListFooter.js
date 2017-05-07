/**
 * author: liminjie
 * date: 2017/4/7
 * desc:列表底部Footer
 */

'use strict';

import React, {Component} from "react";
import {StyleSheet, Text} from "react-native";
import {styles} from "../style/Styles";

export default class ListFooter extends Component {

    render() {
        return <Text style={styles.textFooter}>人家是有底线的</Text>;
    }
}
