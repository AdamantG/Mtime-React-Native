/**
 * Created by Administrator on 2017/4/28.
 */

'use strict';

import {StyleSheet} from "react-native";

const TITLE_HEIGHT = 50;
const ICON_SIZE = 20;
const HEADER_HEIGHT = 250;
const DEFAULT_MARGIN = 20;

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        width: 80,
        height: 123,
        backgroundColor: '#949494'
    },
    detail: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        marginLeft: 10,
    },
    detail_title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text_title: {
        color: '#333333',
        fontSize: 16,
        fontWeight: 'bold'
    },
    text_rank: {
        color: '#5d8a1c',
        fontStyle: 'italic',
        fontWeight: 'bold',
        flex:1
    },
    text_special: {
        color: '#ff8601',
        fontSize: 15,
    },
    text_date_cinema: {
        color: '#999999',
        fontSize: 12,
    },
    text_version: {
        fontSize: 12,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 5,
        marginHorizontal: 2,
        textAlign: 'center',
    },
    header: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        height: TITLE_HEIGHT,
    },
    headerTitle: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitleText: {
        color: 'white',
        fontSize: 18,
    },
    headerBackground: {
        backgroundColor: "#1d2635",
        height: TITLE_HEIGHT
    },
    headerIcon: {
        width: ICON_SIZE,
        height: ICON_SIZE,
    },
    storyExpand: {
        color: '#333333',
        fontSize: 14,
        lineHeight: 22,
    },
    storyCollapse: {
        color: '#333333',
        fontSize: 14,
        height: 40,
        lineHeight: 22,
    },
    textNormal: {
        color: '#333333',
        fontSize: 14,
    },
    textFooter: {
        flex: 1,
        fontSize: 12,
        textAlign: 'center',
        margin: 10,
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
    },
});
