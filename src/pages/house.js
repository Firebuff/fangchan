import React, {Component} from 'react';

import {View, Text, FlatList, DevSettings} from 'react-native';

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
        //  如果加载更多 isMore 为false，则不再请求数据
        if (!state.isMore) {
            return
        }
        getHouseList(state.requestParams).then ((res) => {
            // 关闭加载图标
            this.setState({
                refreshing: false
            })
            if (res.status == 1) {
                dispatch(setMoreHouseList(res.data))
                // 如果当前页数等于 总页数，将是否加载更多设置为 false，否则 pageIndex + 1
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
    refresh() {
        // 显示加载图标
        this.setState({
            refreshing: true
        })

        let dispatch =  this.props.dispatch

         // 将list数据设置为[]
        dispatch(clearAll())

        // 将是否加载更多设置为 true
        dispatch(setIsMore(true))

        setTimeout( () => {
            this.getData()
        },300)
    }

    searchHandle (params) {
        // 显示加载图标
        this.setState({
            refreshing: true
        })
        // reducer上面的数据
        let state = this.props.houseListData

        // 获取state上面的请求参数，将请求页数设置为1
        let requestParams = {...state.requestParams, ...params, pageIndex: 1 }

        // 清除为空的属性
        for(let key in requestParams) {
            if (!requestParams[key]) {
                delete requestParams[key]
            } 
        }

        let dispatch =  this.props.dispatch
        // 将list数据设置为[]
        dispatch(clearAll())
        // 设置请求参数
        dispatch(setQuestParam(requestParams))
        // 将是否加载更多设置为 true
        dispatch(setIsMore(true))

        // 由于更新 reducer 后 不能立即获取到上面的最新数据，所以用了延时 setTimeout
        setTimeout( () => {
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
                        <Selects that = {this} getData = {this.searchHandle.bind(this)}></Selects>

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
