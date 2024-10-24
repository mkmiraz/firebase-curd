import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireapp } from "./app";
import { getStorage } from "firebase/storage";
import { deleteObject, ref } from "firebase/storage";

const storage = getStorage();

const db = getFirestore(fireapp);

// export const getAllDeves = async (collName) => {
//   const deves = await getDocs(collection(db, collName));
//   const dataList = [];
//   deves.forEach((items) => {
//     dataList.push(items.data());
//   });
//   return dataList;
// };

// create docs

export const createDocs = async (collName, data) => {
  const res = await addDoc(collection(db, collName), data);
  return res.data();
};

// get deos

export const getAllDeves = (collName, setDeves) => {
  onSnapshot(
    query(collection(db, collName), orderBy("createdAt", "desc")),

    (snapshot) => {
      const dataList = [];
      snapshot.docs.forEach((item) => {
        dataList.push({ ...item.data(), id: item.id });
      });
      setDeves(dataList);
    }
  );
};

/**
 * Delete data item
 */

export const deleteData = async (colName, id, fileLink) => {
  try {
    const desertRef = ref(storage, fileLink);
    await deleteObject(desertRef);

    await deleteDoc(doc(db, colName, id));

    console.log("Data deleted successfully!");
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

/**
 * Single Show Data
 */

export const singleShow = async (colName, setSingledata, id) => {
  const data = await getDoc(doc(db, colName, id));
  setSingledata(data.data());
};
