/**
 * author: liminjie
 * date: 2017/3/30
 * desc: 正在热映的Tab页面
 */

import React, {Component} from "react";
import {Animated, FlatList, StyleSheet, View} from "react-native";
import ShowItem from "../component/ShowItem";
import ItemSeparator from "../component/ItemSeparator";
import ListFooter from "../component/ListFooter";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class TabRecentScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
        this.fetchShowMovies = this.fetchShowMovies.bind(this);
    }

    componentDidMount() {
        this.fetchShowMovies();
    }

    fetchShowMovies() {
        fetch('https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=290')
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                try {
                    this.setState({
                        data: responseData.ms,
                    });
                } catch (error) {
                    console.warn(error)
                }
            });
    }

    render() {
        return (
            <AnimatedFlatList
                data={this.state.data}
                renderItem={(item) => {
                    return (<ShowItem movie={item}/>);
                }}
                keyExtractor={(item, index) => {
                    return index.toString();
                }}
                getItemLayout={(data, index) => (
                    // 143 是被渲染 item 的高度 ITEM_HEIGHT。
                    {length: 143, offset: 143 * index, index}
                )}
                ItemSeparatorComponent={ItemSeparator}
                ListFooterComponent={ListFooter}
            />
        );
    }
}

