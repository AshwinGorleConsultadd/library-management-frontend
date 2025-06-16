import { useEffect, useState } from "react";
import { getCurrentWheather } from "../../redux/actions/weatherActions"; // adjust the import path
import { useAppDispatch, useAppSelector } from "../../hooks";

export const useGetCurrentWeather = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state: any) => state.weather.searchQuery);
  const { status, data } = useAppSelector(
    (state: any) => state.weather.getCurrentWeather
  );

  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
      dispatch(getCurrentWheather(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  return { data , loading };
};
