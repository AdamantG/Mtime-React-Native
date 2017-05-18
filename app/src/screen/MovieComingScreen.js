/**
 * author: liminjie
 * date: 2017/3/30
 * desc: 即将上映的Tab页面
 */

'use strict';

import React, {Component} from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import Attention from "../component/Attention";
import ComingItem from "../component/ComingItem";

export default class MovieComingScreen extends Component {

    state: {
        attention: [],
        movieComings: [],
        tab: ['', '', '', '', ''],
        tabIndex: 0,
        baseMonth: 0,//选择月份
    };

    componentDidMount() {
        this.setState({});
        fetch('https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=365')
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作

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
                    tab: tab,
                    tabIndex: 0,
                    baseMonth: month
                });
            });
    }

    render() {

        return (
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: '#ffffff'
                }}
            >
                {this._renderAttentionTab()}
                {this._renderAttention()}
                {this._renderMovieComings()}
            </ScrollView>
        );
    }

    _renderAttentionTab() {
        if (this.state === null) {
            return null;
        }
        const tabArray = this.state.tab;
        if (tabArray === undefined) {
            return null;
        }
        return (
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

        );
    }

    _renderAttention() {
        if (this.state === null) {
            return null;
        }
        const attention = this.state.attention;
        if (attention === undefined) {
            return null;
        }

        let data = [];

        if (this.state.tabIndex === 0 || this.state.tabIndex === 4) {
            data = data.concat(attention);
        } else {
            attention.map((item, i) => {
                if (item.rMonth === (this.state.baseMonth + this.state.tabIndex - 1) % 12) {
                    data.push(item);
                }
            })
        }

        return (
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
                {
                    data.map((item, i) => {
                        return <Attention attention={item} key={i} navigation={this.props.navigation}/>
                    })
                }
            </ScrollView>
        );
    }

    _renderMovieComings() {
        if (this.state === null) {
            return null;
        }
        const movieComings = this.state.movieComings;
        if (movieComings === undefined) {
            return null;
        }

        return (
            <View>
                {
                    movieComings.map((item, i) => {
                        return (
                            <View key={i}>
                                <ComingItem coming={item} navigation={this.props.navigation}/>
                                <View style={{alignSelf: 'stretch', height: 1, backgroundColor: '#939393'}}/>
                            </View>
                        )
                    })
                }
            </View>
        );
    }
}