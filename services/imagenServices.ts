export const getImageURI = async (uri: string): Promise<Blob> => {
  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError("Error al obtener la imagen"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  return blob;
};

export const SendImage = async (blob: Blob, name: string) => {
  const formData = new FormData();
  formData.append("image", blob, name);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://127.0.0.1:3000/image/upload", true);
  xhr.setRequestHeader("Content-Type", "multipart/form-data");
  xhr.onload = function () {
    console.log("respuesta de la peticion: ");
    console.log(xhr.responseText);
  };
  xhr.onerror = function (err) {
    console.log("error al hacer la peticion: ");
    console.log(err);
  };
  xhr.send(formData);
};
