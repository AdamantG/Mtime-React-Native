/**
 * author: liminjie
 * date: 2017/4/8
 * desc: 电影详情页面
 */

'use strict';

import React, {Component} from "react";
import {Text} from "react-native";

export default class MovieDetailScreen extends Component {

    render() {
        const {params} = this.props.navigation.state;
        return (
            <Text>{params.name}</Text>
        );
    }
}