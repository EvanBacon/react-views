/**
 *
 * Copyright (c) Evan Bacon.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react";

export function mergeRefs(
  ...args: readonly React.ElementRef<any>[]
): (node: HTMLElement | null) => void {
  return function forwardRef(node: HTMLElement | null) {
    args.forEach((ref: React.ElementRef<any>) => {
      if (ref == null) {
        return;
      }
      if (typeof ref === "function") {
        ref(node);
        return;
      }
      if (typeof ref === "object") {
        // @ts-expect-error
        ref.current = node;
        return;
      }
      console.error(
        `mergeRefs cannot handle Refs of type boolean, number or string, received ref ${String(
          ref
        )}`
      );
    });
  };
}

export function useMergeRefs(
  ...args: readonly React.ElementRef<any>[]
): (node: HTMLElement | null) => void {
  return React.useMemo(
    () => mergeRefs(...args),
    // eslint-disable-next-line
    [...args]
  );
}
