import {
  createAsyncThunk,
  createReducer,
  createSelector,
} from "@reduxjs/toolkit";
import userService from "../../services/user";
import { RootState } from "../store";
import { objectAPIInitialState } from "../types";
import axios from "axios";

export const userLogin = createAsyncThunk("user/login", async (user: any) => {
  const response = await userService.login(user);
  axios.defaults.headers.common["Authorization"] = `Bearer ${response?.token}`;
  return response;
});
export const userSignup = createAsyncThunk("user/signup", async (user: any) => {
  const response = await userService.register(user);
  return response?.status == true ? response?.user : response;
});

export const userSignupMultiPart = createAsyncThunk(
  "user/signup_multipart",
  async (user: any) => {
    const response = await userService.registerMultiPart(user);
    return response?.status == true ? response?.user : response;
  },
);
export const userLogout = createAsyncThunk("user/logout", async () => {
  const response = await userService.logout();
  return response;
});

export const userResendEmailVerficatoin = createAsyncThunk(
  "user/ResendEmailVerification",
  async (data: any) => {
    const response = await userService.resendVerificationEmail(data);
    return response;
  },
);
export const userForgottenPassword = createAsyncThunk(
  "user/forgottenPassword",
  async (data: any) => {
    const response = await userService.forgottenPassword(data);
    return response;
  },
);
export const userPasswordReset = createAsyncThunk(
  "user/passwordReset",
  async (data: any) => {
    const response = await userService.resetPassword(data);
    return response;
  },
);
// export const userSocialAuth = createAsyncThunk('user/socialAuth', async (data: any) => {
// 	const response = await userService.socialAuth(data);
// 	return response;
// });
export const userMe = createAsyncThunk("user/me", async () => {
  const response = await userService.getUserProfile();
  return response?.data;
});
/* export const userPasswordChange = createAsyncThunk('user/passwordChange', async (data: any) => {
	const response = await userService.updatePassword(data);
	return response;
});
export const userGeneratePhoneCode = createAsyncThunk('user/generatePhoneCode', async (data: any) => {
	const response = await userService.generatePhoneCode(data);
	localStorage.setItem("USER", JSON.stringify(response))
	return response;
});
export const userVerifyPhoneCode = createAsyncThunk('user/verfyPhoneCode', async (data: any) => {
	const response = await userService.verifyPhoneCode(data);
	return response;
}); */

export const userReducer = createReducer(objectAPIInitialState, (builder) => {
  builder
    /* .addCase(userUploadAvatar.pending, state => {
			state.pending = true;
		})
		.addCase(userUploadAvatar.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(userUploadAvatar.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(userUpdate.pending, state => {
			state.pending = true;
		})
		.addCase(userUpdate.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(userUpdate.rejected, state => {
			state.pending = false;
			state.error = true;
		}) */
    .addCase(userLogin.pending, (state) => {
      state.pending = true;
    })
    .addCase(userLogin.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.data = payload;
    })
    .addCase(userLogin.rejected, (state) => {
      state.pending = false;
      state.error = true;
    })
    .addCase(userSignupMultiPart.pending, (state) => {
      state.pending = true;
    })
    .addCase(userSignupMultiPart.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.data = payload;
    })
    .addCase(userSignupMultiPart.rejected, (state) => {
      state.pending = false;
      state.error = true;
    })
    .addCase(userSignup.pending, (state) => {
      state.pending = true;
    })
    .addCase(userSignup.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.data = payload;
    })
    .addCase(userSignup.rejected, (state) => {
      state.pending = false;
      state.error = true;
    })
    .addCase(userLogout.pending, (state) => {
      state.pending = true;
    })
    .addCase(userLogout.fulfilled, (state) => {
      state.pending = false;
      state.data = objectAPIInitialState.data;
    })
    .addCase(userLogout.rejected, (state) => {
      state.pending = false;
      state.error = true;
    })

    .addCase(userResendEmailVerficatoin.pending, (state) => {
      state.pending = true;
    })
    .addCase(userResendEmailVerficatoin.fulfilled, (state) => {
      state.pending = false;
      state.data = objectAPIInitialState.data;
    })
    .addCase(userResendEmailVerficatoin.rejected, (state) => {
      state.pending = false;
      state.error = true;
    })
    .addCase(userForgottenPassword.pending, (state) => {
      state.pending = true;
    })
    .addCase(userForgottenPassword.fulfilled, (state) => {
      state.pending = false;
      state.data = objectAPIInitialState.data;
    })
    .addCase(userForgottenPassword.rejected, (state) => {
      state.pending = false;
      state.error = true;
    })
    .addCase(userPasswordReset.pending, (state) => {
      state.pending = true;
    })
    .addCase(userPasswordReset.fulfilled, (state) => {
      state.pending = false;
      state.data = objectAPIInitialState.data;
    })
    .addCase(userPasswordReset.rejected, (state) => {
      state.pending = false;
      state.error = true;
    })
    /* .addCase(userSocialAuth.pending, state => {
			state.pending = true;
		})
		.addCase(userSocialAuth.fulfilled, (state) => {
			state.pending = false;
			state.data = objectAPIInitialState.data;
		})
		.addCase(userSocialAuth.rejected, state => {
			state.pending = false;
			state.error = true;
		}) */
    .addCase(userMe.pending, (state) => {
      state.pending = true;
    })
    .addCase(userMe.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.data = payload;
    })
    .addCase(userMe.rejected, (state) => {
      state.pending = false;
      state.error = true;
    });
  /* .addCase(userPasswordChange.pending, state => {
		state.pending = true;
	})
	.addCase(userPasswordChange.fulfilled, (state) => {
		state.pending = false;
		state.data = objectAPIInitialState.data;
	})
	.addCase(userPasswordChange.rejected, state => {
		state.pending = false;
		state.error = true;
	})
	.addCase(userVerifyPhoneCode.pending, state => {
		state.pending = true;
	})
	.addCase(userVerifyPhoneCode.fulfilled, (state, { payload }) => {
		state.pending = false;
		state.data = {...state.data, verifyphonecode:payload};
	})
	.addCase(userVerifyPhoneCode.rejected, state => {
		state.pending = false;
		state.error = true;
	})
	.addCase(userGeneratePhoneCode.pending, state => {
		state.pending = true;
	})
	.addCase(userGeneratePhoneCode.fulfilled, (state, { payload }) => {
		state.pending = false;
		state.data = payload;
	})
	.addCase(userGeneratePhoneCode.rejected, state => {
		state.pending = false;
		state.error = true;
	}) */
});

export default userReducer;

export const selectUser = (state: RootState) => state.user;

export const userSelector = createSelector(selectUser, (state) => state);
