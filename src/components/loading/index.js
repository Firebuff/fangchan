import React, { Component } from 'react'

import { View, Text, Image } from 'react-native'

import LoadingImg from './loading'

class Loading extends Component {
    constructor (props) {
        super(props)
    }

    render () {

        let img = <Image
            source={require('../../static/images/img/loading.gif')}
            style={{alignSelf: 'center'}}
        />
        let k = this.props.finished?  img : <Text style={{ alignSelf: 'center'}}>没有更多了</Text>
        
        return k
    }
}

export default Loading