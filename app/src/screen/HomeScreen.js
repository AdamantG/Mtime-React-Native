import React from 'react';
import {
    Button,
    Text, View,
} from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    render() {
        return (
            <View>
                <Text>Hello, Chat App!</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Chat', {user: 'Lucy555'})}
                    title="Chat with Lucy"
                />
            </View>
        );
    }
}
