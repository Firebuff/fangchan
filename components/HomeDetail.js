import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

const HomeDetail = function({ navigation, route }) {

    let name = route.params.name //路由传递过来的数据

    console.log(route)
    return (
        <View style={{alignItems:'center', flex: 1, justifyContent: 'center'}}>
			<Text>Home Detail</Text>
			<View style={{marginTop: 10}}>
				<Button
					title="回到首页"
					onPress={ () => {
						navigation.goBack('Home')
					}}
				></Button>
			</View>
			<View style={{marginTop: 10}}>
				<Text>{name}</Text>
			</View>
		</View>
    )
}

export default HomeDetail