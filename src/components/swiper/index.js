import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import pt from '../../utils/px2dp/Px2dp';
import Swiper from 'react-native-swiper';

import Video from 'react-native-video';

class Swipers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'picture',
            list: [],
            buttonList: [],
        };
    }

    componentDidMount() {
        let buttonList = [];
        let current;
        let list = [];
        if (this.props.videoList && this.props.videoList.length) {
            buttonList.push({
                name: '视频',
                mark: 'video',
            });
        }
        if (this.props.VRList && this.props.VRList.length) {
            buttonList.push({
                name: '全景',
                mark: 'VR',
            });
        }
        if (this.props.pictureList && this.props.pictureList.length) {
            buttonList.push({
                name: '图片',
                mark: 'picture',
            });
        }

        // 如果列表无数据，不显示切换按钮
        if (!buttonList.length) {
            return 
        }
        current = buttonList[buttonList.length - 1].mark;

        list = this.props[`${current}List`];

        if (buttonList.length == 1) {
            buttonList = [];
        }

        this.setState({
            list,
            buttonList,
            current,
        });
    }
    renderPagination(index, total, context) {
        return (
            <View style={styles.paginationStyle}>
                <Text style={{color: '#fff', fontSize: pt(12)}}>
                    <Text style={styles.paginationText}>{index + 1}</Text>/
                    {total}
                </Text>
            </View>
        );
    }
    showWhich() {
        // 如果列表无数据，不显示swiper
        if (!this.state.list.length) return null
        if (this.state.current == 'picture') {
            return (
                <Swiper
                    style={styles.wrapper}
                    showsButtons={false}
                    height={pt(250)}
                    renderPagination={this.renderPagination}>
                    {this.state.list.map((item, index) => {
                        return (
                            <View style={{alignSelf: 'center'}} key={index}>
                                <Image
                                    style={{
                                        height: '100%',
                                        width: pt(375),
                                        zIndex: 100,
                                    }}
                                    source={{uri: item.thumb}}
                                />
                            </View>
                        );
                    })}
                </Swiper>
            );
        } else if (this.state.current == 'VR') {
            return (
                <Swiper
                    style={styles.wrapper}
                    showsButtons={false}
                    height={pt(250)}
                    renderPagination={this.renderPagination}>
                    {this.state.list.map((item, index) => {
                        return (
                            <View style={{alignSelf: 'center'}} key={index}>
                                <Text>VR</Text>
                            </View>
                        );
                    })}
                </Swiper>
            );
        } else {
            return (
                <Swiper
                    style={styles.wrapper}
                    showsButtons={false}
                    height={pt(250)}
                    renderPagination={this.renderPagination}>
                    {this.state.list.map((item, index) => {
                        return (
                            //<View style={{alignSelf: 'center'}} key={index}>
                            //    <Text>video</Text>
                            //</View>
                            <Video
                                source={{uri: item.src}} // Can be a URL or a local file.
                                ref={(ref) => {
                                    this.player = ref;
                                }} // Store reference
                                onBuffer={this.onBuffer} // Callback when remote video is buffering
                                onError={this.videoError} // Callback when video cannot be loaded
                                style={styles.backgroundVideo}
                                key={index}
                            />
                        );
                    })}
                </Swiper>
            );
        }
    }
    changeList(item) {
        let list = this.props[`${item.mark}List`]
        this.setState({
            current: item.mark,
            list: list
        });
    }

    onBuffer (res) {
        console.log(res)
    }
    render() {
        let buttonList = [
            {
                name: '视频',
                mark: 'video',
            },
            {
                name: '全景',
                mark: 'VR',
            },
            {
                name: '图片',
                mark: 'picture',
            },
        ];
        return (
            <View style={{height: pt(250)}}>
                {this.showWhich.bind(this)()}
                <View style={styles.buttonWrapper}>
                    {this.state.buttonList.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={item.mark}
                                onPress={() => {
                                   this.changeList(item)
                                }}>
                                <Text
                                    style={[
                                        styles.controlButton,
                                        this.state.current == item.mark
                                            ? styles.controlButtonActive
                                            : '',
                                    ]}>
                                    {item.name}
                                </Text>
                            </TouchableWithoutFeedback>
                        );
                    })}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        height: 500,
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    controlButton: {
        paddingLeft: pt(8),
        paddingRight: pt(8),
        paddingTop: pt(1),
        paddingBottom: pt(1),
        backgroundColor: '#fff',
        color: '#101D37',
        borderRadius: pt(15),
        marginRight: pt(10),
    },
    controlButtonActive: {
        color: '#fff',
        backgroundColor: '#F04531',
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: pt(10),
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    paginationStyle: {
        position: 'absolute',
        bottom: pt(10),
        right: pt(15),
        paddingLeft: pt(8),
        paddingRight: pt(8),
        paddingTop: pt(1),
        paddingBottom: pt(1),
        backgroundColor: 'background:rgba(0,0,0,0.2)',
        borderRadius: pt(15),
    },
    paginationText: {
        color: '#F04531',
        fontSize: pt(12),
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: pt(250),
      },
});
export default Swipers;
