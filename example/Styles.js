import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  open: {
    textAlign: 'center',
    marginTop: 64
  },
  modalText: {
    color: '#FFF'
  },
  modalCancelButton: {
    borderRadius: 32,
    height: 40,
    backgroundColor: '#243347',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bar: {
    width: 16,
    borderBottomWidth: 4,
    borderColor: '#FFFFFF44'
  },
  leftBar: {
    borderRadius: 16,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  rightBar: {
    borderRadius: 16,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  SemiModal: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    paddingTop: 8,
    backgroundColor: '#151F2B'
  },
  modalInner: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 24,
    justifyContent: 'center'
  }
});

export default styles;
