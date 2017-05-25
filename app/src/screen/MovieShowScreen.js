/**
 * author: liminjie
 * date: 2017/3/30
 * desc: 正在热映的Tab页面
 */

'use strict';

import React, {Component, PureComponent} from "react";
import {Animated, FlatList} from "react-native";
import ShowItem from "../component/ShowItem";
import ItemSeparator from "../component/ItemSeparator";
import ListFooter from "../component/ListFooter";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class MovieShowScreen extends PureComponent {

    state = {
        data: [],
        refresh: false
    };

    componentDidMount() {
        this.fetchShowMovies();
    }

    fetchShowMovies() {
        this.setState({
            refresh: true,
        });
        fetch('https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=365')
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    data: responseData.ms,
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
            <AnimatedFlatList
                data={this.state.data}
                renderItem={(item) => {
                    return (<ShowItem movie={item} navigation={this.props.navigation}/>);
                }}
                keyExtractor={(item, index) => {
                    return index;
                }}
                getItemLayout={(data, index) => (
                    // 143 是被渲染 item 的高度 ITEM_HEIGHT。
                    {length: 144, offset: 144 * index, index}
                )}
                refreshing={this.state.refresh}
                onRefresh={() => {
                    this.fetchShowMovies()
                }}
                ItemSeparatorComponent={ItemSeparator}
                ListFooterComponent={ListFooter}
            />
        );
    }
}

