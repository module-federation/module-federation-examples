const initialState = {
  appName: 'remoteApp',
};

const CHANGE_APP_NAME = 'CHANGE_APP_NAME';

const changeAppNameAction = appName => {
  return { type: CHANGE_APP_NAME, payload: appName };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_APP_NAME: {
      return {
        ...state,
        appName: action.payload,
      };
    }
  }
  return state;
};

export { changeAppNameAction };
export default reducer;
