/**
 * author: liminjie
 * date: 2017/5/9
 * desc: 浏览大图
 */

'use strict';

import React, {Component} from "react";
import {TouchableOpacity, View, StyleSheet, Text, Image, TouchableWithoutFeedback} from "react-native";
import {NavigationActions} from "react-navigation";
import {styles} from "../style/Styles";
import Video from "react-native-video";
import Gallery from "react-native-gallery";

export default class ImageDetailScreen extends Component {

    state = {
        imageList: [],
        index: 0,
    };

    componentDidMount() {
        const navigation = this.props.navigation;
        const params = navigation.state.params;
        this.setState({
            imageList: params.imageList,
            index: params.index,
        })
    }

    render() {

        return (
            <View style={{
                flex: 1,
                backgroundColor: '#000000',
            }}>
                {this._renderGallery()}
                {/*返回*/}
                <TouchableOpacity
                    style={{position: "absolute", top: 20, left: 10,}}
                    onPress={this._onPressBack}
                >
                    <Image source={require('../image/ic_arrow_left.png')} style={styles.headerIcon}/>
                </TouchableOpacity>
            </View>
        );
    }

    _renderGallery() {
        if (this.state.imageList.size <= 0) {
            return (<View/>);
        }

        let image = [];
        this.state.imageList.map((item, i) => {
            image[i] = item.image;
        });
        return (
            <TouchableWithoutFeedback
                style={{flex: 1,}}
                onPress={this._onPressBack}
            >
                <Gallery
                    initialPage={3}
                    style={{flex: 1, backgroundColor: 'black'}}
                    images={image}
                />
            </TouchableWithoutFeedback>
        );
    }

    _onPressBack = () => {
        const navigation = this.props.navigation;
        const params = navigation.state.params;
        navigation.dispatch(NavigationActions.back());
    };
}