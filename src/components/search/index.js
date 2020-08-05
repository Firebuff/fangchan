import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
// 设置border-shadow的组件
import {Card} from 'react-native-shadow-cards';

import {Input} from 'react-native-elements';

import pt from '../../utils/px2dp/Px2dp';

import Svg from '../svg';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearchBtn: false,
            value: ''
        };
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <Card
                    cornerRadiuts={pt(4)}
                    elevation={1}
                    style={{height: pt(36), flex: 1}}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder={'请输入楼盘名称或关键词'}
                            placeholderTextColor={'#CCCCCC'}
                            editable={true}
                            selectionColor={'red'}
                            onChangeText={(res) => {
                                console.log(res);
                                this.setState({
                                    value: res
                                })
                            }}
                            onFocus= { () => {
                                this.setState({
                                    showSearchBtn: true
                                })
                            }}
                            onEndEditing= { () => {
                                if(!this.state.value) {
                                    this.setState({
                                        showSearchBtn: false
                                    })
                                }
                            }}
                        ></TextInput>
                        <View style={styles.svg}>
                            <Svg
                                name={'iconsearch'}
                                height={pt(20)}
                                width={pt(18)}></Svg>
                        </View>
                    </View>
                </Card>
                {
                    this.state.showSearchBtn?  <View style={styles.searchBtn}>
                        <TouchableOpacity
                            onPress= {
                                () => {
                                    //if (!this.state.value) return
                                    this.props.searchByKeyWord(this.state.value)
                                }
                            }
                        >
                            <Text style={{color:'#F04531'}}>搜索</Text>
                        </TouchableOpacity>
                    </View> : null
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        paddingLeft: pt(10),
        paddingRight: pt(10),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: pt(5),
        marginBottom: pt(5),
    },
    svg: {
        lineHeight: pt(36),
        justifyContent: 'center',
        position: 'absolute',
        right: pt(15),
        top: pt(8),
    },
    inputWrapper: {
        backgroundColor: '#F9F9F9',
        flex: 1,
        height: pt(36),
        paddingLeft: pt(15),
        borderRadius: pt(4),
        paddingRight: pt(39),
        borderColor: '#F04531',
        borderWidth: pt(0)
    },
    searchBtn: {
        flexDirection: 'column', 
        justifyContent: 'center',
        paddingLeft: pt(12),
        paddingRight:pt(12)
    }
});

export default Search;
