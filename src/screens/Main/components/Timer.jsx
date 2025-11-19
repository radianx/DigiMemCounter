import PropTypes from "prop-types";
import React from "react";
import { Pressable, Text } from "react-native";
import { styles } from "./styles";

/**
 * Timer component displays the game timer with player color highlighting
 * @param {Object} props - Component props
 * @param {number} props.elapsedTime - Elapsed time in seconds
 * @param {string|null} props.currentTurn - Current turn player ("player1" or "player2")
 * @param {string} props.player1Color - Player 1 color
 * @param {string} props.player2Color - Player 2 color
 * @param {boolean} props.rotated - Whether to rotate the timer 180deg
 * @param {Function} props.onLongPress - Handler for long press (activates countdown)
 */
const Timer = ({
    elapsedTime,
    currentTurn,
    player1Color,
    player2Color,
    rotated,
    onLongPress,
}) => {
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const backgroundColor =
        currentTurn === "player1"
            ? player1Color
            : currentTurn === "player2"
                ? player2Color
                : undefined;

    return (
        <Pressable
            style={{
                backgroundColor,
                padding: 5,
                borderRadius: 5,
                transform: rotated ? [{ rotate: "180deg" }] : [],
            }}
            onLongPress={onLongPress}>
            <Text style={styles.timeText}>{formatTime(elapsedTime)}</Text>
        </Pressable>
    );
};

Timer.propTypes = {
    elapsedTime: PropTypes.number.isRequired,
    currentTurn: PropTypes.string,
    player1Color: PropTypes.string.isRequired,
    player2Color: PropTypes.string.isRequired,
    rotated: PropTypes.bool,
    onLongPress: PropTypes.func.isRequired,
};

export default Timer;
