# react-native-half-modal

![react-native-half-modal](https://github.com/nikke1925/react-native-half-modal/blob/master/half-modal.gif)

# Usage
__1. Install__  
This library is available on npm.
```
npm install --save react-native-half-modal
```

__2. Import react-native-half-modal__
```
import { SemiModal } from 'react-native-half-modal';
```

__3. Create a half-modal and nest its content inside of it__
```
<SemiModal>
  <View style={{ flex: 1 }}>
    <Text>I am the half-modal content</Text>
  </View>
</SemiModal>
```

__4. add required props (isVisible and onModalClose)__
```
<SemiModal
  isVisible={this.state.isVisible}
  onModalClose={() => {
    this.setState({ isVisible: false });
  }}
>
  <View style={{ flex: 1 }}>
    <Text>I am the half-modal content</Text>
  </View>
</SemiModal>
```

For a more complex example take a look at the `./example/App.js`

# Props

| Name           | Type     | Default      | Description                                                     |
| -------------- | -------- | ------------ | --------------------------------------------------------------- |
| children       | node     | **REQUIRED** | The modal content                                               |
| isVisible      | bool     | **REQUIRED** | Show the modal?                                                 |
| onModalClose   | Function | **REQUIRED** | Called when the modal is hidden (usually isVisible flag change) |
| onModalHide    | Function | () => null   | Called when the modal is completely hidden                      |
| onModalShow    | Function | () => null   | Called when the modal is completely visible                     |
| closeThreshold | number   | 40           | Close pan threshold                                             |
| style          | Object   | {}           | Style applied to the modal                                      |
| style          | Object   | {}           | Style applied to the modal                                      |

# Todo

- [x] Create Example App
- [x] Write Readme
  - [x] Props list
  - [x] Example
- [x] Add threshold props

# Licence

MIT
