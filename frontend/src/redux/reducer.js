import { setSearchValue } from "./action";

const initialState = {
    searchValue : ''
}

const searchReducer = (state = initialState,action)=>{
    switch(action.type){
        case setSearchValue :
            return {
                ...state,
                searchValue : action.payload
            }
        default : 
            return state;
    }
}

export default searchReducer;