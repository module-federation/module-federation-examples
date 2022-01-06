import { hexToRgb, blackColor } from '../../material-dashboard-react.js';

const cardAvatarStyle = {
  cardAvatar: {
    '&$cardAvatarProfile img': {
      width: '100%',
      height: 'auto',
    },
  },
  cardAvatarProfile: {
    maxWidth: '130px',
    maxHeight: '130px',
    margin: '-50px auto 0',
    borderRadius: '50%',
    overflow: 'hidden',
    padding: '0',
    boxShadow:
      '0 16px 38px -12px rgba(' +
      hexToRgb(blackColor) +
      ', 0.56), 0 4px 25px 0px rgba(' +
      hexToRgb(blackColor) +
      ', 0.12), 0 8px 10px -5px rgba(' +
      hexToRgb(blackColor) +
      ', 0.2)',
    '&$cardAvatarPlain': {
      marginTop: '0',
    },
  },
  cardAvatarPlain: {},
};

export default cardAvatarStyle;
