import './utils/array-helpers.js';
import { notasService as service } from './nota/service.js';
import { takeUntil, debounceTime, parcialize, pipe } from './utils/operators.js';
import { timeoutPromise, retry } from './utils/promise-helpers.js';
import { EventEmitter } from './utils/event-emitter.js';

const operations = pipe(
    parcialize(takeUntil, 3),
    parcialize(debounceTime, 500),
);

const action = operations(() =>
    retry(3, 3000, () => timeoutPromise(200,
        service.sumItems('2143')
    ))
        .then(total => EventEmitter.emit('itensTotalizados', total))
        .catch(console.log)
)

document.querySelector('#myButton').onclick = action;

EventEmitter.on('itensTotalizados', total => alert(total));