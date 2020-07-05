import React, {Component} from 'react';
import {StyleSheet, View, Animated, Easing, Text, Dimensions } from 'react-native';

let { width } = Dimensions.get('window')

// const circle = require('../../resources/img/loginCircle.png');
class Index extends Component {
    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0);
        this.state = {};
    }
    componentDidMount() {
        this.spin();
    }
    //旋转方法
    spin = () => {
        this.spinValue.setValue(0);
        Animated.timing(this.spinValue, {
            toValue: 1, // 最终值 为1，这里表示最大旋转 360度
            duration: 3000,
            easing: Easing.linear,
        }).start(() => this.spin());
    };
    render() {
        const {user, pwd, fadeAnim} = this.state;
        //映射 0-1的值 映射 成 0 - 360 度
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1], //输入值
            outputRange: [1, 40], //输出值
        });
       
        return (
            <View style={styles.container}>
                <View style={{backgroundColor:'pink',width: width,height: 40,overflow: 'hidden'}}>
                    <Animated.View
                        style={[
                            styles.circle,
                            {transform: [{translateY: spin}]},
                            width: width
                        ]}>
                        {/* <View style={{backgroundColor: 'pink', width: width, height: 40}}> */}
                            <Text style={{lineHeight: 40,position: 'relative'}}>新房代购</Text>
                        {/* </View> */}
                    </Animated.View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        width: width,
        
    },
    circle: {
        position: 'absolute',
    },
});
export default Index;
