import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useGetCurrentWeather } from "../../hooks/weather/useGetCurrentWheather";
import Spinner from "../spinner";

export default function WeatherCard() {
  const { data, loading } = useGetCurrentWeather();
  const today = data?.forecast?.forecastday[0];

  return (
    <>
      <Card className="max-w-3xl mx-auto p-6 shadow-2xl rounded-2xl bg-white dark:bg-zinc-900">
        <CardHeader className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-3xl font-bold">
              {data?.location?.name}, {location?.country}
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              {location?.localtime}
            </p>
          </div>
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={`https:${data?.current?.condition?.icon}`}
              alt="weather icon"
            />
          </Avatar>
        </CardHeader>
        {loading ? <Spinner/> :
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-4xl font-bold">{data?.current?.temp_c}°C</p>
            <p className="text-lg text-muted-foreground">
              Feels like {data?.current?.feelslike_c}°C
            </p>
            <p className="text-base mt-2 font-medium">
              Condition: {data?.current?.condition.text}
            </p>
            <div className="mt-4 flex gap-2 flex-wrap">
              <Badge variant="secondary">
                Humidity: {data?.current?.humidity}%
              </Badge>
              <Badge variant="secondary">
                Wind: {data?.current?.wind_kph} kph {data?.current?.wind_dir}
              </Badge>
              <Badge variant="secondary">
                Pressure: {data?.current?.pressure_mb} mb
              </Badge>
              <Badge variant="secondary">UV Index: {data?.current?.uv}</Badge>
              <Badge variant="secondary">
                Visibility: {data?.current?.vis_km} km
              </Badge>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Today's Forecast</h3>
            <div className="grid grid-cols-2 gap-2">
              <p> Max Temp: {today?.day?.maxtemp_c}°C</p>
              <p> Min Temp: {today?.day?.mintemp_c}°C</p>
              <p> Chance of Rain: {today?.day?.daily_chance_of_rain}%</p>
              <p> Max Wind: {today?.day?.maxwind_kph} kph</p>
              <p> Avg Humidity: {today?.day?.avghumidity}%</p>
              <p> UV Index: {today?.day?.uv}</p>
              <p> Sunrise: {today?.astro?.sunrise}</p>
              <p> Sunset: {today?.astro?.sunset}</p>
            </div>
          </div>
        </CardContent>
      }
        <Separator className="my-6" />
        {loading ? (
          <Spinner />
        ) : (
          <CardContent>
            <h3 className="text-lg font-semibold mb-3">
              Hourly Highlights (First 4 Hours)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {today?.hour?.slice(0, 4)?.map((hour: any) => (
                <div
                  key={hour.time}
                  className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 shadow-md text-center"
                >
                  <p className="text-sm font-medium text-muted-foreground">
                    {new Date(hour?.time)?.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <img
                    src={`https:${hour.condition.icon}`}
                    alt="icon"
                    className="mx-auto h-10"
                  />
                  <p className="text-lg font-bold">{hour?.temp_c}°C</p>
                  <p className="text-sm">{hour?.condition?.text?.trim()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </>
  );
}
