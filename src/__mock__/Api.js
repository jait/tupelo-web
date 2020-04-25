

var thisPlayer = {};

export function sendHello(callback, errorCallback) {
    callback({});
}

export function register(player, callback, errorCallback) {
    const newPlayer = {
        ...player,
        id: "09Tf8gXJS76wIovKxMSSCQ",
        team: 0,
        akey: "ULAwlPxhTqKx5cneFQrYOA"
    };
    thisPlayer = newPlayer;
    callback(newPlayer);
}

export function listPlayers(callback, errorCallback) {
    const plList = [
            thisPlayer,
            {
                id: "N-cNkgZORmeMx7FC077uiw",
                player_name: "Seppo",
                team: 0
            },
            {
                "id": "09Tf8gXJS76wIovKxMSSCQ",
                "player_name": "Keijo",
                "team": 0
            }
        ];
    callback(plList);
}

export function listGames(callback, errorCallback) {
    callback([]);
}

export function setAuthKey(authKey) {
}
