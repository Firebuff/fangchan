import React, { Component } from 'react';
import { View, Text} from 'react-native'
import SvgUri from 'react-native-svg-uri';
import getSvg from '../../static/svg';

class Svg extends Component {

    constructor(props) {
        super(props)
    }
   
    render () {
        //console.log(this.props)
        let { width, height, name } = this.props
        return (
            <SvgUri width={ width } height={ height } svgXmlData={ getSvg(name) } />
        );
    }
};

export default Svg
