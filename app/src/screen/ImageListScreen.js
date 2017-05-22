/**
 * author: liminjie
 * date: 2017/5/9
 * desc: 剧照
 */

'use strict';

import React, {Component} from "react";
import {Image, Text, TouchableOpacity, View, Animated, FlatList, Dimensions} from "react-native";
import {NavigationActions} from "react-navigation";
import {styles} from "../style/Styles";
import VideoItem from "../component/VideoItem";
import ItemSeparator from "../component/ItemSeparator";
import ListFooter from "../component/ListFooter";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const {height, width} = Dimensions.get('window');

export default class ImageListScreen extends Component {

    state = {
        imageList: [],
    };

    componentDidMount() {
        this.fetchImages();
    }

    fetchImages() {

        const navigation = this.props.navigation;
        const params = navigation.state.params;
        const movieId = params.movieId;

        fetch('https://api-m.mtime.cn/Movie/ImageAll.api?movieId=' + movieId)
            .then((response) => response.json())
            .then((responseData) => {
                let images = responseData.images;
                let data = [];
                for (let i = 0; i < (images.length / 4); i++) {
                    let row = [];
                    row.push(
                        images[i * 4],
                        images[i * 4 + 1],
                        images[i * 4 + 2],
                        images[i * 4 + 3],
                    );
                    data.push(row);
                }

                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    imageList: responseData.images,
                });
            })
            .catch((error) => {
            });
    }

    render() {

        const navigation = this.props.navigation;
        const params = navigation.state.params;
        const name = params.name;

        return (
            <View style={{flex: 1, backgroundColor: '#000000'}}>
                <View style={[styles.headerBackground, {justifyContent: 'center'}]}>
                    {/*返回*/}
                    <TouchableOpacity
                        style={{position: "absolute", left: 10,}}
                        onPress={this._onPressBack}
                    >
                        <Image source={require('../image/ic_arrow_left.png')} style={styles.headerIcon}/>
                    </TouchableOpacity>

                    <Text style={[styles.headerTitleText, {alignSelf: 'center'}]}>{name}</Text>
                </View>
                <AnimatedFlatList
                    data={this.state.imageList}
                    numColumns={4}
                    horizontal={false}
                    renderItem={(item, index) => {
                        const image = item.item;
                        return (
                        <TouchableOpacity
                            onPress={() => {
                                this._onPressToBigImage(index)
                            }}>
                            <Image source={{uri: image.image}}
                                   resizeMode={Image.resizeMode.cover}
                                   style={[{width: width/4, height: width/4}]}/>
                        </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item, index) => {
                        return index;
                    }}
                    getItemLayout={(data, index) => (
                        // 143 是被渲染 item 的高度 ITEM_HEIGHT。
                        {length: width/4, offset: width/4 * (index/4), index}
                    )}
                />
            </View>

        );
    }

    _onPressBack = () => {
        const navigation = this.props.navigation;
        // const params = navigation.state.params;
        navigation.dispatch(NavigationActions.back());
    };

    _onPressToBigImage(index) {
        const navigation = this.props.navigation;
        // const params = navigation.state.params;
        navigation.navigate('ImageDetail', {
            imageList: this.state.imageList,
            index: index
        });
    };
}
