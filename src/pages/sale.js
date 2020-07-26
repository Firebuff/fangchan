import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import pt from '../utils/px2dp/Px2dp';

class HouseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.swiper}></View>
                <View style={styles.mainInfo}>
                    <Text style={styles.mainInfoTitle}>
                        新希望华鸿中梁瑞祥天樾
                    </Text>
                    <View style={ styles.priceField }>
                        <View style={ styles.priceFieldItem }>
                            <View style={ styles.price }>
                                <Text style={ styles.priceNumber }>32000</Text>
                                <Text style={ styles.priceUnit }>元/m²</Text>
                            </View>
                            <Text style={ styles.priceFieldItemName }>
                                参考价格
                            </Text>
                        </View>
                        <View style={ styles.priceFieldItem }>
                            <View style={ styles.price }>
                                <Text style={ styles.priceNumber }>32000</Text>
                                <Text style={ styles.priceUnit }>m²</Text>
                            </View>
                            <Text style={ styles.priceFieldItemName }>
                            建筑面积
                            </Text>
                        </View>
                    </View>
                    <View style={ styles.infoList }>
                        <View style={ styles.infoListItem }>
                            <View style={ styles.infoListItemKeyWrapper }>
                                <Text style={ styles.infoListItemKey }>开</Text>
                                <Text style={ styles.infoListItemKey }>发</Text>
                                <Text style={ styles.infoListItemKey }>商</Text>
                            </View>
                            <Text style={ styles.infoListItemVal }>开发商开发商开发商开发商开发商开发商</Text>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: pt(375),
    },
    swiper: {
        width: '100%',
        height: pt(250),
        backgroundColor: 'pink',
    },
    mainInfo: {
        paddingLeft: pt(15),
        paddingRight: pt(15),
        marginTop: pt(15)
    },
    mainInfoTitle: {
        fontSize: pt(20),
        color: '#101D37',
        fontWeight: 'bold',
    },
    priceField: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: pt(18),
        marginBottom: pt(20),
    },
    priceFieldItem: {
        flex: 1
    },
    price: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    priceNumber: {
        fontSize: pt(18),
        color: '#F04531',
        fontWeight: 'bold'
    },
    priceUnit: {
        fontSize: pt(12),
        color: '#F04531',
        alignSelf: 'center'
    },
    priceFieldItemName: {
        color: '#999999',
        fontSize: pt(10)
    },
    infoListItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    infoListItemKey: {
        color: '#919AAA',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'justify'
    },
    infoListItemKeyWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 50,
        backgroundColor: 'pink',
    },
    infoListItemVal: {
        color: '#101D37',
        marginLeft: pt(10)
    }
});

export default HouseDetail;
