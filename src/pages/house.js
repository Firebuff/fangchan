import React, {Component} from 'react';

import {View, Text, FlatList} from 'react-native';

import {getHouseList} from '../api';

import HouseList from '../components/house/list';

class House extends Component {
    constructor(props) {
        super(props);
        this.state = {
			listData: [],
			requestParam: {
				pageIndex: 1
			}
        };
    }
    componentDidMount () {
        this.getData()
	}

	getData () {
		getHouseList(this.state.requestParam.pageIndex).then((res) => {
			
            if (res.status == 1) {
				// 设置请求页数 + 1，下次请求的页数
				let newPageIndex = this.state.requestParam.pageIndex + 1
				let param = {...this.state.requestParam, pageIndex: newPageIndex }

				let listData = [...this.state.listData, ...res.data];
			
				this.setState({
					requestParam: param,
					listData: listData,
				}, () => {
					console.log(this.state)
				})
            }
        });
	}

	renderItem ( item ) {
		return (
			<HouseList {...item.item}></HouseList>
		) 
	}

    render() {
		
        return (
            <FlatList
                data={ this.state.listData }
                renderItem={ this.renderItem }
				keyExtractor={ (item) => item.id }
				onEndReachedThreshold={0.01}
				onEndReached = { () => {
					this.getData()
				}}
            />
        );
    }
}

export default House;
