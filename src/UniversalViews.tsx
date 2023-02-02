import React, { forwardRef, useMemo, useRef } from "react";
import {
    StyleSheet,
} from "react-native";

import { filterStyles } from "./filterStyles";
import UpstreamImage, { ImageProps } from "./Image";
import { useMergeRefs } from "./mergeRefs";
import UpstreamText, { TextProps } from "./Text";
import { useHover } from "./useEvents";
import UpstreamView, { ViewProps } from "./View";

function createPsuedoClassView<TView, TViewProps extends { style?: any }>(
    View: TView,
    {
        style,
        center,
        ...props
    }: TViewProps & { center?: boolean; hoverStyle?: any },
    forwardedRef: React.Ref<TView>
) {
    // Filter and apply `center` prop.
    const finalStyle = useMemo(() => {
        const filteredStyle = filterStyles(style) ?? {};
        if (center) {
            return [styles.center, filteredStyle];
        }
        return filteredStyle;
    }, [style, center]);

    const Klass = useMemo(() => {
        if (props.hoverStyle) {
            return forwardRef(
                // @ts-expect-error
                createHoverView.bind(this, View)
            );
        }
        return View;
    }, [props.hoverStyle]);

    return (
        // @ts-expect-error
        <Klass ref={forwardedRef} style={finalStyle} {...props} />
    );
}

function createHoverView(
    View,
    { hoverStyle, style, ...props }: ViewProps,
    forwardedRef
) {
    const hostRef = useRef(null);
    const setRef = useMergeRefs(forwardedRef, hostRef);
    const hover = useHover(hostRef);

    const finalStyle = useMemo(() => {
        if (Array.isArray(style)) {
            return [...style, hover && hoverStyle];
        }
        return [style, hover && hoverStyle];
    }, [style, hoverStyle, hover]);

    return <View ref={setRef} style={finalStyle} {...props} />;
}

export const View = forwardRef(
    createPsuedoClassView.bind(this, UpstreamView)
) as React.ComponentType<ViewProps>;
export const Text = forwardRef(
    createPsuedoClassView.bind(this, UpstreamText)
) as React.ComponentType<TextProps>;
export const Image = forwardRef(
    createPsuedoClassView.bind(this, UpstreamImage)
) as React.ComponentType<ImageProps>;

const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
});
