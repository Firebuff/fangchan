import React from 'react';

import {View, Text, StyleSheet, ScrollView} from 'react-native';

import {getNewsDetail} from '../api';

import HTMLView from 'react-native-htmlview';

import pt from '../utils/px2dp/Px2dp';

const moment = require('moment')

class NewsDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
    }
    componentDidMount() {
        this.setState({
            data: {},
        });
        getNewsDetail({id: 862}).then((res) => {
            console.log(res);
            if (res.status == 1) {
                this.setState({
                    data: res.data[0],
                });
            }
        });
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>{this.state.data.name}</Text>
                    <Text style={styles.date}>
                        {moment(this.state.data.create_time*1000).format('YYYY.MM.DD')}
                    </Text>
                    <HTMLView
                        value={this.state.data.content}
                        stylesheet={styles}
                    />
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    title: {
        fontSize: pt(20),
        color: '#333333',
        fontWeight: 'bold',
        marginTop: pt(15),
    },
    date: {
        fontSize: pt(12),
        color: '#CCCCCC',
        lineHeight: pt(22),
        marginTop: pt(15),
        marginBottom: pt(15),
    },
    wrapper: {
        paddingLeft: pt(15),
        paddingRight: pt(15),
        lineHeight: pt(22),
        paddingBottom: pt(20)
    },
    p: {
        color: '#333333',
        fontSize: pt(14),
        lineHeight: pt(22),
    },
});

export default NewsDetail;
