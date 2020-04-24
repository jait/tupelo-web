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
    //callback([{player_name: "Esko"},{player_name: "Matti"}, ]); // mock
}

export function listGames(callback, errorCallback) {
    request("game/list", callback, errorCallback, {akey: akey});
}

export function setAuthKey(authKey) {
    akey = authKey;
}
