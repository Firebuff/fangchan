import global from './global'


// 设计图上的比例，宽度
// const basePx = Platform.OS === 'ios' ? 750 : 720;

const basePx = 750

const px2dp = function (px) {
    return (px / basePx) * global.SCREEN_WIDTH;
};


export default px2dp