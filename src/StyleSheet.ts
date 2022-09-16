import { ImageStyle } from "./Image";
import { TextStyle } from "./Text";
import { ViewStyle } from "./View";

import { StyleSheet as UpstreamStyleSheet } from "react-native";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const StyleSheet = UpstreamStyleSheet as typeof UpstreamStyleSheet & {
  /**
   * Creates a StyleSheet style reference from the given object.
   */
  create<T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | NamedStyles<T>
  ): T;
};
