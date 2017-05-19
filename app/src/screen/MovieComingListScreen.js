/**
 * author: liminjie
 * date: 2017/3/30
 * desc: 即将上映的Tab页面
 */

'use strict';

import React, {Component} from "react";
import {ScrollView, Text, TouchableOpacity, Animated, FlatList, View, SectionList} from "react-native";
import Attention from "../component/Attention";
import ComingItem from "../component/ComingItem";
import ItemSeparator from "../component/ItemSeparator";
import ListFooter from "../component/ListFooter";

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

export default class MovieComingListScreen extends Component {

    state = {
        attention: [],
        movieComings: [],
        comingData:[],
        tab: ['', '', '', '', ''],
        tabIndex: 0,
        baseMonth: 0,//选择月份
        refresh: false
    };

    componentDidMount() {
        this.fetchComingMovies();
    }

    fetchComingMovies(){
        this.setState({
            refresh: true,
        });
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
                        if (dateSet[i] === comingMovies[j].releaseDate){//如果日期匹配
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

                let tab = [];
                const month = responseData.attention[0].rMonth;
                tab[0] = '最受关注';
                tab[1] = month + '月大片';
                tab[2] = (month + 1) % 12 + '月大片';
                tab[3] = (month + 2) % 12 + '月大片';
                tab[4] = '有望引进';
                this.setState({
                    attention: responseData.attention,
                    movieComings: responseData.moviecomings,
                    comingData: comingData,
                    tab: tab,
                    tabIndex: 0,
                    baseMonth: month,
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

        if (this.state === null) {
            return null;
        }
        const movieComings = this.state.movieComings;
        if (movieComings === undefined) {
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
                refreshing={this.state.refresh}
                onRefresh={() => {
                    this.fetchComingMovies();
                }}
                ItemSeparatorComponent={ItemSeparator}
                ListFooterComponent={ListFooter}
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