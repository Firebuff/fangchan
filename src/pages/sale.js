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
    Alert
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
            currentList: [],
            currentNavIndex: 0,
            showThreeList: [],
            moreList: [],
            selectParams: {}
        };
        this.spinValue = new Animated.Value(0);
        this.height = 0;
        this.showThree;
    }

    spin = (index) => {
        this.setState({
            currentNavIndex: index
        })
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

    getCurrentList () {
        let currentList = []
        if (!this.state.choiseList.length) return []
        if (this.state.currentNavIndex != 3) {
            currentList = this.state.showThreeList[this.state.currentNavIndex].list
            //console.log(currentList)
        } else {
            currentList = this.state.moreList
        }
        //console.log(currentList)
        return currentList
    }
    
    componentDidMount () {
        getFilter('houses').then((res) => {
            console.log(res);
            let choiseList = [];
            let choiseNavList = [];
            for (let key in res.cate_opt) {
                let newArr = res.cate_opt[key].data;
                newArr.unshift({name: '不限', value: 0});
                newArr = newArr.map((item) => {
                    return {...item, key: key, activeIndex: 0}
                })
                choiseList.push({
                    title: res.cate_opt[key].title,
                    list: newArr,
                    selected: 0,
                    key: key
                });
            }
            console.log(choiseList)
            let threeList = choiseList.slice(0,3)
            console.log(moreList)
            let moreList = choiseList.slice(3)
            this.setState({
                choiseList: choiseList,
                showThreeList: threeList,
                moreList: moreList
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
                        title: '更多'
                    })
                }
            }
        });
        return navList;
    }

    itemSelecthandle (index, key, value) {
        let list = this.state.choiseList
        let selectParams = {}
        for (let i=0; i<list.length; i++) {
            if (list[i].key == key) {
                list[i].list = list[i].list.map( (item, itemIndex) => {
                    item.activeIndex = index
                    return item 
                })
                break;
            } 
        }
        selectParams = {...this.state.selectParams, [key]: value}
        console.log(selectParams)
        //console.log(list)

        this.setState({
            choiseList: list,
            selectParams: selectParams
        }, () => {
            
        })
    }

    showWhich (that, item, index) {
        if (this.state.currentNavIndex != 3) {
            return (
                <TouchableHighlight
                    underlayColor="rgba(0,0,0,0)"
                    onPress={() => {
                        that.itemSelecthandle(index, item.key, item.value)
                    }}
                >
                    <Text 
                        style={ [styles.selectText,{color: index == item.activeIndex? '#F04531' : '#333333' }] } 
                        key={ index }
                    >
                        { item.name }
                    </Text>

                </TouchableHighlight>
            )
        } else {
            return (
                <View style={ styles.listWrapper }>
                    <View>
                        <Text style={ styles.listTitle }>{ item.title }</Text>
                    </View>
                    <View style={ styles.listContent }>
                        {
                            item.list.map( (child, childIndex) => {
                                return (

                                    <TouchableHighlight key={ childIndex }
                                        underlayColor="rgba(0,0,0,0)"
                                        onPress={ () => {
                                            this.itemSelecthandle(childIndex,child.key, child.value)
                                        }}
                                    >
                                        <View
                                            style={ 
                                                [
                                                    styles.contentItem, 
                                                    (childIndex == child.activeIndex? styles.active : ''),
                                                    { marginRight: index%5 == 0? pt(5): 0}
                                                ] 
                                            }
                                        >
                                            <Text  
                                                style={childIndex == child.activeIndex? styles.activeColor : ''}
                                            >
                                                { child.name }
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                    
                                )
                            })
                        }
                    </View>
                </View>
            )
        }
    }

    resetHandle () {
        console.log(88)
        let list = this.state.choiseList
        list.forEach((rootItem, rootIndex) =>{
            if (rootIndex > 2) {
                rootItem.list.forEach( (item,index) => {
                    item.activeIndex = 0
                })
            }
        })
        console.log(list)
        this.setState({
            choiseList: list
        })
    }

    buttonComponent (that) {
        if (this.state.currentNavIndex == 3) {
            return (
                <View style={ styles.bottomBtns }>
                    <Button
                        title="重置"
                        onPress={() => { that.resetHandle() }}
                        buttonStyle={ styles.resetBtn }
                        titleStyle={{color: '#333333'}}
                    />
                    <Button
                        title="确定"
                        onPress={() => Alert.alert('Simple Button pressed')}
                        buttonStyle={ styles.confirmtBtn }
                    />
                 </View>
            )
        } else {
            return null
        }
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1], //输入值
            outputRange: [0, pt(254)], //输出值
        });
        const navList = this.getNav()
        const currentList = this.getCurrentList()

        
        return (
            <View>
                <View style={styles.navWrapper}>
                    {navList.map((item, index) => {
                        return (
                            <TouchableHighlight
                                underlayColor="rgba(255,255,255,0.3)"
                                onPress={() => {
                                    this.spin(index)
                                }}
                                key={index}>
                                <Text style={ styles.navWrapperText }>{item.title}</Text>
                            </TouchableHighlight>
                        );
                    })}
                </View>
                <Animated.View style={[styles.animate, {height: spin}]}>
                        <View style={styles.selectArea}>
                            <ScrollView>
                                <View style={ styles.selectContent }>
                                    {
                                        currentList.map((item, index) => {
                                            return (
                                                this.showWhich(this,item, index)
                                            )
                                        })
                                    }
                                    {
                                        this.buttonComponent(this)
                                    }
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
        borderBottomColor: 'rgba(249,249,249,1)',
        borderBottomWidth: pt(1)
    },
    navWrapperText: {
        fontSize: pt(14), 
        lineHeight: pt(44),
        fontWeight: 'bold',
        paddingLeft: pt(10),
        paddingRight: pt(10),
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
    selectContent: {
        paddingLeft: pt(20), 
        paddingRight: pt(20), 
    },
    selectText: {
        lineHeight: pt(40), 
        fontSize: pt(14),
        color: '#333333'
    },
    listWrapper: {
        marginTop: pt(16)
    },
    listTitle: {
        fontSize: pt(16),
        color: '#101D37',
        fontWeight: 'bold'
    },
    listContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: pt(5)
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
        justifyContent: 'center'
        
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
        justifyContent: "space-between",
        marginBottom: pt(10)
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
    }
});

export default Sale;
