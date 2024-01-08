export const renderThumbnail = (imgData) => {
  if (imgData === null) return null;
  return URL.createObjectURL(imgData);
};

export function byteArrayToDataURL(byteArray, mimeType = "image/jpeg") {
  if (byteArray === null) return null;
  const base64String = btoa(
    new Uint8Array(byteArray).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  return `data:${mimeType};base64,${base64String}`;
}

export function fileToByteArray(file, callback) {
  const reader = new FileReader();

  reader.onload = function (event) {
    const arrayBuffer = event.target.result;
    const uint8Array = new Uint8Array(arrayBuffer);
    const byteArray = Array.from(uint8Array);

    if (typeof callback === "function") {
      callback(byteArray);
    }
  };

  reader.onerror = function (event) {
    console.error("File could not be read! Code " + event.target.error.code);
  };

  reader.readAsArrayBuffer(file);
}
