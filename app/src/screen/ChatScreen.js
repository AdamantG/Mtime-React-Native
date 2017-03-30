import React from "react";
import {Button, Text, View} from "react-native";
export default class ChatScreen extends React.Component {
    static navigationOptions = {
        header: ({state, setParams}) => {
            let right = (
                <Button
                    title={`${state.params.user}'s info`}
                    onPress={() => {
                        setParams({
                            mode: 'info'
                        })
                    }}
                />
            );
            if ('info' === state.params.mode) {
                right = (
                    <Button
                        title={'Done'}
                        onPress={() => {
                            setParams({
                                mode: 'done'
                            })
                        }}
                    />
                );
            }
            return {right};
        },
        title: ({state}) => {
            return state.params.user;
        }
    };

    render() {
        return (
            <View>
                <Text>Chat with {this.props.navigation.state.params.user}</Text>
            </View>
        );
    }
}