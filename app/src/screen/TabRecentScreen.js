import React from 'react';
import {
    Button,
    Text, View,
} from 'react-native';
export default class TabRecentScreen extends React.Component {
    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('Chat', {user: 'Lucy'})}
                title="Chat with Lucy"
            />
        );
    }
}