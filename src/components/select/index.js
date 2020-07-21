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
    Alert,
    Dimensions,
} from 'react-native';

import {Button} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import pt from '../../utils/px2dp/Px2dp';

import {getFilter} from '../../api';

import Svg from '../svg';

const screenHeight = Dimensions.get('window').height;

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choiseList: [],
            choiceNavList: [],
            currentList: [],
            currentNavIndex: 0,
            showThreeList: [],
            moreList: [],
            selectParams: {},
            hideMarsk: true,
            zIndex: 0
        };
        this.spinValue = new Animated.Value(0);
        this.height = 0;
        this.showThree;
        this.range = [0, pt(254)];
        this.isOpen = false;
        this.opacityValue = new Animated.Value(0);
        this.opacityRange = [0, 1];
    }

    //动画
    spin = (index) => {
        this.opacityAnimate();

        //设置动画的初始值为 0
        this.spinValue.setValue(0);

        //执行动画
        Animated.timing(this.spinValue, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
        }).start(() => {
            // 将选择框 是否打开的状态更新
            this.isOpen = !this.isOpen;
        });
    };

    //动画
    opacityAnimate = () => {
        //设置动画的初始值为 0
        this.opacityValue.setValue(0);

        //执行动画
        Animated.timing(this.opacityValue, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
        }).start(() => {
            this.setState({
                hideMarsk: !this.state.hideMarsk,
                zIndex: this.state.zIndex == 5? 0 : 5
            });
          
        });
    };

    navClickHandle(index) {
        //如果弹出框已经弹出，那么点击导航时就要执行关闭的动画
        if (this.isOpen) {
            // 如果不是点击 已弹出的列表框对应的导航，则先关闭该弹出框，再执行对应的要弹出的弹框的动画
            if (index != this.state.currentNavIndex) {
                //点击到哪个导航
                this.setState({
                    currentNavIndex: index,
                });
            } else {
                //点击到哪个导航
                this.setState({
                    currentNavIndex: index,
                });

                this.range = [pt(254), 0];
                this.opacityRange = [1, 0];
                this.spin(index);
            }
        } else {
            //点击到哪个导航
            this.setState({
                currentNavIndex: index,
            });

            //如果弹出框未弹出，则执行打开的动画
            this.range = [0, pt(254)];
            this.opacityRange = [0, 1];
            this.spin(index);
        }
    }

    getCurrentList() {
        let currentList = [];
        if (!this.state.choiseList.length) return [];
        if (this.state.currentNavIndex != 3) {
            currentList = this.state.showThreeList[this.state.currentNavIndex]
                .list;
            //console.log(currentList)
        } else {
            currentList = this.state.moreList;
        }
        //console.log(currentList)
        return currentList;
    }

    componentDidMount() {
        getFilter('houses').then((res) => {
            //console.log(res);
            let choiseList = [];
            let choiseNavList = [];
            //为每个数组里面的元素添加一个 选项类型标志key， 以及当前激活的下标， 首项不限
            for (let key in res.cate_opt) {
                let newArr = res.cate_opt[key].data;
                newArr.unshift({name: '不限', value: 0});
                newArr = newArr.map((item) => {
                    return {...item, key: key, activeIndex: 0};
                });
                choiseList.push({
                    title: res.cate_opt[key].title,
                    list: newArr,
                    selected: '',
                    key: key,
                });
            }
            //console.log(choiseList)

            //截取前三项
            let threeList = choiseList.slice(0, 3);
            //console.log(moreList)

            // 除三项外其他的写入的到更多中
            let moreList = choiseList.slice(3);
            this.setState({
                choiseList: choiseList,
                showThreeList: threeList,
                moreList: moreList,
            });
        });
    }

    getNav() {
        let navList = [];
        this.state.showThreeList.forEach((item, index) => {
            if (item.list.length) {
                if (navList.length < 3) {
                    navList.push(item);
                }
                if (navList.length == 3) {
                    navList.push({
                        title: '更多',
                        selected: '',
                    });
                }
            }
        });
        //console.log(navList);
        return navList;
    }

    itemSelecthandle(index, key, value, name) {
        let list = this.state.choiseList;
        let selectParams = {};
        for (let i = 0; i < list.length; i++) {
            if (list[i].key == key) {
                if (index == 0) {
                    list[i].selected = list[i].title;
                } else {
                    list[i].selected = name;
                }
                list[i].list = list[i].list.map((item, itemIndex) => {
                    item.activeIndex = index;
                    return item;
                });
                if (i < 3) {
                    //如果弹出框未弹出，则执行打开的动画
                    this.range = [pt(254), 0 ];
                    this.opacityRange = [1, 0];
                    this.spin(index);
                }
                break;
            }
        }
        selectParams = {...this.state.selectParams, [key]: value};
        //console.log(selectParams);
        //console.log(list)

        this.setState(
            {
                choiseList: list,
                selectParams: selectParams,
            },
            () => {},
        );
    }

    showWhich(that, item, index) {
        if (this.state.currentNavIndex != 3) {
            return (
                <TouchableHighlight
                    underlayColor="rgba(0,0,0,0)"
                    onPress={() => {
                        that.itemSelecthandle(
                            index,
                            item.key,
                            item.value,
                            item.name,
                        );
                    }}>
                    <Text
                        style={[
                            styles.selectText,
                            {
                                color:
                                    index == item.activeIndex
                                        ? '#F04531'
                                        : '#333333',
                            },
                        ]}
                        key={index}>
                        {item.name}
                    </Text>
                </TouchableHighlight>
            );
        } else {
            return (
                <View style={styles.listWrapper}>
                    <View>
                        <Text style={styles.listTitle}>{item.title}</Text>
                    </View>
                    <View style={styles.listContent}>
                        {item.list.map((child, childIndex) => {
                            return (
                                <TouchableHighlight
                                    key={childIndex}
                                    underlayColor="rgba(0,0,0,0)"
                                    onPress={() => {
                                        this.itemSelecthandle(
                                            childIndex,
                                            child.key,
                                            child.value,
                                            child.name,
                                        );
                                    }}>
                                    <View
                                        style={[
                                            styles.contentItem,
                                            childIndex == child.activeIndex
                                                ? styles.active
                                                : '',
                                            {
                                                marginRight:
                                                    index % 5 == 0 ? pt(5) : 0,
                                            },
                                        ]}>
                                        <Text
                                            style={
                                                childIndex == child.activeIndex
                                                    ? styles.activeColor
                                                    : ''
                                            }>
                                            {child.name}
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                            );
                        })}
                    </View>
                </View>
            );
        }
    }

    resetHandle() {
        //console.log(88);
        let list = this.state.choiseList;
        list.forEach((rootItem, rootIndex) => {
            if (rootIndex > 2) {
                rootItem.list.forEach((item, index) => {
                    item.activeIndex = 0;
                });
            }
        });
        //console.log(list);
        this.setState({
            choiseList: list,
        });
    }
    marskComponent(that) {
        //console.log(that.state.hideMarsk);
        if (that.state.hideMarsk) {
            return null;
        } else {
            return (
                <View>
                    <TouchableHighlight
                        underlayColor="rgba(255,255,255,0.3)"
                        onPress={() => {
                            that.marskClickHandle();
                        }}
                        style={{height: '100%', width: '100%',}}>
                        <View
                            style={{
                                height: '100%',
                                width: '100%',
                            }}>
                            <Text>777</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            );
        }
    }

    searchFunc (params) {
        let reset = {...this.props.that.requestParam, pageIndex: 1}
        this.props.that.setState({
            requestParam: reset
        }, () => {
            this.props.getData(this.props.that, params)
        })
        
    }

    buttonComponent(that) {
        if (this.state.currentNavIndex == 3) {
            return (
                <View style={styles.bottomBtns}>
                    <Button
                        title="重置"
                        onPress={() => {
                            that.resetHandle();
                        }}
                        buttonStyle={styles.resetBtn}
                        titleStyle={{color: '#333333'}}
                    />
                    <Button
                        title="确定"
                        onPress={() => { this.searchFunc(this.props.that,{name:'万科'}) } }
                        buttonStyle={styles.confirmtBtn}
                    />
                </View>
            );
        } else {
        }
    }
    marskClickHandle() {
        //console.log('handle');
        this.navClickHandle(this.state.currentNavIndex);
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1], //输入值
            outputRange: this.range, //输出值
        });
        const navList = this.getNav();
        const currentList = this.getCurrentList();

        const opacity = this.opacityValue.interpolate({
            inputRange: [0, 1], //输入值
            outputRange: this.opacityRange, //输出值
        });

        //console.log(this.props)

        return (
            <View style={{ position: 'relative', width: pt(375-20), height: pt(46), }}>
                <View style={styles.navWrapper}>
                    {navList.map((item, index) => {
                        return (
                            <TouchableHighlight
                                underlayColor="rgba(255,255,255,0.3)"
                                onPress={() => {
                                    this.navClickHandle(index);
                                }}
                                key={index}>
                                <View style={{ flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
                                    <Text style={[styles.navWrapperText,{ color: (item.selected && item.selected !=item.title)? '#F04531' : '#333333' }]}>
                                        {item.selected || item.title}
                                    </Text>
                                    <Svg
                                        name={ (item.selected && item.selected !=item.title)? 'iconxiala_active' : 'iconxiala' }
                                        width={pt(24)}
                                        height={pt(12)}>
                                    </Svg>
                                </View>
                            </TouchableHighlight>
                        );
                    })}
                </View>
                <Animated.View
                    style={[
                        styles.animate,
                        {height: spin,},
                    ]}>
                    <View style={styles.selectArea}>
                        <ScrollView>
                            <View style={styles.selectContent}>
                                {currentList.map((item, index) => {
                                    return this.showWhich(this, item, index);
                                })}
                                {this.buttonComponent(this)}
                            </View>
                        </ScrollView>
                    </View>
                </Animated.View>
                <Animated.View
                    style={[
                        styles.marsk,
                        {opacity: opacity, height: screenHeight,zIndex: this.state.zIndex },
                    ]}>
                    {this.marskComponent(this)}
                </Animated.View>

                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomColor: 'rgba(249,249,249,1)',
        borderBottomWidth: pt(1),
        backgroundColor: '#fff',
        width: '100%',
        // backgroundColor: 'red',
    },
    navWrapperText: {
        fontSize: pt(14),
        lineHeight: pt(44),
        fontWeight: 'bold',
        paddingLeft: pt(10),
        marginRight: pt(-6)
    },
    animate: {
        zIndex: 100,
    },
    selectArea: {
        height: '100%',
        width: '100%',
        backgroundColor: 'pink',
        position: 'absolute',
        zIndex: 100
    },
    selectContent: {
        paddingLeft: pt(20),
        paddingRight: pt(20),
    },
    selectText: {
        lineHeight: pt(40),
        fontSize: pt(14),
        color: '#333333',
    },
    listWrapper: {
        marginTop: pt(16),
    },
    listTitle: {
        fontSize: pt(16),
        color: '#101D37',
        fontWeight: 'bold',
    },
    listContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: pt(5),
    },
    contentItem: {
        fontSize: pt(12),
        color: '#333333',
        backgroundColor: 'rgba(249,249,249,1)',
        marginBottom: pt(15),
        borderRadius: pt(4),
        paddingRight: pt(0),
        paddingLeft: pt(0),
        lineHeight: pt(32),
        height: pt(32),
        color: '#F04531',
        width: pt(100),
        alignItems: 'center',
        justifyContent: 'center',
    },
    active: {
        borderWidth: pt(1),
        borderColor: '#F04531',
    },
    activeColor: {
        color: '#F04531',
    },
    bottomBtns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: pt(10),
    },
    resetBtn: {
        width: pt(150),
        height: pt(40),
        backgroundColor: '#F9F9F9',
    },
    confirmtBtn: {
        width: pt(150),
        height: pt(40),
        backgroundColor: '#F04531',
    },
    marsk: {
        width: pt(375),
        backgroundColor: 'rgba(0,0,0,.1)',
        position: 'absolute',
        top: pt(46),
        width: '100%',
    },
    activeColor: {
        color: '#F04531'
    }
});

export default Select
