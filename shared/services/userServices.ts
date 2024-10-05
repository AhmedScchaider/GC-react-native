import authHeader from "../helpers/authHelpers";
import { reduxConstants } from "../constants";
import {
	storeNewToken,
	storeToLocalStorage,
} from "../helpers/localHelpers";

const userService = {
	login,
	updateUser,
	updatePassword,
	getUserProfile,
	updateUserAvatar,
	// getUserCompanyProfile,
	// updateUserCompanyProfile,
	register,
	registerMultiPart,
	logout,
	forgotPassword,
	// refreshToken,
	forgottenPassword,
	resendVerificationEmail,
	socialAuth,
	generatePhoneCode,
	verifyPhoneCode
};

function login(user: any) {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.LOGIN_PATH,
		authHeader.requestOptionsPOSTAnonimus(user, "POST")
	)
		.then(authHeader.handleResponse)
		.then((data) => {
			storeToLocalStorage(data);
			return data;
		});
}
function getUserProfile() {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.GET_ME_PATH,
		authHeader.requestOptionsGET("GET")
	)
		.then(authHeader.handleResponse)
		.then((data:any) => {
			localStorage.setItem("USER", JSON.stringify(data?.user));
			return data;
		});
}
function updatePassword(password: any) {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.UPDATE_PASSWORD_PATH,
		authHeader.requestOptionsPOST(password, "POST")
	)
		.then(authHeader.handleResponse)
		.then((data:any) => {
			localStorage.setItem("USER_PROFILE", JSON.stringify(data?.data?.user));
			return data;
		});
}
function updateUserAvatar(user: any) {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.USER_AVATAR_UPLOAD,
		authHeader.multipartRequestOptionsPOST(user, "POST")
	)
		.then(authHeader.handleResponse)
		.then((data) => {
			return data;
		});
}
function updateUser(user: any) {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.USER_PATH,
		authHeader.requestOptionsPOST(user, "PUT")
	)
		.then(authHeader.handleResponse)
		.then((data) => {
			return data;
		});
}
function registerMultiPart(user: any) {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.REGISTER_PATH,
		authHeader.multipartRequestOptionsPOST(user, "POST")
	).then(authHeader.handleResponse)
		.then((data) => {
			storeToLocalStorage(data);
			return data;
		});
}

function register(user: any) {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.REGISTER_PATH,
		authHeader.requestOptionsPOST(user, "POST")
	)
		.then(authHeader.handleResponse)
		.then((data) => {
			storeToLocalStorage(data);
			return data;
		});
}

function logout() {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.LOGOUT_PATH,
		authHeader.requestOptionsGET_Token(authHeader.tokenHeader(), "GET")
	)
		.then(authHeader.handleResponse)
		.then((data) => {
			localStorage.clear();
			return data;
		});
}

function forgotPassword(email: any) {
	return fetch(
		"/api/forgot_password",
		authHeader.requestOptionsPOST(email, "POST")
	)
		.then(authHeader.handleResponse)
		.then((data) => {
			return data;
		});
}
// function refreshToken(refreshToken:any) {
// 	return fetch(
// 		reduxConstants.MAIN_API_URL + reduxConstants.REFRESH_TOKEN_PATH,
// 		authHeader.requestOptionsPOST(
// 			{
// 				refreshToken: JSON.parse(localStorage.getItem("REFRESH_TOKEN")),
// 			},
// 			"POST"
// 		)
// 	)
// 		.then(authHeader.handleResponse)
// 		.then((data) => {
// 			storeNewToken(data);
// 			return data;
// 		});
// }

function forgottenPassword(email: any) {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.FORGOTTEN_PASSWORD_PATH,
		authHeader.requestOptionsPOSTAnonimus(email, "POST")
	)
		.then(authHeader.handleResponse)
		.then((data) => {
			return data;
		});
}
function resendVerificationEmail(data: any) {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.RESENED_FORGOTTEN_PASSWORD,
		authHeader.requestOptionsPOST(data, "POST")
	)
		.then(authHeader.handleResponse)
		.then((data) => {
			return data;
		});
}
function socialAuth(data: any) {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.SOCIAL_AUTH,
		authHeader.requestOptionsPOST(data, "POST")
	)
		.then(authHeader.handleResponse)
		.then((data) => {
			return data;
		});

}
function generatePhoneCode(data: any) {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.GENERATE_PHONE_CODE,
		authHeader.requestOptionsPOST(data, "POST")
	)
		.then(authHeader.handleResponse)
		.then((data:any) => {
			if (data.status){

				localStorage.setItem("USER", JSON.stringify({ ...data?.user, phonecode: data?.phonecode }))
				return { ...data?.user, phonecode: data?.phonecode };
			}else{
				return data;
			}
		});


}
function verifyPhoneCode(data: any) {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.VERIFY_PHONE_CODE,
		authHeader.requestOptionsPOST(data, "POST")
	)
		.then(authHeader.handleResponse)
		.then((data) => {
			return data;
		});



}
export default userService;

