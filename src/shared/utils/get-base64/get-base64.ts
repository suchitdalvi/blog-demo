export const getBase64 = (file: Blob) => {
    return new Promise((resolve) => {
      let baseURL: string | ArrayBuffer | null = "";
      let reader = new FileReader();
  
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };