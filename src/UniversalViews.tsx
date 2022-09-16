import React, { forwardRef, useMemo, useRef } from 'react';
import { StyleSheet, View as UpstreamView, Text as UpstreamText, Image as UpstreamImage } from 'react-native';

import { filterStyles } from './filterStyles';
import { ImageProps } from './Image';
import { useMergeRefs } from './mergeRefs';
import { TextProps } from './Text';
import { useHover } from './useEvents';
import { ViewProps } from './View';


function createPsuedoClassView<TView, TViewProps extends { style?: any }>(
    View: TView,
    { style, hoverStyle, center, ...props }: TViewProps & { center?: boolean, hoverStyle?: any },
    forwardedRef: React.Ref<TView>,
) {

    // Filter and apply `center` prop.
    const finalStyle = useMemo(() => {
        const filteredStyle = filterStyles(style) ?? {}
        if (center) {
            return [
                styles.center,
                filteredStyle,
            ]
        }
        return filteredStyle;
    }, [style, center])

    const hostRef = useRef(null);
    const setRef = useMergeRefs(forwardedRef, hostRef);
    const hover = useHover(hostRef)

    // if (View === Text && props.href && Platform.OS !== 'web') {
    //     const originalOnPress = props.onPress?.bind(props);
    //     props.onPress = (...args) => {
    //         originalOnPress?.(...args);
    //         Linking.openURL(props.href);
    //     }
    // }

    return (
        // @ts-expect-error
        <View ref={setRef} style={[finalStyle, hover && hoverStyle]} {...props} />
    );
}


export const View = forwardRef(createPsuedoClassView.bind(this, UpstreamView)) as React.ComponentType<ViewProps>;
export const Text = forwardRef(createPsuedoClassView.bind(this, UpstreamText)) as React.ComponentType<TextProps>;
export const Image = forwardRef(createPsuedoClassView.bind(this, UpstreamImage)) as React.ComponentType<ImageProps>;

const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center",
    }
});
