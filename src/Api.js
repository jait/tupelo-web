import settings from './settings'



var akey = "";

function request(path, callback, errorCallback, data) {

    if (data !== undefined) {
        var params = new URLSearchParams();
        for (let key in data) {
            params.set(key, JSON.stringify(data[key]));
        }
        path += `?${params.toString()}`;
    }
    fetch(settings.server.baseUrl + path,
        {
            //mode: 'no-cors'
        }
        )
        .then((res) => res.json())
        .then(
            (result) => {
                callback(result);
            },
            (error) => {
                errorCallback(error);
            }
        )
}

export function sendHello(callback, errorCallback) {
    request("hello", callback, errorCallback);
}

export function register(player, callback, errorCallback) {
    request("player/register", callback, errorCallback, {player: player});
}

export function listPlayers(callback, errorCallback) {
    request("player/list", callback, errorCallback, {akey: akey});
}

export function listGames(callback, errorCallback) {
    request("game/list", callback, errorCallback, {akey: akey});
}

export function createGame(callback, errorCallback) {
    request("game/create", callback, errorCallback, {akey: akey});
}

export function leaveGame(gameId, callback, errorCallback) {
    request("game/leave", callback, errorCallback, {akey: akey, game_id: gameId});
}

export function joinGame(gameId, callback, errorCallback) {
    request("game/enter", callback, errorCallback, {akey: akey, game_id: gameId});
}

export function getGameState(gameId, callback, errorCallback) {
    request("game/get_state", callback, errorCallback, {akey: akey, game_id: gameId});
}

export function getGameInfo(gameId, callback, errorCallback) {
    request("game/get_info", callback, errorCallback, {akey: akey, game_id: gameId});
}

export function startGame(gameId, params, callback, errorCallback) {
    const path = params.withBots ? "game/start_with_bots" : "game/start";
    request(path, callback, errorCallback, {akey: akey, game_id: gameId});
}

export function setAuthKey(authKey) {
    akey = authKey;
}
