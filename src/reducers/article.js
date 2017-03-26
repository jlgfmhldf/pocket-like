const initialState = {
    title: document.getElementsByTagName('title')[0].text,
    url: window.location.href,
    isAdded: false
}
export default function article(state=initialState,action){
    switch(action.type){
        case 'ADD_ARTICLE_TO_POCKET' : 
            return {
                ...state,
                isAdded: true,
            }
        default :
            return state;
    }
}