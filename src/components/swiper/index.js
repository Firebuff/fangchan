import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import pt from '../../utils/px2dp/Px2dp';
import Swiper from 'react-native-swiper';

class Swipers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={{height: pt(250)}}>
                <Swiper style={styles.wrapper} showsButtons={false} height={pt(250)}>
                    <View style={styles.slide1}>
                        <Text style={styles.text}>Hello Swiper</Text>
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>Beautiful</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                </Swiper>
                <View style={{position:'absolute',bottom: 0, left: '50%'}}>
                    <Text>77</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        height: 500
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
});
export default Swipers;
