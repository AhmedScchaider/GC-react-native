import authHeader, { tokenHeader } from "../helpers/authHelpers";

const generalService = {
	getGeneral,
	getGeneralAnonimus,
	addGeneral, addGeneralMultiPart,
	addAnonimusGeneral,
	updateGeneral,
	deleteGeneral,
	handleInputChange,
	printFile,
};

function getGeneral(path: string) {
	return fetch(path, authHeader.requestOptionsGET("GET") as RequestInit)
		.then(authHeader.handleResponse)
		.then((data) => {
			return data;
		}).catch((error) => {
            console.error("An error occurred:", error);
            throw error; // Re-throw the error for further handling if needed
        });;
}
function getGeneralAnonimus(path: string) {
	return fetch(path, authHeader.requestOptionsGETAnonimus("GET"))
		.then(authHeader.handleResponse)
		.then((data) => {
			return data;
		}).catch((error) => {
            console.error("An error occurred:", error);
            throw error; // Re-throw the error for further handling if needed
        });;
}
function addGeneralMultiPart(path: string, data: any) {
	return fetch(path, authHeader.multipartRequestOptionsPOST(data, "POST"))
		.then(authHeader.handleResponse)
		.then((data_) => {
			return data_;
		}).catch((error) => {
            console.error("An error occurred:", error);
            throw error; // Re-throw the error for further handling if needed
        });;
}
function addAnonimusGeneral(path: string, data: any) {
	return fetch(path, authHeader.requestOptionsPOSTAnonimus(data, "POST"))
		.then(authHeader.handleResponse)
		.then((data_) => {
			return data_;
		}).catch((error) => {
            console.error("An error occurred:", error);
            throw error; // Re-throw the error for further handling if needed
        });;
}
function addGeneral(path: string, data: any) {
	return fetch(path, authHeader.requestOptionsPOST(data, "POST"))
		.then(authHeader.handleResponse)
		.then((data_) => {
			return data_;
		}).catch((error) => {
            console.error("An error occurred:", error);
            throw error; // Re-throw the error for further handling if needed
        });
}

function updateGeneral(path: string, data: any) {
	return fetch(path, authHeader.requestOptionsPOST(data, "PATCH"))
		.then(authHeader.handleResponse)

		.then((data_) => {
			return data_;
		}).catch((error) => {
            console.error("An error occurred:", error);
            throw error; // Re-throw the error for further handling if needed
        });;
}
function deleteGeneral(path: string, id?: string) {

	return fetch(path + (id == "" ? "" : ("/" + id)), authHeader.requestOptionsDELETE('DELETE'))
		.then(authHeader.handleResponse)
		.then((data) => {
			return data;
		}).catch((error) => {
            console.error("An error occurred:", error);
            throw error; // Re-throw the error for further handling if needed
        });;
}

function handleInputChange(formInputs: any, event: any) {
	return { ...formInputs, [event.target.name]: event.target.value };
}

function printFile(url: string) {
	window.open(url, "_blank");
}

export default generalService;

