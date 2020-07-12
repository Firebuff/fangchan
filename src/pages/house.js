import React, {Component} from 'react';

import {View, Text, FlatList} from 'react-native';

import {getHouseList} from '../api';

import HouseList from '../components/house/list';

// 设置border-shadow的组件
import {Card} from 'react-native-shadow-cards';

import pt from '../utils/px2dp/Px2dp';

import Loaing from '../components/loading';

class House extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            requestParam: {
                pageIndex: 1,
            },
            loadMore: true

        };
    }
    componentDidMount() {
        this.getData();
    }

    getData() {
        if (!this.state.loadMore) return
        getHouseList(this.state.requestParam.pageIndex).then((res) => {
            console.log(res)
            if (res.status == 1) {

                let newPageIndex;

                let loadMore = true

                if (this.state.requestParam.pageIndex != res.pageAllIndex) {
                    // 设置请求页数 + 1，下次请求的页数
                    newPageIndex = this.state.requestParam.pageIndex + 1;
                } else {
                    newPageIndex = this.state.requestParam.pageIndex

                    loadMore = false
                }


                let param = {
                    ...this.state.requestParam,
                    pageIndex: newPageIndex,
                };


                let listData = [...this.state.listData, ...res.data];

                this.setState({
                    requestParam: param,
                    listData: listData,
                    loadMore: loadMore
                });
            }
        });
    }

    renderItem(item) {
        return <HouseList {...item.item}></HouseList>;
    }

    render() {
        return (
            <View style={{ alignSelf: 'center',width: pt(375-20), marginBottom: pt(15),marginTop: pt(10)}}>
                 <Loaing></Loaing>
                {/* <Card
                    cornerRadius={pt(4)}
                    elevation={1}
                    style={{width: '100%', alignItems: 'center',paddingBottom: pt(15)}}>
                    <FlatList
						style={{width: '100%', paddingLeft: pt(15),paddingRight: pt(15),}}
                        data={this.state.listData}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                        onEndReachedThreshold={0.01}
                        onEndReached={() => {
                            this.getData();
                        }}
                        numColumns = { 1 }
                        refreshing = { true }
                        initialNumToRender = { 5 }
                        ListEmptyComponent = { () => { return <Text>77</Text>} }
                        progressViewOffset={10}
                        ListFooterComponent={
                            <Text style={{textAlign: "center",marginBottom: 10}}>
                                { this.state.loadMore? '正在加载更多' : '到底了'}
                            </Text>
                        }
                    />
                </Card> */}
               
            </View>
        );
    }
}

export default House;
