const BASE_URL = "http://json.ffwagency.md/";

export const getData = ({ path = "", onError = (err) => { }, onSuccess = (resp) => { } }) => {
  fetch(BASE_URL + path)
    .then(response => response.json())
    .then(function (response) {
      onSuccess(response);
    })
    .catch(function (error) {
      onError(error);
    });
};