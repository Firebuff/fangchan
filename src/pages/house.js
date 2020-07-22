import React, {Component} from 'react';

import {View, Text, FlatList} from 'react-native';

import {getHouseList} from '../api';

import HouseList from '../components/house/list';

// 设置border-shadow的组件
import {Card} from 'react-native-shadow-cards';

import pt from '../utils/px2dp/Px2dp';

import Loaing from '../components/loading';

import Selects from '../components/select/index';

import { loadHouseList, clearAll } from '../redux/actions'

import { connect } from 'react-redux'




class House extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            requestParam: {
                pageIndex: 1,
            },
            loadMore: true,
            refreshing: false,
        };
    }
    componentDidMount() {
        this.getData()
    }

    getData (refresh) {
        let state =  this.props.houseListData
        let params = {
            requestParams: state.requestParams,
            isMore: state.isMore, // 是否还有更多数据
            refresh: refresh,
            currentPageIndex: state.requestParams.pageIndex //当前页面
        }
        this.props.loadHouseList(params)
    }

    loadMore () {
        this.getData(false)
    }


    refresh() {
        this.getData(true)
    }

    renderItem(item) {
        return <HouseList {...item.item} key={ item.id }></HouseList>;
    }

    render() {
        console.log(this.props)
        let list = this.props.houseListData.list
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
                        {/*<Selects that = {this} getData = {this.getData}></Selects>*/}

                        <FlatList
                            style={{
                                width: '100%',
                                height: '100%',
                                paddingLeft: pt(15),
                                paddingRight: pt(15),
                            }}
                            data={list}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReachedThreshold={0.01}
                            onEndReached={() => {
                                this.loadMore()
                            }}
                            numColumns={1}
                            refreshing={this.state.refreshing}
                            initialNumToRender={5}
                            //ListEmptyComponent = { () => { return <Text>77</Text>} }
                            progressViewOffset={10}
                            ListFooterComponent={
                                <Loaing finished={this.state.loadMore}></Loaing>
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



export default  connect((state) => ({houseListData: state.houseListData}), {loadHouseList}) (House)         
