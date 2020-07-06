import React from 'react'
import{ View, Text } from 'react-native'

const Test = function (props) {
    
    return (
        <View>
            <Text>hh</Text>
            
                { props.children }
           
        </View>
    )
}

export default Test