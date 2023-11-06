import {
  boxShadow,
  whiteColor,
  grayColor,
  hexToRgb,
} from './assets/jss/material-dashboard-react.js';

const iconsStyle = {
  iframe: {
    width: '100%',
    height: '500px',
    border: '0',
    ...boxShadow,
  },
  iframeContainer: {
    margin: '0 -20px 0',
  },
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(' + hexToRgb(whiteColor) + ',.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: whiteColor,
    },
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: grayColor[1],
      fontWeight: '400',
      lineHeight: '1',
    },
  },
};

export default iconsStyle;
