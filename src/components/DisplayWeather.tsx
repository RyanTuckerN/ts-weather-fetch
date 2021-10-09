interface DisplayWeatherProps {
  temperature: number | null;
}
const DisplayWeather = (props: DisplayWeatherProps) => {
  const { temperature } = props;
  return (
    <>
      <p>{temperature ? `It is currently ${temperature}°F` : null}</p>
    </>
  );
};

export default DisplayWeather;