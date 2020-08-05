import React, {Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';

import pt from '../../utils/px2dp/Px2dp';

function getName(params) {
    let newParams = `${params}`;
    let arr = newParams.split('</span>');
    let returnArr = [];
    let reg = new RegExp('^[\u4E00-\u9FFF]+$');
    arr.forEach((element) => {
        let result = '';
        for (let key in element) {
            if (reg.test(element[key])) {
                result += element[key];
            }
        }
        if (result) {
            returnArr.push(result);
        }
    });
    return returnArr;
}

const HouseList = (props) => {
    //console.log(props);
    return (
        <TouchableWithoutFeedback
            onPress={
                () => {
                    props.navigation.push('HouseDetailScreen',{id: props[props.idParam]})
                }
            }
        >
            <View style={styles.listContainer}>
                <View style={styles.leftImg}>
                    <Image
                        style={styles.img}
                        resizeMode="cover"
                        source={{
                            uri: props.thumb,
                        }}
                    />
                </View>
                <View style={styles.info}>
                    <View>
                        <Text
                            style={styles.title}
                            ellipsizeMode="tail"
                            numberOfLines={1}>
                            {props.name}
                        </Text>
                    </View>

                    <View>
                        <Text
                            ellipsizeMode="tail"
                            numberOfLines={1}
                            style={styles.addr}>
                            {props.region}-{props.address}
                        </Text>
                    </View>
                    <View style={styles.tagList}>
                        <Text style={styles.tag}>{props.cate_status}</Text>

                        {getName(props.cate_type).map((item, index) => {
                            if (index < 4) {
                                return (
                                    <Text style={styles.tag} key={index}>
                                        {item}
                                    </Text>
                                );
                            }
                        })}
                    </View>
                    <View style={[styles.tagList, {alignItems: 'baseline'}]}>
                        <Text style={styles.price}>{props.dj}</Text>
                        <Text style={styles.unit}>元/m²</Text>
                        <Text style={styles.size}>
                            建面{' '}
                            {props.btwmj
                                ? `${props.btwmj.value}`.replace(/\s/g, '')
                                : '-'}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};
export default HouseList;

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        paddingTop: pt(16),
        paddingBottom: pt(16),
        borderBottomColor: '#f9f9f9',
        borderBottomWidth: pt(1),
        borderStyle: 'solid',
    },
    info: {
        justifyContent: 'space-between',
    },
    title: {
        fontSize: pt(16),
        fontWeight: 'bold',
        color: '#101D37',
        width: pt(180),
    },
    leftImg: {
        marginRight: pt(12),
        width: pt(124),
        height: pt(96),
        borderRadius: pt(4),
    },
    img: {
        borderRadius: pt(4),
        borderColor: 'red',
        width: pt(124),
        height: pt(96),
    },
    addr: {
        fontSize: pt(12),
        color: '#919AAA',
        width: pt(180),
    },
    tagList: {
        flexDirection: 'row',
    },
    tag: {
        marginRight: pt(10),
        fontSize: pt(10),
        borderStyle: 'solid',
        borderWidth: pt(0.5),
        borderColor: '#DDE3EF',
        color: '#DDE3EF',
        paddingTop: pt(1),
        paddingBottom: pt(1),
        paddingLeft: pt(2),
        paddingRight: pt(2),
        borderRadius: pt(4),
        alignSelf: 'center',
    },
    price: {
        color: '#F04531',
        fontSize: pt(18),
        fontWeight: 'bold',
        lineHeight: pt(18),
    },
    unit: {
        fontSize: pt(10),
        lineHeight: pt(20),
        color: '#F04531',
    },
    size: {
        fontSize: pt(10),
        marginLeft: pt(10),
        color: '#919AAA',
        lineHeight: pt(20),
    },
});
