/**
 * author: liminjie
 * date: 2017/4/28
 * desc: 预告片&拍摄花絮
 */

'use strict';

import React, {Component} from "react";
import {Image, Text, TouchableOpacity, View, Animated, FlatList} from "react-native";
import {NavigationActions} from "react-navigation";
import {styles} from "../style/Styles";
import VideoItem from "../component/VideoItem";
import ItemSeparator from "../component/ItemSeparator";
import ListFooter from "../component/ListFooter";

const TITLE_HEIGHT = 50;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class VideoListScreen extends Component {

    state = {
        data: [],
        refresh: false,
        pageIndex: 1,
    };

    componentDidMount() {
        this.fetchShowMovies();
    }

    fetchShowMovies() {

        const navigation = this.props.navigation;
        const params = navigation.state.params;
        const movieId = params.movieId;

        this.setState({
            refresh: true,
        });
        fetch('https://api-m.mtime.cn/Movie/Video.api?pageIndex=' + this.state.pageIndex + '&movieId=' + movieId)
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    data: responseData,
                    refresh: false,
                });
            })
            .catch((error) => {
                this.setState({
                    refresh: false,
                });
            });
    }

    render() {


        return (
            <View>
                <View style={[styles.headerBackground, {justifyContent: 'center'}]}>
                    {/*返回*/}
                    <TouchableOpacity
                        style={{position: "absolute", left: 10,}}
                        onPress={this._onPressBack}
                    >
                        <Image source={require('../image/ic_arrow_left.png')} style={styles.headerIcon}/>
                    </TouchableOpacity>

                    <Text style={[styles.headerTitleText, {alignSelf: 'center'}]}>预告片&拍摄花絮</Text>
                </View>
                <AnimatedFlatList
                    data={this.state.data.videoList}
                    renderItem={(item) => {
                        return (<VideoItem video={item} navigation={this.props.navigation}/>);
                    }}
                    keyExtractor={(item, index) => {
                        return index.toString();
                    }}
                    getItemLayout={(data, index) => (
                        // 143 是被渲染 item 的高度 ITEM_HEIGHT。
                        {length: 143, offset: 143 * index, index}
                    )}
                    refreshing={this.state.refresh}
                    onRefresh={() => {
                        this.fetchShowMovies()
                    }}
                    ItemSeparatorComponent={ItemSeparator}
                    ListFooterComponent={ListFooter}
                />
            </View>

        );
    }

    _onPressBack = () => {
        const navigation = this.props.navigation;
        const params = navigation.state.params;
        navigation.dispatch(NavigationActions.back());
    };
}
