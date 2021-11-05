
const EventEmitter = require('events');

const NONE = 'none'
const CARD_PLAYED = 'cardPlayed'
const MESSAGE = 'message';
const TRICK_PLAYED = 'trickPlayed';
const TURN = 'turn';
const STATE_CHANGED = 'stateChanged';

const types = {
    0: NONE,
    1: CARD_PLAYED,
    2: MESSAGE,
    3: TRICK_PLAYED,
    4: TURN,
    5: STATE_CHANGED
};

class GameEventEmitter extends EventEmitter {

    dispatchEvent(rawEvent) {
        // map type from int to string
        rawEvent.type = types[rawEvent.type];
        this.emit(rawEvent.type, rawEvent);
    }

    // addListener already provided by EventEmitter

    addListeners(eventTypes, callback) {
        eventTypes.forEach((eventType) => {
            this.addListener(eventType, callback);
        });
    }
    removeListeners(eventTypes, callback) {
        eventTypes.forEach((eventType) => {
            this.removeListener(eventType, callback);
        });

    }
}

const dispatcher = new GameEventEmitter();

export default dispatcher;
export {NONE, CARD_PLAYED, MESSAGE, TRICK_PLAYED, TURN, STATE_CHANGED};