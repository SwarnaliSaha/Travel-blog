export const setSearchValueType = 'setSearchValue'

export const setSearchValue = function(value){
    return {
        type : setSearchValueType,
        payload : value
    }
}