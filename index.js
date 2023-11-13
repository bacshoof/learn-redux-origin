function createStore(reducer) {
  let state = reducer(undefined, {});
  let subscribers = []
  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action)
    subscribers.forEach(item => item())
  }
  function subscribe(subscriber) {
    subscribers.push(subscriber);
  }
  return { getState, dispatch, subscribe };
}

const store = createStore(reducer);

function reducer(state = 0, action) {
  switch (action.type) {
    case "DEPOSIT":
      return state + action.payload;
    case "WITH_DRAW":
      return state - action.payload;
    default:
      return state;
  }
}

function deposit(payload) {
  const action = {
    type: "DEPOSIT",
    payload: payload,
  };
  return action;
}

function withDraw(payload) {
  const action = {
    type: "WITH_DRAW",
    payload: payload,
  };
  return action;
}

store.subscribe(() => {
  render();
});

const scoreElement = document.querySelector("#score");
const depositBtn = document.querySelector("#deposit");
const withdrawBtn = document.querySelector("#with-draw");

function render() {
  scoreElement.innerText = store.getState();
}

depositBtn.addEventListener("click", function () {
  store.dispatch(deposit(10));
});
withdrawBtn.addEventListener("click", function () {
  store.dispatch(withDraw(10));
});

render();
