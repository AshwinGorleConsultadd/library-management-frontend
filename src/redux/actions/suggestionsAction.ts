import  {suggestionsActions} from '../sclices/suggestionsSlice' 
import axiosClient from "../../lib/exios";
export const getSuggestions = (query : string) => {
    return async (dispatch: any) => {
        try{
            console.log("get-suggestions-request ", query);
            dispatch(suggestionsActions.getSuggestionsReuest())
            const respose = await axiosClient.get("/search.json", {
                params: {
                    q: query
                }
            });
            console.log("get-suggestions-response ", respose.data);
            dispatch(suggestionsActions.getSuggestionsSuccess(respose.data)); 
        }catch (error) {
            console.log("get-suggestions-error ", error);
            dispatch(suggestionsActions.getSuggestionsFailure(error instanceof Error ? error.message : "An error occurred"));
        }
    }
}
