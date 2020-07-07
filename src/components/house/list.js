import React from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';

import pt from '../../utils/px2dp/Px2dp';

const HouseList = () => {
    return (
        <View>
            <View>
                <Image
                    style={{width: pt(124), height: pt(96)}}
                    source={{
                        uri: 'https://house.08cms.com/thumb/uploads/house/000/00/00/1/000/002/390d87cc5e91f4450a46103e340f4eec.jpg',
                    }}
                />
            </View>
            <View>
                <View>
                    <Text>华润幸福里</Text>
                </View>

                <View>
                    <Text>常平镇站北路隐闲山庄旁</Text>
                </View>
                <View>
                    <Text>在售</Text>
                    <Text>普通住宅</Text>
                </View>
            </View>
        </View>
    );
};
export default HouseList;

const styles = StyleSheet.create({});
