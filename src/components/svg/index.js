import React from 'react';
import { View, Text} from 'react-native'
import SvgUri from 'react-native-svg-uri';
import getSvg from '../../static/svg';

const Svg = function (props) {
    let { width, height, name } = props
    return (
        <SvgUri width={ width } height={ height } svgXmlData={ getSvg(name) } />
       
    );
};

export default Svg
