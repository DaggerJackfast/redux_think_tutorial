export function itemsHasErrored(bool) {
    return {
        type: "ITEMS_HAS_ERRORED",
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return{
        type:'ITEM_IS_LOADING',
        isLoading:bool
    };
}

export function itemFetchDataSuccess(items) {
    return{
        type:'ITEM_FETCH_DATA_SUCCESS',
        items
    };
}


export function errorAfterFiveSeconds() {
    return(dispatch)=>{
        setTimeout(()=>{
            dispatch(itemsHasErrored(true));
        },5000)
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        fetch(url).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            dispatch(itemsIsLoading(false));
            return response;
        }).then((response) => response.json())
            .then((items) => dispatch(itemFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)))
    }
}