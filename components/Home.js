import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

const Home = function ({navigation, route}) {
    return (
        <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Text>Home</Text>
            <View style={{marginTop: 10}}>
                <Button
                    title="去详情页"
                    onPress={() => {
                        navigation.navigate('HomeDetail', {name: 'hello'});
                    }}></Button>
            </View>
        </View>
    );
};
export default Home;
