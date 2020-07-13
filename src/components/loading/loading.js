import React, {Component} from 'react';

import { Animated, Easing, View, Text } from 'react-native';

import Svg from '../svg';

import pt from '../../utils/px2dp/Px2dp';

class LoadingImg extends Component {
    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0);
        this.state = {
            move: true
        };
    }

    componentDidMount() {
        this.spin();
    }
    //旋转方法
    spin = () => {
        this.spinValue.setValue(0);
        Animated.timing(this.spinValue, {
            toValue: 1, // 最终值 为1，这里表示最大旋转 360度
            duration: 800,
            easing: Easing.linear,
        }).start((res) => {
            this.spin()
        });
    };

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1], //输入值
            outputRange: ['0deg', '360deg'], //输出值
        });
        return (
            <Animated.Image style={[{transform: [{rotate: spin}]}, {alignSelf: 'center',height:20,width:20}]} source={ require('../../static/images/img/loading.png') }>
            </Animated.Image>
        );
    }
}
export default LoadingImg
