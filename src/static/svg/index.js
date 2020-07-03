import k from './svgs.js'

const getSvg = name => {
    for(let key in k) {

        if (key == name) {
            return k[key]
        }
    }
}


export default getSvg