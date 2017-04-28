/**
 * author: liminjie
 * date: 2017/4/28
 * desc: 预告片&拍摄花絮
 */

'use strict';

import React, {Component} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {NavigationActions} from "react-navigation";
import {styles} from "../style/Styles";

const TITLE_HEIGHT = 50;

export default class VideoListScreen extends Component {

    render() {
        return (
            <View style={styles.headerBackground}>
                {/*返回*/}
                <TouchableOpacity
                    style={{position: "absolute", left: 10,}}
                    onPress={this._onPressBack}
                >
                    <Image source={require('../image/ic_arrow_left.png')} style={styles.headerIcon}/>
                </TouchableOpacity>

            </View>
        );
    }

    _onPressBack = () => {
        const navigation = this.props.navigation;
        const params = navigation.state.params;
        navigation.dispatch(NavigationActions.back());
    };
}
