/**
 * author: liminjie
 * date: 2017/3/30
 * desc: 正在热映的Tab页面
 */

import React from 'react';
import {
    Button, ListView,
    Text, View,
} from 'react-native';
import ShowItem from "../component/ShowItem";
export default class TabRecentScreen extends React.Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                r1 !== r2;
            }
        });
        this.state = {
            dataSource: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
            ])
        };
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData, sectionID, rowID) => <ShowItem name={rowData}/>}
            />
        );
    }
}