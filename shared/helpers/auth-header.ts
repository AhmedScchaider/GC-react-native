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

export function tokenHeader() {
  let token =
    localStorage.getItem("TOKEN") !== "undefined"
      ? JSON.parse(localStorage.getItem("TOKEN") as string)
      : undefined;
  if (token && token) {
    return "Bearer " + token;
  } else {
    return undefined;
  }
}

function multipartRequestOptionsPOST(object: any, method: any) {
  const requestOptions = {
    method: method,
    headers: {
      // "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      //"X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      Authorization: tokenHeader(),
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
function requestOptionsPOST(object: any, method: any) {
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      // "Accept": "application/json",
      Authorization: tokenHeader(),
    },
    body: JSON.stringify(object),
  };

  return requestOptions;
}
function requestOptionsDELETE(method: any) {
  const requestOptions = {
    method: method,
    headers: { Authorization: tokenHeader() },
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
function requestOptionsGETGzip(method: any) {
  const requestOptions = {
    method: method,
    headers: {
      "Content-Encoding": "gzip",
      // "Accept-Encoding": "gzip",
      // "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
      // "Access-Control-Allow-Origin": "*",
      // "Content-Type": "application/json",
      // "Accept": "application/json",
      Authorization: tokenHeader(),
    },
  };

  return requestOptions;
}
function requestOptionsGET(method: any) {
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: tokenHeader(),
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
function handleResponse(response: any) {
  return response.text().then((text: any) => {
    var data: any = "";
    if (response.status == 200) {
      if (
        /^[\],:{}\s]*$/.test(
          text
            .replace(/\\["\\\/bfnrtu]/g, "@")
            .replace(
              /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
              "]",
            )
            .replace(/(?:^|:|,)(?:\s*\[)+/g, ""),
        )
      ) {
        data = text && JSON.parse(text);
      }
    } else {
      if (response.status === 401) {
        window.location.href = "/";
        // auto logout if 401 response returned from api
        // location.reload();
      }

      const error = (data && data?.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
export default authHeader;
