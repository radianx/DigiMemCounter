import PropTypes from "prop-types";
import React from "react";
import { Text, View } from "react-native";
import Button from "../../../components/Button/Button";
import { styles } from "./styles";

/**
 * PlayerRow component displays player information, controls, and game state
 * @param {Object} props - Component props
 * @param {string} props.playerName - Name of the player
 * @param {number} props.memory - Current memory value
 * @param {number|null} props.dieRoll - Dice roll result (null if not rolled)
 * @param {number|null} props.opponentDieRoll - Opponent's dice roll
 * @param {string|null} props.currentTurn - Current turn player ("player1" or "player2")
 * @param {number|null} props.turnCounter - Current turn number
 * @param {string} props.playerId - Player identifier ("player1" or "player2")
 * @param {boolean} props.isPlayerOne - Whether this is player one
 * @param {number} props.indexPressed - Currently selected memory index
 * @param {boolean} props.rotated - Whether to rotate the row 180deg
 * @param {Function} props.onStartTurn - Handler for starting turn
 * @param {Function} props.onEndTurn - Handler for ending turn
 * @param {Function} props.onDicePress - Handler for dice roll
 * @param {Function} props.onReset - Handler for game reset
 * @param {Function} [props.onSettingsClick] - Optional handler for settings button (player 1 only)
 */
const PlayerRow = ({
    playerName,
    memory,
    dieRoll,
    opponentDieRoll,
    currentTurn,
    turnCounter,
    playerId,
    isPlayerOne,
    indexPressed,
    rotated,
    onStartTurn,
    onEndTurn,
    onDicePress,
    onReset,
    onSettingsClick,
}) => {
    const isCurrentTurn = currentTurn === playerId;
    const hasWonDiceRoll = dieRoll != null && opponentDieRoll != null && dieRoll > opponentDieRoll;
    const showStartButton = hasWonDiceRoll && turnCounter == null;

    return (
        <View style={{ ...styles.playerRow, transform: rotated ? [{ rotate: "180deg" }] : [] }}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "40%",
                }}>
                <Text style={styles.textBold}>
                    {playerName}
                    {isCurrentTurn && ` - Turn ${turnCounter} <`}
                </Text>
            </View>
            <View
                style={{
                    width: "60%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: 20,
                }}>
                <Text
                    style={
                        memory >= 0
                            ? styles.textBold
                            : styles.text
                    }>
                    Memory {memory}
                </Text>
                {dieRoll && currentTurn == null && (
                    <Text style={styles.textBold}>Rolled {dieRoll}!</Text>
                )}
                <View style={{ flexDirection: "row", gap: 15 }}>
                    {showStartButton && (
                        <Button label="START TURN" onPress={() => onStartTurn(playerId)} />
                    )}
                    {isCurrentTurn && (
                        <Button label="END TURN" onPress={() => onEndTurn(playerId)} />
                    )}
                    {turnCounter == null ? (
                        <Button label="⚂" onPress={() => onDicePress(playerId)} />
                    ) : (
                        <Button label="↻" onPress={onReset} />
                    )}
                    {onSettingsClick && <Button label="..." onPress={onSettingsClick} />}
                </View>
            </View>
        </View>
    );
};

PlayerRow.propTypes = {
    playerName: PropTypes.string.isRequired,
    memory: PropTypes.number.isRequired,
    dieRoll: PropTypes.number,
    opponentDieRoll: PropTypes.number,
    currentTurn: PropTypes.string,
    turnCounter: PropTypes.number,
    playerId: PropTypes.string.isRequired,
    isPlayerOne: PropTypes.bool.isRequired,
    indexPressed: PropTypes.number.isRequired,
    rotated: PropTypes.bool,
    onStartTurn: PropTypes.func.isRequired,
    onEndTurn: PropTypes.func.isRequired,
    onDicePress: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onSettingsClick: PropTypes.func,
};

export default PlayerRow;
