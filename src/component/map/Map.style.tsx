import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled, Typography } from '@mui/material';
import { Popup } from 'react-map-gl';
import { FilterTiltShiftOutlined as FilterTiltShiftOutlinedIcon } from '@mui/icons-material/';

export const MapStyle = {
  width: '100% !important',
  height: 700
};

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#686868'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '0.75rem',
    color: '#808080'
  }
}));


export const StyledPopup = styled(Popup)`
  .mapboxgl-popup-content {
    border-radius: 10px;
    padding: 15px;
  }
  .mapboxgl-popup-close-button:hover {
    background-color: transparent;
  }
`;
