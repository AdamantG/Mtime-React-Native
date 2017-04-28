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
});
