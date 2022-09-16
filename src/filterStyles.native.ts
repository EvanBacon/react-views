import { StyleSheet } from "react-native";
import { parseBoxShadow } from "./parseBoxShadow";

const WEB_STYLES = [
  "backdropFilter",
  "animationDelay",
  "animationDirection",
  "animationDuration",
  "animationFillMode",
  "animationName",
  "animationIterationCount",
  "animationPlayState",
  "animationTimingFunction",
  "backgroundAttachment",
  "backgroundBlendMode",
  "backgroundClip",
  "backgroundImage",
  "backgroundOrigin",
  "backgroundPosition",
  "backgroundRepeat",
  "backgroundSize",
  // "boxShadow",
  "boxSizing",
  "clip",
  "cursor",
  "filter",
  "gridAutoColumns",
  "gridAutoFlow",
  "gridAutoRows",
  "gridColumnEnd",
  "gridColumnGap",
  "gridColumnStart",
  "gridRowEnd",
  "gridRowGap",
  "gridRowStart",
  "gridTemplateColumns",
  "gridTemplateRows",
  "gridTemplateAreas",
  "outline",
  "outlineColor",
  "overflowX",
  "overflowY",
  "overscrollBehavior",
  "overscrollBehaviorX",
  "overscrollBehaviorY",
  "perspective",
  "perspectiveOrigin",
  "touchAction",
  "transformOrigin",
  "transitionDelay",
  "transitionDuration",
  "transitionProperty",
  "transitionTimingFunction",
  "userSelect",
  // "visibility",
  "willChange",

  // Custom styles
  //   ":hover",
  //   ":active",
  //   ":focus",
];

export function filterStyles(styleProp = {}) {
  const style = StyleSheet.flatten(styleProp);

  const filteredStyle = Object.fromEntries(
    Object.entries(style).filter(([k]) => !WEB_STYLES.includes(k))
  );

  if (filteredStyle.position === "fixed") {
    filteredStyle.position = "absolute";
  }

  return processNativeStyles(filteredStyle);
}

function processNativeStyles(style) {
  if (!style) return style;

  if (typeof style.aspectRatio === "string") {
    // Match `1 / 2.0`, `2.0/   4`
    const trimmed = style.aspectRatio.trim();
    // Single number as a string
    if (!trimmed.match(/^(\d+(?:\.\d+)?)$/)) {
      const components = trimmed.match(
        /^(\d+(?:\.\d+)?)(?:\s+)?\/(?:\s+)?(\d+(?:\.\d+)?$)$/
      );
      if (components && components[1] && components[2]) {
        const first = parseFloat(components[1]);
        const second = parseFloat(components[2]);
        style.aspectRatio = first / second;
      } else {
        console.warn(`Unsupported aspectRatio: '${style.aspectRatio}'`);
        style.aspectRatio = undefined;
      }
    }
  }
  if (style.visibility) {
    if (style.visibility === "hidden") {
      style.display = "none";
    }
    delete style.visibility;
  }
  if (style.boxShadow) {
    const shadows = parseBoxShadow(style.boxShadow);
    delete style.boxShadow;

    // Get first shadow that isn't inset
    const first = shadows.find((shadow) => !shadow.inset);
    // TODO: Need some system for rendering the shadows.

    if (first) {
      style.shadowOpacity = 1.0;
      style.shadowColor = first.color;
      style.shadowOffset = {
        width: first.x,
        height: first.y,
      };

      // iOS trick https://sarunw.com/posts/match-view-shadow-to-sketch-shadow/
      style.shadowRadius = first.blur * 0.5;
    }
  }

  if (style.position) {
    if (style.position === "fixed") {
      style.position = "absolute";
    } else if (!["absolute", "relative"].includes(style.position)) {
      console.warn(`Unsupported position: '${style.position}'`);
      style.position = "relative";
    }
  }

  return style;
}
