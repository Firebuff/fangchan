import React, {Component} from 'react';

import {View, Text, FlatList} from 'react-native';

import { getHouseList } from '../api';

import HouseList from '../components/house/list';

// 设置border-shadow的组件
import {Card} from 'react-native-shadow-cards';

import pt from '../utils/px2dp/Px2dp';

import Loaing from '../components/loading';

import Selects from '../components/select/index';

import { setMoreHouseList, setPageIndex, setIsMore, clearAll, setQuestParam } from '../redux/actions'

import { connect } from 'react-redux'

class House extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
        };
    }
    componentDidMount() {
        this.getData()
    }
    getData (params) {
        let state = this.props.houseListData
        let dispatch =  this.props.dispatch
        if (!state.isMore) {
            return
        }
        getHouseList(state.requestParams).then ((res) => {
            console.log(res)
            this.setState({
                refreshing: false
            })
            if (res.status == 1) {
                dispatch(setMoreHouseList(res.data))
                if (state.requestParams.pageIndex != res.pageAllIndex) {
                    let newPage = state.requestParams.pageIndex + 1
                    dispatch(setPageIndex(newPage))
                } else {
                    dispatch(setIsMore(false))
                }
                
            }
       })
    }
    loadMore () {
        this.getData()
    }
    refresh(params = null) {
        this.setState({
            refreshing: true
        })
        let dispatch =  this.props.dispatch
        dispatch(clearAll())

        console.log(params)
        if (params) {
            dispatch(setQuestParam(params))
        }
        setTimeout( () => {
            //console.log(this.props.houseListData)
            this.getData()
        },300)
        
    }
    renderItem(item) {
        return <HouseList {...item.item} key={ item.id }></HouseList>;
    }

    render() {
        let state = this.props.houseListData
        return (
            <View style={{height: '100%'}}>
                <View
                    style={{
                        alignSelf: 'center',
                        width: pt(375 - 20),
                        height: '100%',
                    }}>
                    <Card
                        cornerRadiuts={pt(4)}
                        elevation={1}
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            height: '98%',
                            paddingTop: 10,
                            marginTop: pt(5),
                            position: 'absolute',
                            zIndex: 5,
                            top: 0,
                        }}>
                        <Selects that = {this} getData = {this.refresh.bind(this)}></Selects>

                        <FlatList
                            style={{
                                width: '100%',
                                height: '100%',
                                paddingLeft: pt(15),
                                paddingRight: pt(15),
                            }}
                            data={ state.list }
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReachedThreshold={0.01}
                            onEndReached={() => {
                                this.loadMore()
                            }}
                            numColumns={1}
                            refreshing={this.state.refreshing}
                            initialNumToRender={5}
                            ListEmptyComponent = { this.state.refreshing? null : <Text>暂无数据</Text> }
                            progressViewOffset={10}
                            ListFooterComponent={
                                state.requestParams.pageIndex ==1? null : <Loaing finished={state.isMore}></Loaing>
                            }
                            onRefresh={() => {
                                this.refresh();
                            }}
                        />
                    </Card>
                </View>
            </View>
        );
    }
}

export default  connect((state) => ({houseListData: state.houseListData})) (House)         
