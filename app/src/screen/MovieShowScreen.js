/**
 * author: liminjie
 * date: 2017/3/30
 * desc: 正在热映的Tab页面
 */

import React, {Component} from 'react';
import {
    ListView,
} from 'react-native';
import ShowItem from "../component/ShowItem";

export default class TabRecentScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => {
                    r1 !== r2;
                }
            })
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
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.ms),
                });
            });
    }

    // async fetchShowMovies() {
    //     try {
    //         // 注意这里的await语句，其所在的函数必须有async关键字声明
    //         let response = await fetch('https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=290');
    //         let responseJson = await response.json();
    //         console.log(responseJson.toString());
    //         this.setState({
    //             dataSource: this.state.dataSource.cloneWithRows(responseJson.ms)
    //         });
    //     } catch(error) {
    //         console.error(error);
    //     }
    // }


    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <ShowItem movie={rowData}/>}
            />
        );
    }
}
