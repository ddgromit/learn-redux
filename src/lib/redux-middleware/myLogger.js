export default function myLogger({ getState, dispatch }) {
  return (next) => (action) => {
    console.log('called middleware before with state', getState(), action);
    let result = next(action);
    console.log('called middleware after with state', getState(), result);
    return result;
  };
}
