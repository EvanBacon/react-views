import { ClassAttributes, ComponentProps, ComponentType } from 'react';
import {
    StyleProp,
    Image as NativeImage,
    ImageStyle as NativeImageStyle,
} from 'react-native';
import { WebViewStyle } from './View';

type NativeImageProps = ComponentProps<typeof NativeImage> & ClassAttributes<typeof NativeImage>;

export interface WebImageStyle {
    opacity?: number;
    /** @platform web */
    ":hover"?: ImageStyle;
}

export type ImageStyle = NativeImageStyle & WebImageStyle & Omit<WebViewStyle, ':hover'>;

export type WebImageProps = {
    style?: StyleProp<ImageStyle>;
    /** @platform web */
    tabIndex?: number;
    /**
     * Set whether the image can be dragged with native browser behavior.
     * @platform web
     */
    draggable?: boolean;
};

export type ImageProps = Omit<NativeImageProps, 'style'> & WebImageProps;

const Image = NativeImage as ComponentType<ImageProps>;

export default Image;
