import { getStorage } from "firebase/storage";
import { fireapp } from "./app";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const fileStorage = getStorage(fireapp);

/**
 * file upload
 */

export const fileUpload = async (file) => {
  const fileData = await uploadBytesResumable(
    ref(fileStorage, file.name),
    file
  );

  const fileLink = await getDownloadURL(fileData.ref);

  return fileLink;
};
