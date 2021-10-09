import { Component } from "react";
import DisplayWeather from "./DisplayWeather";

const openWeatherAPI: string =
  "https://api.openweathermap.org/data/2.5/weather";
const key: string = "4e3b2fbc699bc6dfe7707088a630fb92";

interface FetchProps {}

interface Coordinates {
  lat: number | null;
  lon: number | null;
}

interface FetchState {
  temperature: number | null;
  coordinates: Coordinates;
}

export default class Fetch extends Component<FetchProps, FetchState> {
  constructor(props: FetchProps) {
    super(props);
    this.state = { temperature: null, coordinates: { lat: null, lon: null } };
  }

  getLocation = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        coordinates: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
      });
    });
  };
  weatherFetch = async () => {
    const { lat, lon } = this.state.coordinates;
    const results = await fetch(
      `${openWeatherAPI}?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
    );
    const json = await results.json();
    this.setState({ temperature: Math.floor(json?.main?.temp) ?? null });
  };

  componentDidMount = async () => {
    const { lat, lon } = this.state.coordinates;
    if (!lat || !lon) {
      await this.getLocation();
    } else await this.weatherFetch();
  };

  async componentDidUpdate(prevProps: FetchProps, prevState: FetchState) {
    const { lat, lon } = this.state.coordinates;
    if (
      lat &&
      lon &&
      (lat !== prevState.coordinates.lat || lon !== prevState.coordinates.lon)
    ) {
      await this.weatherFetch();
    }
  }

  render() {
    const { temperature } = this.state;
    return (
      <>
        <h2>
          {temperature
            ? "Here's the temperature!"
            : "Want to know the temperature?"}
        </h2>
        <DisplayWeather temperature={temperature} />
      </>
    );
  }
}
