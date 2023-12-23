export function convertFileToBytes(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileAsArrayBuffer = event.target.result;
      const bytes = new Uint8Array(fileAsArrayBuffer);
      resolve(bytes);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
}
