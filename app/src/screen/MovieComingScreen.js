/**
 * author: liminjie
 * date: 2017/3/30
 * desc: 即将上映的Tab页面
 */

'use strict';

import React, {Component} from "react";
import {SectionList, Text, TouchableOpacity, View, Animated} from "react-native";
import Attention from "../component/Attention";
import ComingItem from "../component/ComingItem";
import ItemSeparator from "../component/ItemSeparator";
import ListFooter from "../component/ListFooter";

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

export default class MovieComingScreen extends Component {

    state: {
        comingData: [],
    };

    componentDidMount() {
        this.setState({});
        fetch('https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=365')
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作

                let comingData = [];
                let comingMovies = responseData.moviecomings;

                //得到日期数组
                let date = [];
                for (let i = 0; i < comingMovies.length; i++) {
                    date.push(comingMovies[i].releaseDate);
                }
                //得到无重复日期数组
                let dateSet = Array.from(new Set(date));

                for (let i = 0; i < dateSet.length; i++) {
                    let movieOnDate = [];//当天上映的电影集合
                    for (let j = 0; j < comingMovies.length; j++) {
                        if (dateSet[i] === comingMovies[j].releaseDate) {//如果日期匹配
                            movieOnDate.push({
                                coming: comingMovies[j],
                            })
                        }
                    }
                    comingData.push({
                        data: movieOnDate,
                        key: dateSet[i],
                    })
                }
                this.setState({
                    comingData: comingData,
                });
            });
    }

    render() {

        if (this.state === null) {
            return null;
        }
        const comingData = this.state.comingData;
        if (comingData === undefined) {
            return null;
        }

        return (
            <AnimatedSectionList
                renderSectionHeader={this._renderSectionHeader}
                renderItem={this._renderItem}
                sections={this.state.comingData}
                keyExtractor={(item, index) => {
                    return index;
                }}
                ItemSeparatorComponent={ItemSeparator}
                ListFooterComponent={ListFooter}
                getItemLayout={(data, index) => (
                    // 143 是被渲染 item 的高度 ITEM_HEIGHT。
                    {length: 101, offset: 101 * index, index}
                )}
            />
        );
    }

    _renderItem = (info) => {
        return (<ComingItem coming={info.item.coming} navigation={this.props.navigation}/>);
    };

    _renderSectionHeader = (info) => {
        return (
            <Text style={{
                padding: 10,
                backgroundColor: '#f6f6f6',
                color: '#939393',
                fontSize: 12
            }}>{info.section.key}</Text>)
    };
}