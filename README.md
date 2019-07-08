# react-native-half-modal

![react-native-half-modal](https://github.com/nikke1925/react-native-half-modal/blob/master/half-modal.gif)

# Usage

**1. Install**  
This library is available on npm.

```
npm install --save react-native-half-modal
```

**2. Import react-native-half-modal**

```
import { SemiModal } from 'react-native-half-modal';
```

**3. Create a half-modal and nest its content inside of it**

```
<SemiModal>
  <View style={{ flex: 1 }}>
    <Text>I am the half-modal content</Text>
  </View>
</SemiModal>
```

**4. add required props (isVisible and onModalClose)**

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

| Name            | Type     | Default      | Description                                                     |
| --------------- | -------- | ------------ | --------------------------------------------------------------- |
| children        | node     | **REQUIRED** | The modal content                                               |
| isVisible       | bool     | **REQUIRED** | Show the modal?                                                 |
| onModalClose    | Function | **REQUIRED** | Called when the modal is hidden (usually isVisible flag change) |
| onModalHide     | Function | () => null   | Called when the modal is completely hidden                      |
| onModalShow     | Function | () => null   | Called when the modal is completely visible                     |
| closeThreshold  | number   | 40           | Close pan threshold                                             |
| style           | Object   | {}           | Style applied to the modal                                      |
| backgroundColor | String   | '#00000000'  | Style applied to the modal background                           |

# Todo

- [x] Android Support
- [x] Create Example App
- [x] Write Readme
  - [x] Props list
  - [x] Example
- [x] Add threshold props

# Licence

MIT
