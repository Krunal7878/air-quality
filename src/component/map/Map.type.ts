export interface AnyObj {
  [key: string]:
  | string
  | null
  | boolean
  | undefined
  | number
  | []
  | Array<string>;
}
export interface AirQualityDataType {
  CO: number,
  NO2: number,
  OZONE: number,
  PM10: number,
  PM25: number,
  SO2: number,
  city: string,
  countryCode: string,
  division: string,
  lat: number,
  lng: number,
  placeName: string,
  postalCode: string,
  state: string,
  updatedAt: string,
  AQI: number,
  aqiInfo: {
    pollutant: string,
    concentration: number,
    category: string
  }
}
export const initialPopData = {

  CO: 0.796,
  NO2: 6.155,
  OZONE: 30.429,
  PM10: 73.252,
  PM25: 42.119,
  SO2: 6.461,
  city: "North West Delhi",
  countryCode: "IN",
  division: "Delhi North",
  lat: 28.707339,
  lng: 77.090242,
  placeName: "Budh Vihar",
  postalCode: "110086",
  state: "DELHI",
  updatedAt: "2023-06-06T15:00:00.000Z",
  AQI: 117,
  aqiInfo: {
    pollutant: "PM2.5",
    concentration: 42.119,
    category: "Unhealthy for Sensitive Groups"
  }

};


export type LatitudeLongitudeType = {
  [key: string]: AirQualityDataType;
};
