import React, { Component } from 'react'

import { View, Text } from 'react-native'

import { getHouseList }  from '../api'

class House extends Component {
	constructor (props) {
		super(props)
		this.state = {

		}
	}
	componentDidMount () {
		console.log(777)
		getHouseList()
	}

	render () {
		return (
			<View>
				<Text></Text>
			</View>
		)
	}
}


export default House