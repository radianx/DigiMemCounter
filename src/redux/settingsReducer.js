import {
    RESET_ALL_SETTINGS,
    RESET_BACKGROUND_IMAGE,
    TOGGLE_HAPTIC_FEEDBACK,
    TOGGLE_HUD,
    TOGGLE_SOUND,
    UPDATE_BACKGROUND_IMAGE,
    UPDATE_FOREGROUND_IMAGE,
    UPDATE_PLAYER_1_COLOR,
    UPDATE_PLAYER_1_NAME,
    UPDATE_PLAYER_2_COLOR,
    UPDATE_PLAYER_2_NAME,
    UPDATE_SELECTED_COLOR,
} from "./actions";

const initialState = {
    player1Name: "PLAYER 1",
    player2Name: "PLAYER 2",
    player1Color: "#3C91E6",
    player2Color: "#C33C54",
    selectedColor: "#F4D35E",
    backgroundImage: null,
    foregroundImage: null,
    keepHUD: true,
    isHapticsOn: true,
    isSoundOn: true,
};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_PLAYER_1_COLOR: {
        return { ...state, player1Color: action.payload };
    }
    case UPDATE_PLAYER_2_COLOR: {
        return { ...state, player2Color: action.payload };
    }
    case UPDATE_PLAYER_1_NAME: {
        return { ...state, player1Name: action.payload };
    }
    case UPDATE_PLAYER_2_NAME: {
        return { ...state, player2Name: action.payload };
    }
    case UPDATE_SELECTED_COLOR: {
        return { ...state, selectedColor: action.payload };
    }
    case UPDATE_BACKGROUND_IMAGE: {
        return { ...state, backgroundImage: action.payload };
    }
    case UPDATE_FOREGROUND_IMAGE: {
        return { ...state, foregroundImage: action.payload };
    }
    case TOGGLE_HUD: {
        return { ...state, keepHUD: action.payload };
    }
    case TOGGLE_HAPTIC_FEEDBACK: {
        return { ...state, isHapticsOn: action.payload };
    }
    case TOGGLE_SOUND: {
        return { ...state, isSoundOn: action.payload };
    }
    case RESET_BACKGROUND_IMAGE: {
        return { ...state, backgroundImage: initialState.backgroundImage, keepHUD: true };
    }
    case RESET_ALL_SETTINGS: {
        return { ...initialState };
    }
    default:
        return state;
    }
};

export default settingsReducer;
