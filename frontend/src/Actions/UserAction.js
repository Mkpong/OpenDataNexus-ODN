const loginUser = user => {
    return {
        type: "LOG_IN",
        user
    }
}

const logoutUser = user => {
    return {
        type: "LOG_OUT"
    }
}

export default {
    loginUser,
    logoutUser
};