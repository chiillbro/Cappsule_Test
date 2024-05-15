// Function to load state from localStorage
export const loadState = () => {
  try {
    // Retrieve serialized state from localStorage
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Function to save state to localStorage
export const saveState = (state) => {
  try {
    // serialize the state
    const serializedState = JSON.stringify(state);

    // Save the serialized state to localStorage under the key "state"

    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
  }
};
