// This Module works with NAMED EXPORTS

export default {
    getCurrencySymbol,
    getRandomIntInclusive,
    makeId,
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

export function makeId() {
    var length = 6;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

export function getCurrencySymbol(currency) {
    var symbol = ''
    switch (currency) {
        case 'ILS':
            symbol = '₪'
            break;
        case 'EUR':
            symbol = '€'
            break;
        case 'USD':
        default:
            symbol = '$'
            break;
    }
    return symbol;
}
