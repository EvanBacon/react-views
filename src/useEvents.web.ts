import { useState } from "react";
// @ts-expect-error: untyped
import useUpstreamHover from "react-native-web/dist/modules/useHover";

export function useHover(ref): boolean {
  const [hover, setHovered] = useState(false);
  // TODO: We should just support the CSS property
  useUpstreamHover(ref, {
    contain: true,
    onHoverChange: setHovered,
  });
  return hover;
}
