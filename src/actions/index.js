import PocketLike from '../scripts/pocket-like-api';
import store from '../store'

const auth = store.getState().auth;
const article = store.getState().article;
const pl = new PocketLike('56284-79593f636813881ec120103b')

export const addToPocket = () => dispatch => {

    const queryRequestToken = pl.request(article.url)
        .then(({ code }) => {
            dispatch({type:'SET_REQUEST_TOKEN',payload: code})
        });

    const queryAccessToken = pl
            .authorize(store.getState().auth.requestToken)
            .then(({ access_token }) => {
                dispatch({type:'SET_ACCESS_TOKEN',payload: access_token})
            });

    const addArticleToPocket = () =>  {
        pl.add(store.getState().auth.accessToken,article).then(()=>{
            dispatch({type:'ADD_ARTICLE_TO_POCKET'})
        })
        .catch(console.error)//TODO dispatch error state
    };

    const accessTokkenAndAddArticle = () => {
        if(!auth.accessToken){
            queryAccessToken
                .then(addArticleToPocket)
                .catch(console.error);
            return;
        }
        addArticleToPocket();
    };

    if (!auth.requestToken) {
        queryRequestToken
            .catch(console.error);
        return;
    }
    accessTokkenAndAddArticle();


};