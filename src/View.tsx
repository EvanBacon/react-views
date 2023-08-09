import React, { ClassAttributes, ComponentProps, ComponentType } from "react";
import {
  StyleProp,
  Text,
  Platform,
  View as NativeView,
  AccessibilityRole,
  ViewStyle as NativeViewStyle,
  StyleSheet,
} from "react-native";

// https://github.com/necolas/react-native-web/issues/832

type NativeViewProps = ComponentProps<typeof NativeView> &
  ClassAttributes<typeof NativeView>;

/**
 * https://baconbrix.gitbook.io/react-native-web/primitives/view
 */
export interface WebViewStyle {
  /** @platform web */
  backdropFilter?: string;
  /** @platform web */
  animationDelay?: string;
  /** @platform web */
  animationDirection?: string;
  /** @platform web */
  animationDuration?: string;
  /** @platform web */
  animationFillMode?: string;
  /** @platform web */
  animationName?: string | any[];
  /** @platform web */
  animationIterationCount?: number | "infinite";
  /** @platform web */
  animationPlayState?: string;
  /** @platform web */
  animationTimingFunction?: string;
  /** @platform web */
  backgroundAttachment?: string;
  /** @platform web */
  backgroundBlendMode?: string;
  /** @platform web */
  backgroundClip?: string;
  /** @platform web */
  backgroundImage?: string;
  /** @platform web */
  backgroundOrigin?: "border-box" | "content-box" | "padding-box";
  /** @platform web */
  backgroundPosition?: string;
  /** @platform web */
  backgroundRepeat?: string;
  /** @platform web */
  backgroundSize?: string;
  /** @platform web */
  boxShadow?: string;
  /** @platform web */
  boxSizing?: string;
  /** @platform web */
  clip?: string;
  /** @platform web */
  cursor?: string;
  /** @platform web */
  filter?: string;
  /** @platform web */
  gridAutoColumns?: string;
  /** @platform web */
  gridAutoFlow?: string;
  /** @platform web */
  gridAutoRows?: string;
  /** @platform web */
  gridColumnEnd?: string;
  /** @platform web */
  gridColumnGap?: string;
  /** @platform web */
  gridColumnStart?: string;
  /** @platform web */
  gridRowEnd?: string;
  /** @platform web */
  gridRowGap?: string;
  /** @platform web */
  gridRowStart?: string;
  /** @platform web */
  gridTemplateColumns?: string;
  /** @platform web */
  gridTemplateRows?: string;
  /** @platform web */
  gridTemplateAreas?: string;
  /** @platform web */
  outline?: string;
  /** @platform web */
  outlineColor?: string;
  /** @platform web */
  overflowX?: string;
  /** @platform web */
  overflowY?: string;
  /** @platform web */
  overscrollBehavior?: "auto" | "contain" | "none";
  /** @platform web */
  overscrollBehaviorX?: "auto" | "contain" | "none";
  /** @platform web */
  overscrollBehaviorY?: "auto" | "contain" | "none";
  /** @platform web */
  perspective?: string;
  /** @platform web */
  perspectiveOrigin?: string;
  /** @platform web */
  touchAction?: string;
  /** @platform web */
  transformOrigin?: string;
  /** @platform web */
  transitionDelay?: string;
  /** @platform web */
  transitionDuration?: string;
  /** @platform web */
  transitionProperty?: string;
  /** @platform web */
  transitionTimingFunction?: string;
  /** @platform web */
  userSelect?: string;
  /** @platform web */
  visibility?: string;
  /** @platform web */
  willChange?: string;
  /** @platform web */
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
}

export type ViewStyle = Omit<NativeViewStyle, "position"> & WebViewStyle;

export type WebViewProps = {
  style?: StyleProp<ViewStyle>;

  accessibilityRole?:
    | "list"
    | "listitem"
    | "complementary"
    | "contentinfo"
    | "region"
    | "navigation"
    | "main"
    | "article"
    | "banner"
    | AccessibilityRole;

  /** Float content to the center. `{ justifyContent: 'center', alignItems: 'center' }` */
  center?: boolean;
  hoverStyle?: ViewStyle;
};

export type ViewProps = WebViewProps &
  Omit<NativeViewProps, "style" | "accessibilityRole">;

let View = NativeView as ComponentType<ViewProps>;

if (process.env.NODE_ENV !== "production") {
  // Add better errors and warnings in development builds.
  View = function View(props: ViewProps) {
    const children = React.useMemo(() => {
      const children: any[] = [];
      React.Children.forEach(props.children, (child) => {
        if (child == null) {
          return;
        }
        if (typeof child === "string") {
          // Wrap text in a Text component.
          let message = `Invalid raw text as a child of View: "${child}"${
            child === "" ? ` [empty string]` : ""
          }.`;
          message +=
            " Wrap the text contents with a Text element or remove it.";
          console.warn(message);
          children.push(
            <Text style={[StyleSheet.absoluteFill, styles.error]}>
              {'Unwrapped text: "'}
              <Text style={{ fontWeight: "bold" }}>{child}</Text>
              {'"'}
            </Text>
          );
          return;
        } else if (typeof child?.type === "string" && Platform.OS !== "web") {
          // Disallow untransformed react-dom elements on native.
          throw new Error(
            `Using unsupported React DOM element: <${child.type} />`
          );
        }
        children.push(child);
      });
      return children;
    }, [props.children]);
    return <NativeView {...props} children={children} />;
  };
  const styles = StyleSheet.create({
    error: {
      backgroundColor: "firebrick",
      color: "white",
    },
  });
}

export default View;
