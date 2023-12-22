import CelsiusInput from "./CelsiusInput";
import AnotherCelsiusInput from "./AnotherCelsiusInput";

interface Temperature {
  value: string;
}

export default function TemperatureConverter() {
  return (
    <div>
      <h1>☃️ Temperature Converter 🌞</h1>
      {/* 기존 render props */}
      {/* <CelsiusInput
        render={(temperature: string) => (
          <>
            <KelvinTemperature value={temperature} />
            <FahrenheitTemperature value={temperature} />
          </>
        )}
      /> */}
      {/* children props */}
      {
        <AnotherCelsiusInput>
          {(temperature: string) => (
            <>
              <KelvinTemperature value={temperature} />
              <FahrenheitTemperature value={temperature} />
            </>
          )}
        </AnotherCelsiusInput>
      }
    </div>
  );
}

function KelvinTemperature({ value }: Temperature) {
  return <div>{(parseInt(value) || 0) + 273.15}K</div>;
}

function FahrenheitTemperature({ value }: Temperature) {
  return <div>{((parseInt(value) || 0) * 9) / 5 + 32}°F</div>;
}
