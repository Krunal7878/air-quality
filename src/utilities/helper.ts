import { MapRef } from 'react-map-gl';

export function zoomToLocation(
    mapref: React.MutableRefObject<MapRef>,
    data: {
      [key: string]: number;
    }
  ) {
    if (mapref?.current) {
      mapref.current?.flyTo({
        center: [data.lng ?? 0.0, data.lat ?? 0.0],
        duration: data.duration ?? 2000,
        essential: true,
        zoom:
          data.zoom ?? mapref.current.getZoom() >= 4
            ? mapref.current.getZoom()
            : 4
      });
    }
  }
  