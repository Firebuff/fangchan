import global from './global'
import pt from './Px2dp'

import { PixelRatio } from 'react-native'

let pixrat = PixelRatio.get()

const setFont = (size) => {
    return pt(size) * pixrat
}


export default setFont
