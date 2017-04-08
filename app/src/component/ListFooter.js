/**
 * author: liminjie
 * date: 2017/4/7
 * desc:列表底部Footer
 */

import React, {Component} from "react";
import {StyleSheet, Text} from "react-native";

export default class ListFooter extends Component {

    render() {
        return <Text style={styles.text}>人家是有底线的</Text>;
    }
}

const styles = StyleSheet.create({
    text: {
        flex: 1,
        fontSize: 12,
        textAlign: 'center',
        margin: 10,
    },
});