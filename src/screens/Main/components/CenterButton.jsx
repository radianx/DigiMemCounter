import PropTypes from "prop-types";
import React from "react";
import { Pressable, Text } from "react-native";
import { GradientBorderView } from "../../../components/Gradient/GradientBorderView";
import { styles } from "./styles";

/**
 * CenterButton component displays the center "0" button with gradient border
 * @param {Object} props - Component props
 * @param {number} props.indexPressed - Currently selected index
 * @param {string} props.selectedColor - Color for selected state
 * @param {string} props.player1Color - Player 1 color
 * @param {string} props.player2Color - Player 2 color
 * @param {Function} props.onPress - Handler for press
 * @param {Function} props.onLongPress - Handler for long press (reset)
 */
const CenterButton = ({
    indexPressed,
    selectedColor,
    player1Color,
    player2Color,
    onPress,
    onLongPress,
}) => {
    const isSelected = indexPressed === -1;

    return (
        <Pressable
            style={{
                width: 70,
                height: "50%",
                borderRadius: 50,
                backgroundColor: isSelected ? selectedColor : undefined,
            }}
            onPress={onPress}
            onLongPress={onLongPress}>
            <GradientBorderView
                gradientProps={{
                    colors: isSelected
                        ? [selectedColor, selectedColor]
                        : [`${player1Color}99`, `${player2Color}99`],
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.6 },
                }}
                style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 50,
                    borderWidth: 5,
                }}>
                <Text style={styles.textBold}>0</Text>
            </GradientBorderView>
        </Pressable>
    );
};

CenterButton.propTypes = {
    indexPressed: PropTypes.number.isRequired,
    selectedColor: PropTypes.string.isRequired,
    player1Color: PropTypes.string.isRequired,
    player2Color: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    onLongPress: PropTypes.func.isRequired,
};

export default CenterButton;
