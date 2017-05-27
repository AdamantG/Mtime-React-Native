/**
 * author: liminjie
 * date: 2017/3/30
 * desc: 即将上映的Tab页面
 */

'use strict';

import React, {Component,PureComponent} from "react";
import {ScrollView, Text, TouchableOpacity, Animated, FlatList, View, SectionList} from "react-native";
import Attention from "../component/Attention";
import ComingItem from "../component/ComingItem";
import ItemSeparator from "../component/ItemSeparator";
import ListFooter from "../component/ListFooter";
import {styles} from "../style/Styles";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

export default class MovieComingListScreen extends PureComponent {

    state = {
        attention: [],
        movieComings: [],
        comingData: [],
        tab: ['', '', '', '', ''],
        tabIndex: 0,
        baseMonth: 0,//选择月份
        refresh: false
    };

    componentDidMount() {
        this.fetchComingMovies();
    }

    fetchComingMovies() {
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
        <View>
            <View style={[styles.headerBackground, {justifyContent: 'center'}]}>
                <Text style={[styles.headerTitleText, {alignSelf: 'center'}]}>时光网</Text>
            </View>
            <ScrollView>
                {this._renderAttention()}
                {this._renderComingMovies()}
            </ScrollView>
        </View>

        );
    }

    _renderAttention() {
        if (this.state === null) {
            return null;
        }
        const tabArray = this.state.tab;
        if (tabArray === undefined) {
            return null;
        }

        const attention = this.state.attention;
        if (attention === undefined) {
            return null;
        }
        let attentionArray = [];
        if (this.state.tabIndex === 0 || this.state.tabIndex === 4) {
            attentionArray = attentionArray.concat(attention);
        } else {
            attention.map((item, i) => {
                if (item.rMonth === (this.state.baseMonth + this.state.tabIndex - 1) % 12) {
                    attentionArray.push(item);
                }
            })
        }

        return (
            <View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={{marginHorizontal: 10}}>
                    {
                        tabArray.map((item, i) => {
                            if (i === this.state.tabIndex) {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                tabIndex: i,
                                            });
                                        }}
                                        key={i}
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            margin: 10,
                                            paddingHorizontal: 15,
                                            paddingVertical: 5,
                                            backgroundColor: '#ff8601'
                                        }}>
                                        <Text style={{fontSize: 14, color: '#ffffff'}}>{item}</Text>
                                    </TouchableOpacity>
                                );
                            } else {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                tabIndex: i,
                                            });
                                        }}
                                        key={i}
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            margin: 10,
                                            paddingHorizontal: 15,
                                            paddingVertical: 5,
                                            backgroundColor: '#ebebeb'
                                        }}>
                                        <Text style={{fontSize: 14, color: '#999999'}}>{item}</Text>
                                    </TouchableOpacity>
                                );
                            }
                        })
                    }
                </ScrollView>

                <ScrollView
                    showsHorizontalScrollIndicator={true}
                    horizontal={true}>
                    {
                        attentionArray.map((item, i) => {
                            return <Attention attention={item} key={i} navigation={this.props.navigation}/>;
                        })
                    }
                </ScrollView>

                {/*<AnimatedFlatList*/}
                    {/*data={attentionArray}*/}
                    {/*horizontal={true}*/}
                    {/*renderItem={(item) => {*/}
                        {/*return <Attention attention={item} navigation={this.props.navigation}/>*/}
                    {/*}}*/}
                    {/*keyExtractor={(item, index) => {*/}
                        {/*return index.toString();*/}
                    {/*}}*/}
                {/*/>*/}
            </View>
        );
    }

    _renderComingMovies() {


        return (
            <AnimatedSectionList
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
                )}
                scrollEventThrottle={16}
                renderSectionHeader={this._renderSectionHeader}
                renderItem={this._renderItem}
                sections={this.state.comingData}
                keyExtractor={(item, index) => {
                    return index;
                }}
                // refreshing={this.state.refresh}
                // onRefresh={() => {
                //     this.fetchComingMovies();
                // }}
                ItemSeparatorComponent={ItemSeparator}
                ListFooterComponent={ListFooter}
                // legacyImplementation={true}
                // stickySectionHeadersEnabled={true}
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