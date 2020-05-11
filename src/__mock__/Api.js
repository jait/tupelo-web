

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
                id: "09Tf8gXJS76wIovKxMSSCQ",
                player_name: "Keijo",
                team: 0
            }
        ];
    callback(plList);
}

export function listGames(callback, errorCallback) {
    callback([
        {id: "foo", players: [{player_name: "esko"}, {player_name: "seppo"}, {player_name: "pauli"}]},
        {id: "2", players: [{player_name: "matti"}, {player_name: "pekka"}], joined: false}
    ]);
}

export function createGame(callback, errorCallback) {
    callback("foobar");
}

export function leaveGame(gameId, callback, errorCallback) {
    callback(true);
}

export function joinGame(gameId, callback, errorCallback) {
    callback(true);
}

export function getGameState(gameId, callback, errorCallback) {
    const state = {
        gameState: {
            "status": 2,
            "mode": 1,
            "table": [
                {
                    "suit": 2,
                    "value": 2,
                    "played_by": "1"
                },
                {
                    "suit": 2,
                    "value": 4,
                    "played_by": "2"
                },
                {
                    "suit": 2,
                    "value": 3,
                    "played_by": "3"
                }
            ],
            "score": [
                8,
                0
            ],
            "tricks": [
                1,
                2
            ],
            "turn": 0,
            "turn_id": "BRhWZf9SQ_CLVF6Y3zZhxw"
        },

        hand: [
            {
                "suit": 0,
                "value": 2
            },
            {
                "suit": 0,
                "value": 7
            },
            {
                "suit": 0,
                "value": 9
            },
            {
                "suit": 1,
                "value": 3
            },
            {
                "suit": 1,
                "value": 5
            },
            {
                "suit": 1,
                "value": 8
            },
            {
                "suit": 1,
                "value": 10
            },
            {
                "suit": 2,
                "value": 5
            },
            {
                "suit": 2,
                "value": 8
            },
            {
                "suit": 2,
                "value": 13
            },
            {
                "suit": 3,
                "value": 4
            },
            {
                "suit": 3,
                "value": 7
            },
            {
                "suit": 3,
                "value": 11
            }
        ]
    }
    callback(state);
}

export function getGameInfo(gameId, callback, errorCallback) {
    callback(
        {
            players: [
                thisPlayer,
                { player_name: "Seppo", team: 1 },
                { player_name: "Matti", team: 0 },
                { player_name: "Keijo", team: 1 }
            ]
        }
    );
}

export function setAuthKey(authKey) {
}
