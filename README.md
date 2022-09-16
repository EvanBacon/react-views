# @bacons/react-views

Imagine if you could use `react-native-web` props without breaking your `react-native` app or filling it with TypeScript errors. I hope one day this package can stop existing.

## Add the package to your npm dependencies

```
yarn add @bacons/react-views
```

## Usage

Drop-in replacement for View, Text, and Image that works with react-native-web and react-native. Adds the `hoverStyle` style prop for web (does not support pre-rendering).

```tsx
import { View, Image, Text, StyleSheet, Pressable } from "@bacons/react-views";

function App() {
  return (
    <>
      <View
        accessibilityRole="main"
        style={{
          // These styles do nothing on native.
          transitionDuration: "200ms",
        }}
        hoverStyle={{
          backgroundColor: "darkturquoise",
        }}
        // A custom prop that centers contents, because I'm lazy.
        center
      >
        {/* No TypeScript errors... */}
        <Text href="#">Link</Text>
        <Text accessibilityRole="heading" accessibilityLevel={1}>
          Header
        </Text>
      </View>
    </>
  );
}
```

Mostly this adds types so there shouldn't be too much bloat. The styles are all evaluated on native platforms though, this doesn't have much overhead since `StyleSheet` API doesn't do anything on native besides adding typed props.

> `StyleSheet` and `Pressable` have adjusted types only.
