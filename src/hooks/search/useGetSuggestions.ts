import { useEffect, useState } from "react";
import { getSuggestions } from "../../redux/actions/suggestionsAction";// adjust the import path
import { useAppDispatch, useAppSelector } from "../../hooks";


export const useGetSuggestions = () => {
  const dispatch = useAppDispatch();
  const sugggestionsQuery = useAppSelector(state => state.suggestions.suggestionsQuery);
  const { status, data } = useAppSelector(
    (state: any) => state.suggestions.getSuggestions
  );

  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (sugggestionsQuery) {
      dispatch(getSuggestions(sugggestionsQuery));
    }
  }, [dispatch, sugggestionsQuery]);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  return { data, loading };
};
