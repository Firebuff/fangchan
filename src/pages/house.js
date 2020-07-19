import React, {Component} from 'react';

import {View, Text, FlatList} from 'react-native';

import {getHouseList} from '../api';

import HouseList from '../components/house/list';

// 设置border-shadow的组件
import {Card} from 'react-native-shadow-cards';

import pt from '../utils/px2dp/Px2dp';

import Loaing from '../components/loading';

import Selects from '../components/select/index';

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
        this.getData(this);
    }

    getData(that, params) {

        let questParams = {...that.state.requestParam, ...params}
        if (!that.state.loadMore) return;
        getHouseList(questParams).then((res) => {
            console.log(res);
            if (res.status == 1) {
                let newPageIndex;

                let loadMore = true;

                if (that.state.requestParam.pageIndex != res.pageAllIndex) {
                    // 设置请求页数 + 1，下次请求的页数
                    newPageIndex = that.state.requestParam.pageIndex + 1;
                } else {
                    newPageIndex = that.state.requestParam.pageIndex;

                    loadMore = false;
                }

                let param = {
                    ...that.state.requestParam,
                    pageIndex: newPageIndex,
                };

                let listData = [...that.state.listData, ...res.data];

                that.setState({
                    requestParam: param,
                    listData: listData,
                    loadMore: loadMore,
                    refreshing: false,
                });
            }
        });
    }

    refresh() {
        let requestParam = {...this.state.requestParam, pageIndex: 1};
        this.setState(
            {
                refreshing: true,
                listData: [],
                requestParam,
                loadMore: true,
            },
            () => {
                this.getData(this);
            },
        );
    }

    renderItem(item) {
        return <HouseList {...item.item}></HouseList>;
    }

    render() {
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
                        <Selects that = {this} getData = {this.getData}></Selects>

                        <FlatList
                            style={{
                                width: '100%',
                                height: '100%',
                                paddingLeft: pt(15),
                                paddingRight: pt(15),
                            }}
                            data={this.state.listData}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index}
                            onEndReachedThreshold={0.01}
                            onEndReached={() => {
                                this.getData();
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

export default House;
