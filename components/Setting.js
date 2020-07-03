import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

const Setting = function ({navigation, route}) {
	return (
		<View style={{alignItems:'center', flex: 1, justifyContent: 'center'}}>
			<Text>Setting</Text>
			<View style={{marginTop: 10}}>
				<Button
					title="去详情页"
					onPress={ () => {
						navigation.navigate('SettingDetail', {name: 'hello'}) 
					}}
				></Button>
			</View>
		</View>
	)
}

export default Setting