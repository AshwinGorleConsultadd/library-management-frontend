import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    getCurrentWeather: {
      status: "idle", // idle | loading | succeeded | failed
      data: null,
      error: null,
    },
    getForecastWeather: {
      status: "idle", 
      data: null,
      error: null,
    },
    searchQuery : "india",
  },
  reducers: {
    // For currrent wheather
    getCurrentWeatherReuest: (state) => {
      state.getCurrentWeather.status = "loading";
      state.getCurrentWeather.error = null;
    },
    getCurrentWeatherSuccess: (state, action) => {
      (state.getCurrentWeather.status = "succeeded"), (state.getCurrentWeather.data = action.payload);
    },
    getCurrentWeatherFailure: (state, action) => {
      (state.getCurrentWeather.status = "failed"), (state.getCurrentWeather.error = action.payload);
    },
    clearGetCurrentWeatherSatus: (state) => {state.getCurrentWeather.status = "idle"},
    clearGetCurrentWeatherError: (state) => {state.getCurrentWeather.data = null},
    clearGetCurrentWeatherData: (state) => {state.getCurrentWeather.error = null},

    // For forecast weather
    getForecastWeatherReuest: (state) => {
      state.getCurrentWeather.status = "loading";
      state.getCurrentWeather.error = null;
    },
    getForecastWeatherSuccess: (state, action) => {
      (state.getCurrentWeather.status = "succeeded"), (state.getCurrentWeather.data = action.payload);
    },
    getForecastWeatherFailure: (state, action) => {
      (state.getCurrentWeather.status = "failed"), (state.getCurrentWeather.error = action.payload);
    },
    clearGetForecastWeatherSatus: (state) => {state.getForecastWeather.status = "idle"},
    clearGetForecastWeatherError: (state) => {state.getForecastWeather.data = null},
    clearGetForecastWeatherData: (state) => {state.getForecastWeather.error = null},

    // For search query
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  },
});

export const weatherActions  = weatherSlice.actions;
export default weatherSlice.reducer;