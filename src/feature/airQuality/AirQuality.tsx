import React, { useEffect, useState, useRef } from 'react';
import { MapRef, Marker } from 'react-map-gl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { StyleCities } from './AirQuality.style';
import {
  AirQualityDataType,
  initialPopData,
  LatitudeLongitudeType
} from '../../component/map/Map.type';
import { STMap } from '../../component/map/Map';
import { zoomToLocation } from '../../utilities/helper';
import axios from 'axios';
import { AIR_QUALITY_RESPONSE } from '../../mockData/responses';

const AirQuality: React.FC = () => {
  const mapRefElement = useRef<MapRef>() as React.MutableRefObject<MapRef>;
  const [popupInfo, setPopupInfo] = useState<AirQualityDataType>(initialPopData);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [airQualityData, setAirQualityData] = useState<AirQualityDataType[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('Delhi');


  useEffect(() => {
    getCityAirQualityData(selectedCity)
  }, []);

  const getCityAirQualityData = (selectedCity: string) => {

    // With Actual API call

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': '15dda988bce7be876a9ac92dc8013fdfd2a606c4233617e289675e6ed0e0af66'
    }
    axios.get(`https://api.ambeedata.com/latest/by-city?city=${selectedCity}`, {
      headers: headers
    })
      .then(function (response) {
        // handle success
        console.log(response);
        setAirQualityData(response.data.stations)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

    /**
     * Without API call
     * We don't need to dependent on API call if we used below code
     */
    // var result = AIR_QUALITY_RESPONSE.find(data => {
    //   return data.city === selectedCity
    // })
    // setAirQualityData([result as AirQualityDataType])

  }

  const handleMarkerClick = (
    data: AirQualityDataType,
    lng: number,
    lat: number
  ) => {
    zoomToLocation(mapRefElement, {
      lng,
      lat
    });
    setPopupInfo({ ...data, lat, lng });
    setShowPopup(true);
  };
  const handleInfoPopupClose = (val: boolean): void => {
    setShowPopup(val);
  };
  const handleSelectedCity = (event: SelectChangeEvent) => {
    const city = event.target.value as string
    setSelectedCity(city);
    getCityAirQualityData(city)
  };
  return (
    <>
      <StyleCities sx={{ minWidth: 120 }} style={{ margin: '10px' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCity}
            label="Age"
            onChange={handleSelectedCity}
          >
            <MenuItem value='Delhi'>Delhi</MenuItem>
            <MenuItem value='Mumbai'>Mumbai</MenuItem>
            <MenuItem value='Ahmedabad'>Ahmedabad</MenuItem>
            <MenuItem value='Benglore'>Benglore</MenuItem>
          </Select>
        </FormControl>
      </StyleCities>
      <STMap
        navigationControl={true}
        showInfoPopup={showPopup}
        infoPopupContent={popupInfo}
        popupClose={(data: boolean) => handleInfoPopupClose(data)}
        ref={mapRefElement}
      >
        {airQualityData && airQualityData.map((popItem: AirQualityDataType) => {
          const { lat, lng } = popItem;
          return (
            <Marker
              key={`${lat} + ${lng}`}
              longitude={lng as number}
              latitude={lat as number}
              anchor="top"
              scale={0.5}
              onClick={() =>
                handleMarkerClick(popItem, lng, lat)
              }
            >
            </Marker>
          );
        })}
      </STMap>
    </>
  );
};

export default AirQuality;
