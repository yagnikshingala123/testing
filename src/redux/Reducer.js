const initialState = {
  data: [],
  formData: {},
};

const handleUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_SUBMIT":
      return {
        ...state,
        data: [...action.payload],
      };

    case "USER_EDIT":
      let editData = state.data.find((item, index) => index === action.payload);
      return {
        ...state,
        formData: editData,
      };

    default:
      break;
  }
};

export default handleUserReducer;
