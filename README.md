# react-native-half-modal

![react-native-half-modal](https://github.com/nikke1925/react-native-half-modal/blob/master/half-modal.gif)

# Install

```
npm install --save react-native-half-modal
```

# Example

See ```./example/App.js```

# Props

| Name           | Type     | Default      | Description                     |
| -------------- | -------- | ------------ | ------------------------------- |
| children       | node     | **REQUIRED** | The modal content               |
| isVisible      | bool     | **REQUIRED** | Show the modal?                 |
| closeThreshold | number   | 40           | Close pan threshold             |
| onModalClose   | Function | () => {}     | Called when the modal is hidden |
| style          | Object   | {}           | Style applied to the modal      |
| style          | Object   | {}           | Style applied to the modal      |

# Todo

- [x] Create Example App
- [ ] Write Readme
  - [x] Props list
  - [ ] Example
- [x] Add threshold props

# Licence

MIT
