/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { ImageBackground, View } from "react-native";
import { Asset } from "expo-asset";
import * as Haptics from "expo-haptics";
import { useFonts } from "expo-font";
import { Audio } from "expo-av";
import * as NavigationBar from "expo-navigation-bar";
import { setStatusBarHidden } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { MEMORY_VALUES, TIMER, DICE } from "../../constants";
import { PlayerRow, MemoryGrid, Timer, CenterButton } from "./components";

NavigationBar.setPositionAsync("relative");
NavigationBar.setVisibilityAsync("hidden");
NavigationBar.setBehaviorAsync("inset-swipe");
setStatusBarHidden(true, "none");

const diceAudio = new Audio.Sound();
const tapAudio = new Audio.Sound();
const startEndAudio = new Audio.Sound();

/**
 * Main game screen component for the Digimon Card Game memory counter
 * @param {Object} props - Component props
 * @param {Object} props.navigation - React Navigation object
 * @param {Object} props.settings - Game settings from Redux store
 * @param {Function} props.updateBackgroundImage - Function to update background image
 * @param {Function} props.updateForegroundImage - Function to update foreground image
 */
const Main = (props) => {
    const { navigation, settings, updateBackgroundImage, updateForegroundImage } = props;

    const [playerOneMemory, setPlayerOneMemory] = useState(0);
    const [playerTwoMemory, setPlayerTwoMemory] = useState(0);
    const [player1Die, setPlayer1Die] = useState(null);
    const [player2Die, setPlayer2Die] = useState(null);
    const [currentTurn, setCurrentTurn] = useState(null);
    const [turnCounter, setTurnCounter] = useState(null);
    const [indexPressed, setIndexPressed] = useState(-1);
    const [isPlayerOne, setIsPlayerOne] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);

    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(0);

    const startStopwatch = () => {
        setTimerStarted(true);
        startTimeRef.current = Date.now() - elapsedTime * 1000;
        intervalRef.current = setInterval(() => {
            const now = Math.floor((Date.now() - startTimeRef.current) / 1000);
            setElapsedTime(now);
        }, 1000);
    };

    const countDownFromFiveMinutes = () => {
        clearInterval(intervalRef.current);
        setElapsedTime(TIMER.COUNTDOWN_DURATION);
        setTimerStarted(true);

        intervalRef.current = setInterval(() => {
            setElapsedTime((curr) => {
                if (curr == 0) return 0;
                const nextValue = Math.max(0, curr - 1);
                if (nextValue == 0) playStartEndSound();
                return nextValue;
            });
        }, TIMER.UPDATE_INTERVAL);
    };

    const resetStopwatch = () => {
        clearInterval(intervalRef.current);
        setElapsedTime(0);
    };

    const firstRow = MEMORY_VALUES.FIRST_ROW;
    const secondRow = MEMORY_VALUES.SECOND_ROW;

    const image = {
        uri: Asset.fromModule(require("../../assets/images/justBackground.png")).uri,
    };

    const imageForeground = {
        uri: Asset.fromModule(require("../../assets/images/justForeground.png")).uri,
    };

    async function playDiceSound() {
        const status = await diceAudio.getStatusAsync();
        if (!status.isLoaded) {
            await diceAudio.loadAsync(require("../../assets/sounds/dice.mp3"));
        }
        diceAudio.replayAsync();
    }

    async function playTapSound() {
        const status = await tapAudio.getStatusAsync();
        if (!status.isLoaded) {
            await tapAudio.loadAsync(require("../../assets/sounds/tap4.mp3"));
        }
        tapAudio.replayAsync();
    }

    async function playStartEndSound() {
        const status = await startEndAudio.getStatusAsync();
        if (!status.isLoaded) {
            await startEndAudio.loadAsync(require("../../assets/sounds/startEnd1.mp3"));
        }
        startEndAudio.replayAsync();
    }

    const onSettingsClick = () => {
        if (settings.isHapticsOn) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        resetGameState(true);
        navigation.navigate("Settings");
    };

    useEffect(() => {
        if (image.uri && !settings.backgroundImage?.uri) {
            updateBackgroundImage(image.uri);
        }
        if (imageForeground.uri && !settings.foregroundImage?.uri && settings.keepHUD) {
            updateForegroundImage(imageForeground.uri);
        }
    }, [image, imageForeground]);

    useEffect(() => {
        if (indexPressed == -1) {
            setPlayerOneMemory(0);
            setPlayerTwoMemory(0);
            return;
        }
        const properMemory = indexPressed + 1;
        if (isPlayerOne) {
            setPlayerOneMemory(properMemory);
            setPlayerTwoMemory(properMemory * -1);
        } else {
            setPlayerTwoMemory(properMemory);
            setPlayerOneMemory(properMemory * -1);
        }
    }, [indexPressed]);

    const handlePress = (index, isPlayerOne) => {
        if (settings.isSoundOn) playTapSound();
        setPlayer1Die(null);
        setPlayer2Die(null);
        setIndexPressed(index);
        setIsPlayerOne(isPlayerOne);
        if (settings.isHapticsOn) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    };

    const [fontsLoaded, fontError] = useFonts({
        OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
        OpenSansRegular: require("../../assets/fonts/OpenSans-Regular.ttf"),
        NotoSansMono: require("../../assets/fonts/NotoSansMono-Bold.ttf"),
    });

    useEffect(() => {
        async function hideSplash() {
            try {
                if (fontsLoaded || fontError) {
                    if (fontError) {
                        console.error("Font loading error:", fontError);
                    }
                    await SplashScreen.hideAsync();
                }
            } catch (error) {
                console.error("Error hiding splash screen:", error);
            }
        }

        // Hide splash screen when fonts are ready
        hideSplash();

        // Fallback: hide splash screen after 3 seconds regardless
        const timeout = setTimeout(async () => {
            try {
                await SplashScreen.hideAsync();
            } catch (error) {
                console.error("Error hiding splash screen (timeout):", error);
            }
        }, 3000);

        return () => clearTimeout(timeout);
    }, [fontsLoaded, fontError]);

    const resetGameState = (silent) => {
        if (settings.isSoundOn && !silent) playStartEndSound();
        resetStopwatch();
        setTimerStarted(false);
        setPlayerOneMemory(0);
        setPlayerTwoMemory(0);
        setPlayer1Die(null);
        setPlayer2Die(null);
        setCurrentTurn(null);
        setTurnCounter(null);
        setIndexPressed(-1);
        setIsPlayerOne(false);
        setElapsedTime(0);
        if (settings.isHapticsOn)
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    };

    const startFinalCount = () => {
        setTurnCounter(0);
        countDownFromFiveMinutes();
    };

    const handleStart = (player) => {
        if (settings.isSoundOn) playStartEndSound();
        startStopwatch();
        setTurnCounter(0);
        setCurrentTurn(player);
        setPlayer1Die(null);
        setPlayer2Die(null);
        if (settings.isHapticsOn)
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    };

    const handleDicePress = (player) => {
        if (settings.isSoundOn) playDiceSound();
        const randomNumber = Math.floor(Math.random() * (DICE.MAX - DICE.MIN + 1)) + DICE.MIN;
        if (player == "player1") {
            setPlayer1Die(randomNumber);
        } else {
            setPlayer2Die(randomNumber);
        }
    };

    const handleEndTurn = (currentPlayer) => {
        if (settings.isSoundOn) playTapSound();
        setTurnCounter((current) => current + 1);
        setCurrentTurn(currentPlayer == "player1" ? "player2" : "player1");
        if (settings.isHapticsOn)
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    };

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <ImageBackground style={styles.image} source={settings.backgroundImage}>
            <ImageBackground
                style={styles.image}
                source={settings.keepHUD ? settings.foregroundImage : null}>
                <SafeAreaView>
                    {/* Main Game Area */}
                    <View style={styles.landscape}>
                        {/* Player 2 Row (rotated) */}
                        <PlayerRow
                            playerName={settings.player2Name}
                            memory={playerTwoMemory}
                            dieRoll={player2Die}
                            opponentDieRoll={player1Die}
                            currentTurn={currentTurn}
                            turnCounter={turnCounter}
                            playerId="player2"
                            isPlayerOne={false}
                            indexPressed={indexPressed}
                            rotated={true}
                            onStartTurn={handleStart}
                            onEndTurn={handleEndTurn}
                            onDicePress={handleDicePress}
                            onReset={resetGameState}
                        />

                        <View style={styles.mainRow}>
                            {/* Player 1 Memory Grid */}
                            <MemoryGrid
                                firstRow={firstRow}
                                secondRow={secondRow}
                                indexPressed={indexPressed}
                                isPlayerOne={true}
                                playerColor={settings.player1Color}
                                selectedColor={settings.selectedColor}
                                onPress={handlePress}
                                rotateNumbers={false}
                            />

                            {/* Center Area with Timer and 0 Button */}
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                {/* Player 2 Timer (rotated) */}
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: 40,
                                        transform: [{ rotate: "180deg" }],
                                    }}>
                                    {timerStarted && (
                                        <Timer
                                            elapsedTime={elapsedTime}
                                            currentTurn={currentTurn}
                                            player1Color={settings.player1Color}
                                            player2Color={settings.player2Color}
                                            rotated={false}
                                            onLongPress={startFinalCount}
                                        />
                                    )}
                                </View>

                                {/* Center 0 Button */}
                                <CenterButton
                                    indexPressed={indexPressed}
                                    selectedColor={settings.selectedColor}
                                    player1Color={settings.player1Color}
                                    player2Color={settings.player2Color}
                                    onPress={() => handlePress(-1, false)}
                                    onLongPress={resetGameState}
                                />

                                {/* Player 1 Timer */}
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: 40,
                                    }}>
                                    {timerStarted && (
                                        <Timer
                                            elapsedTime={elapsedTime}
                                            currentTurn={currentTurn}
                                            player1Color={settings.player1Color}
                                            player2Color={settings.player2Color}
                                            rotated={false}
                                            onLongPress={startFinalCount}
                                        />
                                    )}
                                </View>
                            </View>

                            {/* Player 2 Memory Grid */}
                            <MemoryGrid
                                firstRow={secondRow}
                                secondRow={firstRow}
                                indexPressed={indexPressed}
                                isPlayerOne={false}
                                playerColor={settings.player2Color}
                                selectedColor={settings.selectedColor}
                                onPress={handlePress}
                                rotateNumbers={true}
                            />
                        </View>

                        {/* Player 1 Row */}
                        <PlayerRow
                            playerName={settings.player1Name}
                            playerColor={settings.player1Color}
                            memory={playerOneMemory}
                            dieRoll={player1Die}
                            opponentDieRoll={player2Die}
                            currentTurn={currentTurn}
                            turnCounter={turnCounter}
                            playerId="player1"
                            isPlayerOne={true}
                            indexPressed={indexPressed}
                            rotated={false}
                            onStartTurn={handleStart}
                            onEndTurn={handleEndTurn}
                            onDicePress={handleDicePress}
                            onReset={resetGameState}
                            onSettingsClick={onSettingsClick}
                        />
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </ImageBackground>
    );
};

Main.propTypes = {
    navigation: PropTypes.object.isRequired,
    settings: PropTypes.shape({
        player1Name: PropTypes.string,
        player2Name: PropTypes.string,
        player1Color: PropTypes.string,
        player2Color: PropTypes.string,
        selectedColor: PropTypes.string,
        backgroundImage: PropTypes.object,
        foregroundImage: PropTypes.object,
        keepHUD: PropTypes.bool,
        isHapticsOn: PropTypes.bool,
        isSoundOn: PropTypes.bool,
    }).isRequired,
    updateBackgroundImage: PropTypes.func.isRequired,
    updateForegroundImage: PropTypes.func.isRequired,
};

export default Main;
