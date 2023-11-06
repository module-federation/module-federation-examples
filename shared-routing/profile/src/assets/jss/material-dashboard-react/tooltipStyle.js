import { blackColor, hexToRgb } from './assets/jss/material-dashboard-react.js';

const tooltipStyle = {
  tooltip: {
    padding: '10px 15px',
    minWidth: '130px',
    lineHeight: '1.7em',
    border: 'none',
    borderRadius: '3px',
    boxShadow:
      '0 8px 10px 1px rgba(' +
      hexToRgb(blackColor) +
      ', 0.14), 0 3px 14px 2px rgba(' +
      hexToRgb(blackColor) +
      ', 0.12), 0 5px 5px -3px rgba(' +
      hexToRgb(blackColor) +
      ', 0.2)',
    maxWidth: '200px',
    textAlign: 'center',
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: '400',
    textShadow: 'none',
    textTransform: 'none',
    letterSpacing: 'normal',
    wordBreak: 'normal',
    wordSpacing: 'normal',
    wordWrap: 'normal',
    whiteSpace: 'normal',
    lineBreak: 'auto',
  },
};
export default tooltipStyle;
