import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

/**
 * A component that applies a gradient border to the parent.
 * Should be placed as the last child of the parent so that it isn't overlapped.
 * @example
 * ```tsx
 *      <View>
 *          <GradientBorder
 *              borderWidth={2}
 *              gradientProps={{
 *                  colors: ['red', 'blue']
 *              }}
 *          />
 *      </View>
 * ```
 */
export default function GradientBorder({
    gradientProps,
    borderWidth,
    borderRadius,
    borderTopRightRadius,
    borderTopLeftRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderTopWidth,
    borderLeftWidth,
    borderRightWidth,
    borderBottomWidth,
}) {
    return (
        <MaskedView
            maskElement={
                <View
                    pointerEvents="none"
                    style={[
                        {
                            borderWidth: borderWidth,
                            borderRadius: borderRadius,
                            borderTopLeftRadius: borderTopLeftRadius,
                            borderTopRightRadius: borderTopRightRadius,
                            borderBottomLeftRadius: borderBottomLeftRadius,
                            borderBottomRightRadius: borderBottomRightRadius,
                            borderTopWidth: borderTopWidth,
                            borderLeftWidth: borderLeftWidth,
                            borderRightWidth: borderRightWidth,
                            borderBottomWidth: borderBottomWidth,
                        },
                        StyleSheet.absoluteFill,
                    ]}
                    collapsable={false}
                />
            }
            style={[StyleSheet.absoluteFill]}
            pointerEvents="none">
            <LinearGradient
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
                {...gradientProps}
            />
        </MaskedView>
    );
}

GradientBorder.propTypes = {
    gradientProps: PropTypes.object,
    borderWidth: PropTypes.number,
    borderRadius: PropTypes.number,
    borderTopRightRadius: PropTypes.number,
    borderTopLeftRadius: PropTypes.number,
    borderBottomLeftRadius: PropTypes.number,
    borderBottomRightRadius: PropTypes.number,
    borderTopWidth: PropTypes.number,
    borderLeftWidth: PropTypes.number,
    borderRightWidth: PropTypes.number,
    borderBottomWidth: PropTypes.number,
};
