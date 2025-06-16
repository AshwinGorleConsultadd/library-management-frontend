import { weatherActions } from "../sclices/weatherSlice";
import axiosClient from "../../lib/exios";
export const getCurrentWheather = (query : string) => {
    return async (dispatch: any) => {
        try{
            console.log("get-current-weather-request ", query);
            dispatch(weatherActions.getCurrentWeatherReuest())
            const respose = await axiosClient.get("/current.json", {
                params: {
                    q: query
                }
            });
            console.log("get-current-weather-response ", respose.data);
            dispatch(weatherActions.getCurrentWeatherSuccess(respose.data)); 
        }catch (error) {
            console.log("get-current-weather-error ", error);
            dispatch(weatherActions.getCurrentWeatherFailure(error instanceof Error ? error.message : "An error occurred"));
        }
    }
}



export const getForecastWeather = (query: string) => {
  return async (dispatch: any) => {
    try {
      console.log("get-forecast-weather-request ", query);
      dispatch(weatherActions.getForecastWeatherReuest());

      const response = await axiosClient.get("/forecast", {
        params: {
          q: query,
          days: 5, // or however many days you want
        },
      });

      console.log("get-forecast-weather-response ", response.data);
      dispatch(weatherActions.getForecastWeatherSuccess(response.data));
    } catch (error) {
      console.log("get-forecast-weather-error ", error);
      dispatch(
        weatherActions.getForecastWeatherFailure(
          error instanceof Error ? error.message : "An error occurred"
        )
      );
    }
  };
};
