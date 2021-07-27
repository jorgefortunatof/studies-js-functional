import { handleStatus } from '../utils/promise-helpers.js';
import { parcialize, pipe } from '../utils/operators.js';
import { Maybe } from '../utils/maybe.js';

const API = 'http://localhost:3000/notas';

const getItemsFromNotas = notasM => notasM.map(notas => notas.$flatMap(notas => notas.itens));
const sumItemsValue = itemsM => itemsM.map(items => items.reduce((total, item) => total + item.valor, 0));
const filterItemsByCode = (code, itemsM) => itemsM.map(items => items.filter(item => item.codigo === code));

export const notasService = {

    listAll() {
        return fetch(API)
            .then(handleStatus)
            .then(notas => Maybe.of(notas))
            .catch(err => {
                console.log(err);
                return Promise.reject('Não foi possível obter as notas ficais');
            });
    },

    sumItems(code) {
        const filterItems = parcialize(filterItemsByCode, code);
        const sumItems = pipe(getItemsFromNotas, filterItems, sumItemsValue);

        return this.listAll()
            .then(sumItems)
            .then(result => result.getOrElse(0));
    }
}
