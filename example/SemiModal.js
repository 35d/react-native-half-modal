// @flow

import React, { Component } from 'react';
import { YellowBox, PanResponder, View, TouchableWithoutFeedback, Animated, Dimensions, StyleSheet, Platform } from 'react-native';

type Props = {
  children: any,
  isVisible: boolean,
  onModalClose: Function,
  style: Object,
  closeThreshold: number,
  backgroundColor: string,
  disableTopScroll?: boolean
};

type State = {
  modalPan: Animated,
  modalBgPan: Animated,
  modalHeight: number
};

type GestureState = {
  y0: number,
  moveY: number
};

const MODAL_BG_OPEN_DURATION = 50;
const MODAL_BG_CLOSE_DURATION = 50;

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    borderRadius: 16
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  }
});

export default class SemiModal extends Component<Props, State> {
  modalRef: View;
  panResponder: PanResponder;

  static defaultProps = {
    style: {},
    closeThreshold: 40,
    backgroundColor: '#00000000',
    disableTopScroll: false
  };

  constructor(props: Props) {
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

    super(props);
    this.state = {
      modalPan: new Animated.ValueXY(0),
      modalBgPan: new Animated.ValueXY(0),
      modalHeight: 0
    };
    this.state.modalPan.setValue({ x: 0, y: Dimensions.get('window').height });
    this.state.modalBgPan.setValue({ x: 0, y: Dimensions.get('window').height });

    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => {
        return true;
      },

      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return gestureState.dy !== 0;
      },

      onPanResponderGrant: (e, gestureState) => {
        this.state.modalPan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: (e, gestureState: GestureState) => {
        if (gestureState.dy < 0 && this.props.disableTopScroll) {
          return;
        }
        // TODO(35d): android scroll
        if (Platform.OS === 'ios') {
          this.state.modalPan.setValue({ y: gestureState.dy });
        }
      },

      onPanResponderRelease: (e, gestureState: GestureState) => {
        if (gestureState.moveY - gestureState.y0 > this.props.closeThreshold) {
          this.props.onModalClose();
        } else {
          this.modalOpenAnimation();
        }
      }
    });
  }

  componentDidMount() {
    if (this.modalRef) {
      setTimeout(() => {
        this.modalRef.measure((x, y, width, height) => {
          this.setState({ modalHeight: height });
        });
      }, 1000);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.isVisible === false && this.props.isVisible === true) {
      this.modalOpenAnimation();
    }
    if (prevProps.isVisible === true && this.props.isVisible === false) {
      this.modalCloseAnimation();
    }
  }

  modalOpenAnimation = () => {
    Animated.parallel([
      Animated.spring(this.state.modalPan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true
      }),
      Animated.timing(this.state.modalBgPan, {
        toValue: { x: 0, y: 0 },
        duration: MODAL_BG_OPEN_DURATION,
        useNativeDriver: true
      })
    ]).start();
  };

  modalCloseAnimation = () => {
    Animated.parallel([
      Animated.spring(this.state.modalPan, {
        toValue: { x: 0, y: Dimensions.get('window').height },
        useNativeDriver: true
      }),
      Animated.timing(this.state.modalBgPan, {
        toValue: { x: 0, y: Dimensions.get('window').height },
        duration: MODAL_BG_CLOSE_DURATION,
        useNativeDriver: true,
        delay: 150
      })
    ]).start(() => {});
  };

  render() {
    return (
      <Animated.View style={[styles.modalBackground, { transform: this.state.modalBgPan.getTranslateTransform() }, { backgroundColor: this.props.backgroundColor }, { justifyContent: 'flex-end' }]}>
        <TouchableWithoutFeedback style={[styles.modalBackground, { transform: this.state.modalBgPan.getTranslateTransform() }, { backgroundColor: this.props.backgroundColor }]} onPress={() => this.props.onModalClose()}>
          <View style={{ height: Dimensions.get('window').height }} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.modal, { transform: this.state.modalPan.getTranslateTransform() }, this.props.style]} {...this.panResponder.panHandlers}>
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
