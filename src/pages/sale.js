import React, {Component} from 'react';

import {
    View,
    Text,
    Header,
    Animated,
    Easing,
    TouchableHighlight,
    ScrollView,
    StyleSheet,
} from 'react-native';

import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import pt from '../utils/px2dp/Px2dp';

import {getFilter} from '../api';

class Sale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            choiseList: [],
            choiceNavList: [],
            currentList: []
        };
        this.spinValue = new Animated.Value(0);
        this.height = 0;
        this.showThree;
    }

    spin = (index) => {
        this.getCurrentList(index)
        this.setState({
            height: 300,
        });
        this.spinValue.setValue(0);
        Animated.timing(this.spinValue, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
        }).start();
    };

    getCurrentList (index) {
        let currentList = []
        if (index != 3) {
            currentList = this.state.choiseList[index]
        } else {
            currentList = this.state.choiseList.forEach((item, index) => {
                if ( index > 3) {
                    currentList.push(item)
                }
            })
        }
        this.setState({
            currentList: currentList
        })
       
    }

    componentWillMount() {
        getFilter('houses').then((res) => {
            console.log(res);
            let choiseList = [];
            let choiseNavList = [];
            for (let key in res.cate_opt) {
                let newArr = res.cate_opt[key].data;
                newArr.unshift({name: '不限', value: 0});
                choiseList.push({
                    title: res.cate_opt[key].title,
                    list: newArr,
                    selected: 0,
                });
            }

            this.setState({
                choiseList: choiseList,
            });
        });
    }

    getNav() {
        let navList = [];
        this.state.choiseList.forEach((item, index) => {
            if (item.list.length) {
                if (navList.length < 3) {
                    navList.push(item);
                }
                if (navList.length == 3) {
                    navList.push({
                        title: '更多'
                    })
                }
            }
        });
        return navList;
    }
    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1], //输入值
            outputRange: [0, pt(254)], //输出值
        });
        const navList = this.getNav()
        return (
            <View>
                <View style={styles.navWrapper}>
                    {navList.map((item, index) => {
                        return (
                            <TouchableHighlight
                                underlayColor="#fff"
                                onPress={() => {
                                    this.spin(index)
                                }}
                                key={index}>
                                <Text>{item.title}</Text>
                            </TouchableHighlight>
                        );
                    })}
                </View>
                <Animated.View style={[styles.animate, {height: spin}]}>
                        <View style={styles.selectArea}>
                            <ScrollView>
                                <View>
                                    
                                </View>
                            </ScrollView>
                        </View>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    animate: {
        position: 'relative',
        zIndex: 10,
    },
    selectArea: {
        height: '100%',
        width: pt(375),
        backgroundColor: 'pink',
        overflow: 'hidden',
    },
});

export default Sale;
