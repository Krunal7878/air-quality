import React from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Typography
} from '@mui/material/';
import { AirQualityDataType  } from './Map.type';
import {
  StyledTableCell,
  StyledPopup
} from './Map.style';

interface InfoModalProps {
  popupInfo: AirQualityDataType ;
  handlePopupClick: (val: boolean) => void;
  showDefault: boolean | undefined;
  children?: JSX.Element | JSX.Element[] | string;
}
const InfoModal: React.FC<InfoModalProps> = ({
  popupInfo,
  handlePopupClick,
  showDefault = true,
  children
}) => {
  const {
    lng,
    lat,
    city,
    AQI,
    CO,
    NO2,
    OZONE,
    SO2
  } = popupInfo as AirQualityDataType;
  return (
    <StyledPopup
      longitude={lng as number}
      latitude={lat as number}
      anchor="bottom"
      closeOnClick={false}
      onClose={() => handlePopupClick(false)}
      maxWidth="25%"
    >
      {showDefault && (
        <>
          <div>
            {' '}
            <Typography component="span" variant="body2" px={2}>
              {city}
            </Typography>
          </div>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell>AQI</StyledTableCell>
                  <StyledTableCell>CO</StyledTableCell>
                  <StyledTableCell>NO2</StyledTableCell>
                  <StyledTableCell>OZONE</StyledTableCell>
                  <StyledTableCell>SO2</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <StyledTableCell>{AQI}</StyledTableCell>
                  <StyledTableCell>{CO}</StyledTableCell>
                  <StyledTableCell>{NO2}</StyledTableCell>
                  <StyledTableCell>{OZONE}</StyledTableCell>
                  <StyledTableCell>{SO2}</StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {children}
    </StyledPopup>
  );
};

export default InfoModal;
