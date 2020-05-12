const gameMode = {
    NOLO: 0,
    RAMI: 1,

};

const gameStatus = {
    VOTING: 1,
    ONGOING: 2
};

const constants = {
    ...gameMode,
    ...gameStatus
}

export default constants;