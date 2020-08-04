import React from 'react'

import { View, Text, StyleSheet, Image } from 'react-native'

import pt from '../../utils/px2dp/Px2dp';

const NewsListItem  = (props) => {
    return (
        <View style={styles.itemWrapper}>
            <View style={styles.itemInfo}>
                <Text style={styles.title}>
                    {props.name || ''}
                </Text>
                <View style={styles.textWrapper}>
                    {/*<Text style={styles.author}>
                        刘青峰
                    </Text>*/}
                    <Text style={styles.date}>
                        {props.create_time}
                    </Text>
                </View>
            </View>
            <Image
                source={{uri: props.thumb}}
                style={styles.img}
            ></Image>
        </View>
    )
}
const styles = StyleSheet.create({
    itemWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        borderColor: '#F9F9F9',
        borderStyle: 'solid',
        borderBottomWidth: pt(1),
        paddingTop: pt(15),
        paddingBottom: pt(15)
    },
    itemInfo: {
        justifyContent: 'space-between',
        flex: 1
    },
    img: {
        width: pt(104),
        height: pt(80),
        marginLeft: pt(15),
        borderRadius: pt(4)
    },
    title: {
        color: '#101D37',
        fontSize: pt(16),
        fontWeight: 'bold'
    },
    author: {
        fontSize: pt(12),
        color: '#DDE3EF',
        paddingRight: 10
    },
    date: {
        fontSize: pt(12),
        color: '#CCCCCC',
    },
    textWrapper: {
        flexDirection: 'row'
    },

})

export default NewsListItem