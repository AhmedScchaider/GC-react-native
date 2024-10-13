import { keys } from "../constants/constants";
import { getSecureData, storeSecureData } from "./helper";

export const tokenHeader = () => {
  return getSecureData(keys.TOKEN);
};

async function multipartRequestOptionsPOST(object: any, method: any) {
  const token = await tokenHeader();
  const requestOptions = {
    method: method,
    headers: {
      // "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      //"X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      Authorization: token,
    },
    body: object,
  };

  return requestOptions;
}

function requestOptionsPOSTAnonimus(object: any, method: any) {
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  };

  return requestOptions;
}
async function requestOptionsPOST(object: any, method: any) {
  const token = await tokenHeader();
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      // "Accept": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(object),
  };

  return requestOptions;
}
async function requestOptionsDELETE(method: any) {
  const token = await tokenHeader();
  const requestOptions = {
    method: method,
    headers: { Authorization: token },
  };

  return requestOptions;
}

function requestOptionsGET_Token(token: any, method: any) {
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return requestOptions;
}
function requestOptionsGETAnonimus(method: any) {
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return requestOptions;
}
async function requestOptionsGETGzip(method: any) {
  const token = await tokenHeader();
  const requestOptions = {
    method: method,
    headers: {
      "Content-Encoding": "gzip",
      // "Accept-Encoding": "gzip",
      // "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
      // "Access-Control-Allow-Origin": "*",
      // "Content-Type": "application/json",
      // "Accept": "application/json",
      Authorization: token,
    },
  };

  return requestOptions;
}
async function requestOptionsGET(method: any) {
  const token = await tokenHeader();
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
  };

  return requestOptions;
}
function handleResponseGzip(response: any) {
  // const buffer = await response.arrayBuffer();
  // const decompressed = pako.inflate(new Uint8Array(response.arrayBuffer()), { to: 'string' });
  // const unzipped = JSON.parse(
  //   pako.ungzip(new Uint8Array(response.data.arrayBuffer()), { to: "string" }),
  // );
  // return unzipped.text().then((text: any) => {
  //   var data: any = "";
  //   if (unzipped.status == 200) {
  //     if (
  //       /^[\],:{}\s]*$/.test(
  //         text
  //           .replace(/\\["\\\/bfnrtu]/g, "@")
  //           .replace(
  //             /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
  //             "]",
  //           )
  //           .replace(/(?:^|:|,)(?:\s*\[)+/g, ""),
  //       )
  //     ) {
  //       data = text && JSON.parse(text);
  //     }
  //   } else {
  //     if (unzipped.status === 401) {
  //       window.location.href = "/";
  //       // auto logout if 401 response returned from api
  //       // location.reload();
  //     }
  //
  //     const error = (data && data?.message) || unzipped.statusText;
  //     return Promise.reject(error);
  //   }
  //   return data;
  // });
}
async function handleResponse(response: any) {
  try {
    const data = await response.json();
    console.log("response", response);
    return data;
  } catch (error) {
    return error;
  }
}

const authHeader = {
  tokenHeader,
  requestOptionsPOST,
  requestOptionsPOSTAnonimus,
  requestOptionsGETGzip,
  requestOptionsGET,
  requestOptionsGETAnonimus,
  requestOptionsGET_Token,
  multipartRequestOptionsPOST,
  requestOptionsDELETE,
  handleResponseGzip,
  handleResponse,
};
export default authHeader;
