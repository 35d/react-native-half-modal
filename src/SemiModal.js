// @flow

import React, { Component } from 'react';
import {
  YellowBox,
  PanResponder,
  View,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';

type Props = {
  children: any,
  isVisible: boolean,
  onModalClose: Function,
  style?: Object,
};

type State = {
  modalPan: Animated,
  modalBgPan: Animated,
};

const MODAL_HEIGHT = 270; // TODO 明示的に書かなくても良いようにする
const MODAL_CLOSE_THRESHOLD = -40; // 閾値(40px下に動かしたら閉じる)
const MODAL_BG_OPEN_DURATION = 50;
const MODAL_BG_CLOSE_DURATION = 50;

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: '100%',
    top: Dimensions.get('window').height - MODAL_HEIGHT, // 初期位置
    borderRadius: 16,
  },
  modalBackground: {
    position: 'absolute',
    backgroundColor: '#00000066',
    top: 0,
    left: 0,
    height: Dimensions.get('window').height,
    width: '100%',
  },
});

export default class SemiModal extends Component<Props, State> {
  modalRef: View;
  panResponder: PanResponder;

  static defaultProps = {
    style: {},
  };

  constructor(props: Props) {
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

    super(props);
    this.state = {
      modalPan: new Animated.ValueXY(0),
      modalBgPan: new Animated.ValueXY(0),
    };
    this.state.modalPan.setValue({ x: 0, y: MODAL_HEIGHT * 2 });
    this.state.modalBgPan.setValue({ x: 0, y: Dimensions.get('window').height });

    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        this.state.modalPan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: Animated.event([
        null,
        {
          dy: this.state.modalPan.y,
        },
      ]),

      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.y0 - gestureState.moveY < MODAL_CLOSE_THRESHOLD) {
          this.modalClose();
        } else {
          this.modalOpen();
        }
      },
    });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.isVisible === false && this.props.isVisible === true) {
      this.modalOpen();
    }
  }

  modalOpen = () => {
    if (this.modalRef) {
      setTimeout(() => {
        this.modalRef.measure((x, y, dx, dy) => {
          console.log(x);
          console.log(y);
          console.log(dx);
          console.log(dy);
        });
      }, 2000);
    }

    Animated.parallel([
      Animated.spring(this.state.modalPan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
      }),
      Animated.timing(this.state.modalBgPan, {
        toValue: { x: 0, y: 0 },
        duration: MODAL_BG_OPEN_DURATION,
        useNativeDriver: true,
      }),
    ]).start();
  };

  modalClose = () => {
    Animated.parallel([
      Animated.spring(this.state.modalPan, {
        toValue: { x: 0, y: MODAL_HEIGHT * 2 },
        useNativeDriver: true,
        duration: 0,
      }),
      Animated.timing(this.state.modalBgPan, {
        toValue: { x: 0, y: Dimensions.get('window').height },
        duration: MODAL_BG_CLOSE_DURATION,
        useNativeDriver: true,
        delay: 150, // After modal animation
      }),
    ]).start(() => {
      this.props.onModalClose();
    });
  };

  render() {
    return (
      <Animated.View
        style={[
          styles.modalBackground,
          { transform: this.state.modalBgPan.getTranslateTransform() },
        ]}
      >
        <TouchableWithoutFeedback onPress={() => this.modalClose()}>
          <View style={{ height: '100%' }} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.modal,
            { transform: this.state.modalPan.getTranslateTransform() },
            this.props.style,
          ]}
          {...this.panResponder.panHandlers}
        >
          <View
            ref={refs => {
              this.modalRef = refs;
            }}
          >
            {this.props.children}
          </View>
        </Animated.View>
      </Animated.View>
    );
  }
}
