const defaultState = {
  name: 'Music Search',
  version: '0.0.1'
};
export default function app(state = defaultState, action) {
  if (action.type === 'GET_APP_VERSION') {
    return action.version;
  }
  return state;
}