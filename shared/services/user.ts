import authHeader from "../helpers/auth-header";
import { mainURL, reduxConstants } from "../constants/constants";
import {
	storeNewToken,
	storeToLocalStorage,
} from "../../shared/helpers/helper";

const userService = {
	login,
	// updateUser,
	// updatePassword,
	getUserProfile,
	// updateUserAvatar,
	// getUserCompanyProfile,
	// updateUserCompanyProfile,
	register,
	registerMultiPart,
	logout,
	forgotPassword,
	// refreshToken,
	forgottenPassword,
	resetPassword,
	resendVerificationEmail,
	// socialAuth,
	// generatePhoneCode,
	// verifyPhoneCode
};

function login(user: any) {
	return fetch(
		mainURL + reduxConstants.LOGIN_PATH,
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
		reduxConstants.MAIN_API_URL + reduxConstants.ME,
		authHeader.requestOptionsGET("GET") as RequestInit
	)
		.then(authHeader.handleResponse)
		.then((data) => {
			localStorage.setItem("USER", JSON.stringify(data));
			return data;
		});
}
/* function updatePassword(password: any) {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.UPDATE_PASSWORD_PATH,
		authHeader.requestOptionsPOST(password, "POST")
	)
		.then(authHeader.handleResponse)
		.then((data) => {
			localStorage.setItem("USER_PROFILE", JSON.stringify(data?.data?.user));
			return data;
		});
} */
/* function updateUserAvatar(user: any) {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.USER_AVATAR_UPLOAD,
		authHeader.multipartRequestOptionsPOST(user, "POST")
	)
		.then(authHeader.handleResponse)
		.then((data) => {
			return data;
		});
} */
/* function updateUser(user: any) {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.USER_PATH,
		authHeader.requestOptionsPOST(user, "PUT")
	)
		.then(authHeader.handleResponse)
		.then((data) => {
			return data;
		});
} */
function registerMultiPart(user: any) {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.REGISTER_PATH,
		authHeader.multipartRequestOptionsPOST(user, "POST") as RequestInit
	).then(authHeader.handleResponse)
		.then((data) => {
			storeToLocalStorage(data);
			return data;
		});
}

function register(user: any) {
	return fetch(
		mainURL + reduxConstants.REGISTER_PATH,
		authHeader.requestOptionsPOST(user, "POST") as RequestInit
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
		authHeader.requestOptionsPOST(email, "POST") as RequestInit
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
function resetPassword(passwordData: any) {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.RESET_PASSWORD_PATH,
		authHeader.requestOptionsPOST(passwordData, "POST") as RequestInit
	)
		.then(authHeader.handleResponse)
		.then((data) => {
			return data;
		});
}
function resendVerificationEmail(data: any) {
	return fetch(
		reduxConstants.MAIN_API_URL + reduxConstants.RESENED_FORGOTTEN_PASSWORD,
		authHeader.requestOptionsPOST(data, "POST") as RequestInit
	)
		.then(authHeader.handleResponse)
		.then((data) => {
			return data;
		});
}

export default userService;
