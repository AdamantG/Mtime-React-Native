/**
 * author: liminjie
 * date: 2017/5/10
 * desc: 演职员表
 */

'use strict';

import React, {Component} from "react";
import {Animated, Image, SectionList, Text, TouchableOpacity, View} from "react-native";
import {NavigationActions} from "react-navigation";
import {styles} from "../style/Styles";
import ItemSeparator from "../component/ItemSeparator";
import ListFooter from "../component/ListFooter";
import Credit from "../component/Credit";

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

export default class CreditListScreen extends Component {

    state = {
        dataSource: [],
    };

    componentDidMount() {
        this.fetchCredit();
    }

    fetchCredit() {

        const navigation = this.props.navigation;
        const params = navigation.state.params;
        const movieId = params.movieId;

        fetch('https://api-m.mtime.cn/Movie/MovieCreditsWithTypes.api?movieId=' + movieId)
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                let types = responseData.types;

                let data = [];
                for (let i = 0; i < types.length; i++) {
                    let persons = [];
                    for (let j = 0; j < types[i].persons.length; j++) {
                        persons.push({
                            person: types[i].persons[j],
                        })
                    }
                    data.push({
                        data: persons,
                        key: types[i].typeName,
                    })
                }
                this.setState({
                    dataSource: data
                });

            });
    }

    render() {

        return (
            <View style={{flex: 1}}>
                <View style={[styles.headerBackground, {justifyContent: 'center'}]}>
                    {/*返回*/}
                    <TouchableOpacity
                        style={{position: "absolute", left: 10,}}
                        onPress={this._onPressBack}
                    >
                        <Image source={require('../image/ic_arrow_left.png')} style={styles.headerIcon}/>
                    </TouchableOpacity>
                    <Text style={[styles.headerTitleText, {alignSelf: 'center'}]}>演职员</Text>
                </View>
                <AnimatedSectionList
                    renderSectionHeader={this._renderSectionHeader}
                    renderItem={this._renderItem}
                    sections={this.state.dataSource}
                    keyExtractor={(item, index) => {
                        return index;
                    }}
                    ItemSeparatorComponent={ItemSeparator}
                    ListFooterComponent={ListFooter}
                    // legacyImplementation={true}
                    // stickySectionHeadersEnabled={true}
                />

            </View>
        );
    }

    _renderItem = (info) => {
        return (
            <Credit credit={info.item.person}/>
        );
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

    _onPressBack = () => {
        const navigation = this.props.navigation;
        // const params = navigation.state.params;
        navigation.dispatch(NavigationActions.back());
    };
}
