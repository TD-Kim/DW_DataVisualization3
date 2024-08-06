import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // 유저 정보
    isAuthenticated: false, // 로그인 상태
    error: null, // 에러 메세지
  },
  reducers: {
    loginSuccess(state, action) {
      setUserState(state, action);
      //   Object.keys(state).forEach((key, i) => {
      //     state[key] = action[i];
      //   });
      //   state.user = action.payload;
      //   state.isAuthenticated = true;
      //   state.error = null;
    },
    loginFailure(state, action) {
      setUserState(state, action);
      //   state.user = null;
      //   state.isAuthenticated = false;
      //   state.error = action.payload;
    },
    logout(state, action) {
      setUserState(state, action);
      //   state.user = null;
      //   state.isAuthenticated = false;
      //   state.error = null;
    },
  },
});

function setUserState(state, action) {
  Object.keys(state).forEach((key, idx) => {
    state[key] = action.payload[idx];
  });
}

export default userSlice;
export const { loginSuccess, loginFailure, logout } = userSlice.actions;
