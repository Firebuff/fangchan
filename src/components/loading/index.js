import React, {Component} from 'react';

import {Animated, Easing, View, Text} from 'react-native';

import Svg from '../svg';

import pt from '../../utils/px2dp/Px2dp';

class Loading extends Component {
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
            duration: 2000,
            easing: Easing.linear,
        }).start(() => this.spin());
    };

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1], //输入值
            outputRange: ['0deg', '360deg'], //输出值
        });

        return (
            <Animated.View style={[{transform: [{rotate: spin}], width: pt(10),}]}>
                {/* <Svg name="iconjiazaizhong" width={pt(90)} height={pt(45)}></Svg> */}

                <Text>88</Text>
            </Animated.View>
        );
    }
}

export default Loading;
