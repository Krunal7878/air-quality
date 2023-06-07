// Global imports
import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { Map, NavigationControl, MapRef, MapProps } from 'react-map-gl';
import { Box } from '@mui/material';
import { debounce } from 'throttle-debounce';
import 'mapbox-gl/dist/mapbox-gl.css';

// Local imports
import {
  AirQualityDataType,
  initialPopData
} from './Map.type';
import InfoModel from './InfoModel';
import { MapStyle } from './Map.style';
import { settings } from './Map.config';

type Props = {
  navigationControl?: boolean;
  showInfoPopup?: boolean;
  infoPopupContent?: AirQualityDataType;
  children: JSX.Element | JSX.Element[] | string;
  popupClose: (val: boolean) => void;
  showDefaultInfoPopup?: boolean;
  customInfoPopup?: JSX.Element | JSX.Element[] | string;
} & MapProps;

export const STMap = forwardRef<MapRef, Props>((props, ref) => {
  const {
    navigationControl,
    showInfoPopup = false,
    infoPopupContent = { ...initialPopData },
    showDefaultInfoPopup,
    customInfoPopup
  } = props;
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 22,
    longitude: 27,
    zoom: 1.5
  });
  const mapWrapper = useRef<HTMLDivElement>(null);
  const handleElementResized = debounce(300, () => {
    if (ref && typeof ref !== 'function') {
      ref?.current?.resize();
    }
  });
  const resizeObserver = new ResizeObserver(handleElementResized);

  useEffect(() => {
    if (mapWrapper.current) {
      resizeObserver.observe(mapWrapper.current);
    }
    return function cleanup() {
      resizeObserver.disconnect();
    };
  });
  return (
    <Box data-testid="map" id="map" ref={mapWrapper}>
      <Map
        ref={ref}
        {...selectedLocation}
        onMove={(evt: any) => setSelectedLocation(evt.viewState)}
        style={MapStyle}
        mapboxAccessToken={process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN}
        {...settings}
        {...props}
        fog={undefined}
        terrain={undefined}
      >
        {navigationControl && <NavigationControl showCompass={false} />}
        {props.children}
        {showInfoPopup && (
          <InfoModel
            popupInfo={infoPopupContent}
            handlePopupClick={props.popupClose}
            showDefault={showDefaultInfoPopup}
          >
            {customInfoPopup}
          </InfoModel>
        )}
      </Map>
    </Box>
  );
});
STMap.displayName = 'STMap';
