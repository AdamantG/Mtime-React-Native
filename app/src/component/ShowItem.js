/**
 * author: liminjie
 * date: 2017/3/30
 * desc: 正在热映的Item
 */

import React from "react";
import {Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
export default class ShowItem extends React.Component {
    render() {
        const movie = this.props.movie;
        const img = movie.img;//电影海报
        const title = movie.tCn;//电影中文名
        const rank = movie.r;//评分
        const special = movie.commonSpecial;//一句话评价
        const raiseDate = movie.rd;//上映时间
        const cinemaCount = movie.cC;//上映电影院数
        const showtimeCount = movie.NearestShowtimeCount;//上映场数
        const versions = movie.versions;//观影标签
        const ticketing = movie.isTicket;//售票

        return (
            <TouchableOpacity onPress={() => {

            }}>
                <View style={styles.container}>
                    <Text>{title}</Text>
                    <Image source={{uri: img}} style={styles.img}/>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    img: {
        width: 90,
        height: 160,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
});
