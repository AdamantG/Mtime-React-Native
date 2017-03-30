/**
 * author: liminjie
 * date: 2017/3/30
 * desc: 正在热映的Item
 */

import React from "react";
import {Text} from "react-native";
export default class ShowItem extends React.Component {
    render() {
        return (
            <Text>{this.props.name}</Text>
        );
    }
}