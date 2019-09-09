// @flow

import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import SemiModal from './SemiModal';
import styles from './Styles';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   open: {
//     textAlign: 'center',
//     marginTop: 64
//   },
//   modalText: {
//     color: '#FFF'
//   },
//   modalCancelButton: {
//     borderRadius: 32,
//     height: 40,
//     backgroundColor: '#243347',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   bar: {
//     width: 16,
//     borderBottomWidth: 4,
//     borderColor: '#FFFFFF44'
//   },
//   leftBar: {
//     borderRadius: 16,
//     borderTopRightRadius: 0,
//     borderBottomRightRadius: 0
//   },
//   rightBar: {
//     borderRadius: 16,
//     borderTopLeftRadius: 0,
//     borderBottomLeftRadius: 0
//   },
//   SemiModal: {
//     paddingVertical: 24,
//     paddingHorizontal: 24,
//     paddingTop: 8,
//     backgroundColor: '#151F2B'
//   },
//   modalInner: {
//     flex: 1,
//     flexDirection: 'row',
//     marginBottom: 24,
//     justifyContent: 'center'
//   }
// });

type State = {
  isVisible: boolean
};

type Props = {};

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  modalClose = () => {
    this.setState({ isVisible: false });
  };

  modalOpen = () => {
    this.setState({ isVisible: true });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ paddingVertical: 32 }}>
          <Text style={styles.open} onPress={this.modalOpen}>
            OPEN
          </Text>
        </View>
        <SemiModal isVisible={this.state.isVisible} onModalClose={this.modalClose} style={styles.SemiModal}>
          <View>
            <View style={styles.modalInner}>
              <View style={[styles.bar, styles.leftBar]} />
              <View style={[styles.bar, styles.rightBar]} />
            </View>
            <View style={{ marginBottom: 4 }}>
              <Text style={[styles.modalText, { marginBottom: 16 }]}>Remove</Text>
              <Text style={[styles.modalText, { marginBottom: 16 }]}>Mute</Text>
              <Text style={[styles.modalText, { marginBottom: 16 }]}>Block</Text>
              <Text style={[styles.modalText, { marginBottom: 16 }]}>Report</Text>
            </View>
            <TouchableOpacity onPress={this.modalClose} style={styles.modalCancelArea}>
              <View style={styles.modalCancelButton}>
                <Text style={[styles.modalText]}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SemiModal>
      </View>
    );
  }
}
