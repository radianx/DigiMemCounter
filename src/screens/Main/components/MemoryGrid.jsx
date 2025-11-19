import PropTypes from "prop-types";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { GradientBorderView } from "../../../components/Gradient/GradientBorderView";
import { styles } from "./styles";

/**
 * MemoryGrid component displays a grid of memory values for a player
 * @param {Object} props - Component props
 * @param {Array<number>} props.firstRow - First row of numbers
 * @param {Array<number>} props.secondRow - Second row of numbers
 * @param {number} props.indexPressed - Currently selected index
 * @param {boolean} props.isPlayerOne - Whether this is player one's grid
 * @param {boolean} props.selectedByPlayerOne - Whether player one made the current selection
 * @param {string} props.playerColor - Player's color theme
 * @param {string} props.selectedColor - Color for selected cell
 * @param {Function} props.onPress - Handler for cell press
 * @param {boolean} props.rotateNumbers - Whether to rotate the numbers 180deg
 */
const MemoryGrid = ({
    firstRow,
    secondRow,
    indexPressed,
    isPlayerOne,
    selectedByPlayerOne,
    playerColor,
    selectedColor,
    onPress,
    rotateNumbers,
}) => {
    return (
        <View style={styles.side}>
            <View style={styles.reverseRow}>
                {firstRow.map((number, index) => (
                    <Pressable
                        key={number}
                        style={{
                            ...styles.cell,
                            borderRadius: 50,
                            overflow: 'hidden',
                            backgroundColor:
                                indexPressed === index && isPlayerOne === selectedByPlayerOne
                                    ? selectedColor
                                    : undefined,
                        }}
                        onPress={() => onPress(index, isPlayerOne)}>
                        <GradientBorderView
                            gradientProps={{
                                colors:
                                    indexPressed === index && isPlayerOne === selectedByPlayerOne
                                        ? [selectedColor, selectedColor]
                                        : [playerColor, playerColor],
                            }}
                            style={{
                                borderWidth: 5,
                                borderRadius: 50,
                                width: "100%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            <Text
                                style={{
                                    ...styles.textBold,
                                    transform: rotateNumbers ? [{ rotate: "180deg" }] : [],
                                }}>
                                {number}
                            </Text>
                        </GradientBorderView>
                    </Pressable>
                ))}
            </View>
            <View style={styles.row}>
                {secondRow.map((number, index) => (
                    <Pressable
                        key={number}
                        style={{
                            ...styles.cell,
                            borderRadius: 50,
                            overflow: 'hidden',
                            backgroundColor:
                                indexPressed === index + 5 && isPlayerOne === selectedByPlayerOne
                                    ? selectedColor
                                    : undefined,
                        }}
                        onPress={() => onPress(index + 5, isPlayerOne)}>
                        <GradientBorderView
                            gradientProps={{
                                colors:
                                    indexPressed === index + 5 && isPlayerOne === selectedByPlayerOne
                                        ? [selectedColor, selectedColor]
                                        : [playerColor, playerColor],
                            }}
                            style={{
                                borderWidth: 5,
                                borderRadius: 50,
                                width: "100%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            <Text
                                style={{
                                    ...styles.textBold,
                                    transform: rotateNumbers ? [{ rotate: "180deg" }] : [],
                                }}>
                                {number}
                            </Text>
                        </GradientBorderView>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

MemoryGrid.propTypes = {
    firstRow: PropTypes.arrayOf(PropTypes.number).isRequired,
    secondRow: PropTypes.arrayOf(PropTypes.number).isRequired,
    indexPressed: PropTypes.number.isRequired,
    isPlayerOne: PropTypes.bool.isRequired,
    selectedByPlayerOne: PropTypes.bool.isRequired,
    playerColor: PropTypes.string.isRequired,
    selectedColor: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    rotateNumbers: PropTypes.bool,
};

export default MemoryGrid;
