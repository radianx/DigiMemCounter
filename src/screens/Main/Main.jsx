/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { Asset } from "expo-asset";
import * as Haptics from "expo-haptics";
import { useFonts } from "expo-font";
import { Audio } from "expo-av";
import * as NavigationBar from "expo-navigation-bar";
import { setStatusBarHidden } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { GradientBorderView } from "../../components/Gradient/GradientBorderView";
import Button from "../../components/Button/Button";
import { styles } from "./styles";

NavigationBar.setPositionAsync("relative");
NavigationBar.setVisibilityAsync("hidden");
NavigationBar.setBehaviorAsync("inset-swipe");
setStatusBarHidden(true, "none");

const diceAudio = new Audio.Sound();
const tapAudio = new Audio.Sound();
const startEndAudio = new Audio.Sound();

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
        setElapsedTime(300); // 5 minutes in seconds (5 * 60)
        setTimerStarted(true);

        intervalRef.current = setInterval(() => {
            setElapsedTime((curr) => {
                if (curr == 0) return 0;
                const nextValue = Math.max(0, curr - 1);
                if (nextValue == 0) playStartEndSound();
                return nextValue;
            });
        }, 1000);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const resetStopwatch = () => {
        clearInterval(intervalRef.current);
        setElapsedTime(0);
    };

    const firstRow = [1, 2, 3, 4, 5];
    const secondRow = [6, 7, 8, 9, 10];

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
        const min = 1;
        const max = 20;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
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
                    <View style={styles.landscape}>
                        <View style={{ ...styles.playerRow, transform: [{ rotate: "180deg" }] }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "40%",
                                    padding: 20,
                                }}>
                                <Text style={styles.textBold}>
                                    {settings.player2Name}
                                    {currentTurn === "player2" && ` - Turn ${turnCounter} <`}
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
                                        !isPlayerOne || indexPressed === -1
                                            ? styles.textBold
                                            : styles.text
                                    }>
                                    Memory {playerTwoMemory}
                                </Text>
                                {player2Die && currentTurn == null && (
                                    <Text style={styles.textBold}>Rolled {player2Die}!</Text>
                                )}
                                <View style={{ flexDirection: "row", gap: 15 }}>
                                    {player2Die != null &&
                                        player1Die != null &&
                                        player2Die > player1Die &&
                                        turnCounter == null && (
                                            <Button
                                                label="START TURN"
                                                onPress={() => handleStart("player2")}
                                            />
                                        )}
                                    {currentTurn == "player2" && (
                                        <Button
                                            label="END TURN"
                                            onPress={() => handleEndTurn("player2")}
                                        />
                                    )}
                                    {turnCounter == null ? (
                                        <Button
                                            label="⚂"
                                            onPress={() => handleDicePress("player2")}
                                        />
                                    ) : (
                                        <Button label="↻" onPress={() => resetGameState()} />
                                    )}
                                </View>
                            </View>
                        </View>
                        <View style={styles.mainRow}>
                            <View style={styles.side}>
                                <View style={styles.reverseRow}>
                                    {firstRow.map((number, index) => (
                                        <Pressable
                                            key={number}
                                            style={{
                                                ...styles.cell,
                                                backgroundColor:
                                                    indexPressed === index && isPlayerOne
                                                        ? `${settings.selectedColor}`
                                                        : undefined,
                                            }}
                                            onPress={() => handlePress(index, true)}>
                                            <GradientBorderView
                                                gradientProps={{
                                                    colors:
                                                        indexPressed === index && isPlayerOne
                                                            ? [
                                                                  settings.selectedColor,
                                                                  settings.selectedColor,
                                                              ]
                                                            : [
                                                                  settings.player1Color,
                                                                  settings.player1Color,
                                                              ],
                                                }}
                                                style={{
                                                    borderWidth: 5,
                                                    borderRadius: 50,
                                                    width: "100%",
                                                    height: "100%",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}>
                                                <Text style={styles.textBold}>{number}</Text>
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
                                                backgroundColor:
                                                    indexPressed === index + 5 && isPlayerOne
                                                        ? `${settings.selectedColor}`
                                                        : undefined,
                                            }}
                                            onPress={() => handlePress(index + 5, true)}>
                                            <GradientBorderView
                                                gradientProps={{
                                                    colors:
                                                        indexPressed === index + 5 && isPlayerOne
                                                            ? [
                                                                  settings.selectedColor,
                                                                  settings.selectedColor,
                                                              ]
                                                            : [
                                                                  settings.player1Color,
                                                                  settings.player1Color,
                                                              ],
                                                }}
                                                style={{
                                                    borderWidth: 5,
                                                    borderRadius: 50,
                                                    width: "100%",
                                                    height: "100%",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}>
                                                <Text style={styles.textBold}>{number}</Text>
                                            </GradientBorderView>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: 40,
                                        transform: [{ rotate: "180deg" }],
                                    }}>
                                    {timerStarted && (
                                        <Pressable
                                            style={{
                                                backgroundColor:
                                                    currentTurn == "player2"
                                                        ? settings.player2Color
                                                        : undefined,
                                                padding: 5,
                                                borderRadius: 5,
                                            }}
                                            onLongPress={() => startFinalCount()}>
                                            <Text style={styles.timeText}>
                                                {formatTime(elapsedTime)}
                                            </Text>
                                        </Pressable>
                                    )}
                                </View>
                                <Pressable
                                    style={{
                                        width: 70,
                                        height: "50%",
                                        borderRadius: 50,
                                        backgroundColor:
                                            indexPressed === -1
                                                ? `${settings.selectedColor}`
                                                : undefined,
                                    }}
                                    onPress={() => handlePress(-1, false)}
                                    onLongPress={() => {
                                        resetGameState();
                                    }}>
                                    <GradientBorderView
                                        gradientProps={{
                                            colors:
                                                indexPressed == -1
                                                    ? [
                                                          `${settings.selectedColor}`,
                                                          `${settings.selectedColor}`,
                                                      ]
                                                    : [
                                                          `${settings.player1Color}99`,
                                                          `${settings.player2Color}99`,
                                                      ],
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
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: 40,
                                    }}>
                                    {timerStarted && (
                                        <Pressable
                                            style={{
                                                backgroundColor:
                                                    currentTurn == "player1"
                                                        ? settings.player1Color
                                                        : undefined,
                                                padding: 5,
                                                borderRadius: 5,
                                            }}
                                            onLongPress={() => startFinalCount()}>
                                            <Text style={styles.timeText}>
                                                {formatTime(elapsedTime)}
                                            </Text>
                                        </Pressable>
                                    )}
                                </View>
                            </View>
                            <View style={styles.side}>
                                <View style={styles.reverseRow}>
                                    {secondRow.map((number, index) => (
                                        <Pressable
                                            key={number}
                                            style={{
                                                ...styles.cell,
                                                backgroundColor:
                                                    indexPressed === index + 5 && !isPlayerOne
                                                        ? `${settings.selectedColor}`
                                                        : undefined,
                                            }}
                                            onPress={() => handlePress(index + 5, false)}>
                                            <GradientBorderView
                                                gradientProps={{
                                                    colors:
                                                        indexPressed === index + 5 && !isPlayerOne
                                                            ? [
                                                                  settings.selectedColor,
                                                                  settings.selectedColor,
                                                              ]
                                                            : [
                                                                  settings.player2Color,
                                                                  settings.player2Color,
                                                              ],
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
                                                        transform: [{ rotate: "180deg" }],
                                                    }}>
                                                    {number}
                                                </Text>
                                            </GradientBorderView>
                                        </Pressable>
                                    ))}
                                </View>
                                <View style={styles.row}>
                                    {firstRow.map((number, index) => (
                                        <Pressable
                                            key={number}
                                            style={{
                                                ...styles.cell,
                                                backgroundColor:
                                                    indexPressed === index && !isPlayerOne
                                                        ? `${settings.selectedColor}`
                                                        : undefined,
                                            }}
                                            onPress={() => handlePress(index, false)}>
                                            <GradientBorderView
                                                gradientProps={{
                                                    colors:
                                                        indexPressed === index && !isPlayerOne
                                                            ? [
                                                                  settings.selectedColor,
                                                                  settings.selectedColor,
                                                              ]
                                                            : [
                                                                  settings.player2Color,
                                                                  settings.player2Color,
                                                              ],
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
                                                        transform: [{ rotate: "180deg" }],
                                                    }}>
                                                    {number}
                                                </Text>
                                            </GradientBorderView>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>
                        </View>
                        <View style={{ ...styles.playerRow }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "40%",
                                    padding: 20,
                                }}>
                                <Text style={styles.textBold}>
                                    {settings.player1Name}
                                    {currentTurn === "player1" && ` - Turn ${turnCounter} <`}
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
                                        isPlayerOne || indexPressed === -1
                                            ? styles.textBold
                                            : styles.text
                                    }>
                                    Memory {playerOneMemory}
                                </Text>
                                {player1Die && (
                                    <Text style={styles.textBold}>Rolled {player1Die}!</Text>
                                )}
                                <View style={{ flexDirection: "row", gap: 15 }}>
                                    {player2Die != null &&
                                        player1Die != null &&
                                        player1Die > player2Die &&
                                        turnCounter == null && (
                                            <Button
                                                label="START TURN"
                                                onPress={() => handleStart("player1")}
                                            />
                                        )}
                                    {currentTurn == "player1" && (
                                        <Button
                                            label="END TURN"
                                            onPress={() => handleEndTurn("player1")}
                                        />
                                    )}
                                    {turnCounter == null ? (
                                        <Button
                                            label="⚂"
                                            onPress={() => handleDicePress("player1")}
                                        />
                                    ) : (
                                        <Button label="↻" onPress={resetGameState} />
                                    )}
                                    <Button label="..." onPress={onSettingsClick} />
                                </View>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </ImageBackground>
    );
};

export default Main;
