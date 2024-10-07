import pako from 'pako';
import authHeader from "../helpers/auth-header";

const generalService = {
	getGeneral,
	getGeneralGzip,
	getGeneralAnonimus,
	addGeneral, addGeneralMultiPart,
	updateGeneral,
	deleteGeneral,
	handleInputChange,
	printFile,
};

function getGeneralGzip(path: string) {
	return fetch(path, authHeader.requestOptionsGETGzip("GET") as RequestInit)
		.then(authHeader.handleResponse)
		.then((data) => {
			const unzipped = JSON.parse(pako.ungzip(new Uint8Array(data.data.arrayBuffer()), { to: 'string' }));
			return unzipped;
		});
}
function getGeneral(path: string) {
	return fetch(path, authHeader.requestOptionsGET("GET") as RequestInit)
		.then(authHeader.handleResponse)
		.then((data) => {
			return data;
		});
}
function getGeneralAnonimus(path: string) {
	return fetch(path, authHeader.requestOptionsGET("GET") as RequestInit)
		.then(authHeader.handleResponse)
		.then((data) => {
			return data;
		});
}
function addGeneralMultiPart(path: string, data: any) {
	return fetch(path, authHeader.multipartRequestOptionsPOST(data, "POST") as RequestInit)
		.then(authHeader.handleResponse)
		.then((data_) => {
			return data_;
		});
}
function addGeneral(path: string, data: any) {
	return fetch(path, authHeader.requestOptionsPOST(data, "POST") as RequestInit)
		.then(authHeader.handleResponse)
		.then((data_) => {
			return data_;
		});
}

function updateGeneral(path: string, data: any) {
	return fetch(path, authHeader.requestOptionsPOST(data, "PUT") as RequestInit)
		.then(authHeader.handleResponse)
		.then((data_) => {
			return data_;
		});
}
function deleteGeneral(path: string, id: string) {
	return fetch(path + "/" + id, authHeader.requestOptionsDELETE("DELETE") as RequestInit)
		.then(authHeader.handleResponse)
		.then((data) => {
			return data;
		});
}

function handleInputChange(formInputs: any, event: any) {
	return { ...formInputs, [event.target.name]: event.target.value };
}

function printFile(url: string) {
	window.open(url, "_blank");
}

export default generalService;

