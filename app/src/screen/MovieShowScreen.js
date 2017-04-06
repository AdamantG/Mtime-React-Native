/**
 * author: liminjie
 * date: 2017/3/30
 * desc: 正在热映的Tab页面
 */

import React, {Component} from "react";
import {Animated, FlatList, ListView} from "react-native";
import ShowItem from "../component/ShowItem";

export default class TabRecentScreen extends Component {
    AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
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
                const data = responseData.ms;
                for (let i = 0; i < data.length; i++) {
                    let key = 'item';
                    data[i].key = key.append(i);
                }
                this.setState({
                    dataSource: data,
                });
            });
    }

    render() {
        return (
            <FlatList
                data={this.state.dataSource}
                renderItem={(item, index) => <ShowItem movie={item}/>}
                getItemLayout={(data, index) => (
                    // 120 是被渲染 item 的高度 ITEM_HEIGHT。
                    {length: 143, offset: 143 * index, index}
                )}
            />
        );
    }
}
