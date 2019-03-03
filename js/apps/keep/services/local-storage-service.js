export default {
    loadFromLocalStorage,
    saveToLocalStorage,
    removeFromStorage
}

function loadFromLocalStorage(key){
    var item = localStorage.getItem(key)
    // return localStorage.getItem(key)
    return Promise.resolve(item)
}

function saveToLocalStorage(key,item){
    console.log('saving to local storge',item)
    localStorage.setItem(key,item)
    return Promise.resolve(item)
}

function removeFromStorage(key){
    return localStorage.removeItem(key)
}