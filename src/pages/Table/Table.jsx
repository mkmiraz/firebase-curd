import { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {
  createDocs,
  deleteData,
  getAllDeves,
  singleShow,
} from "../../firebase/devesModel";
import { serverTimestamp } from "firebase/firestore";
import { fileUpload } from "../../firebase/fileData";
import { IoMdClose } from "react-icons/io";

const Table = () => {
  const [deves, setDeves] = useState([]);
  const [file, setFile] = useState(null);
  const [single, setSingle] = useState(false);
  const [singledata, setSingledata] = useState([]);

  const [input, setInput] = useState({
    name: "",
    email: "",
    number: "",
  });
  // Input value get handler
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // Create Data item
  const habdleDevesCreate = async (e) => {
    e.preventDefault();

    const fileLink = await fileUpload(file);

    createDocs("deves", {
      ...input,
      status: true,
      trash: false,
      createdAt: serverTimestamp(),
      updatedAt: null,
      photo: fileLink,
    });
    setInput({
      name: "",
      email: "",
      number: "",
    });
    setFile("");
  };

  // Delete data item

  const handleDeleteData = async (id, photo) => {
    deleteData("deves", id, photo);
  };
  // single show handler
  const handleSingleShow = async (id) => {
    setSingle(true);

    singleShow("deves", setSingledata, id);
  };
  useEffect(() => {
    getAllDeves("deves", setDeves);
  }, []);

  return (
    <>
      <section id="table">
        <div className="table_box">
          <div className="form_area">
            <form onSubmit={habdleDevesCreate}>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <input
                type="text"
                name="email"
                value={input.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              <input
                type="text"
                name="number"
                value={input.number}
                onChange={handleInputChange}
                placeholder="Number"
              />
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <button type="submit">Submit</button>
            </form>
          </div>
          <table>
            <thead>
              <tr>
                <th>NO.</th>
                <th>USER NAME</th>
                <th>EMAIL</th>
                <th>NUMBER</th>
                <th>PHOTO</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {deves.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.number}</td>
                    <td>{item?.photo && <img src={item.photo} alt="" />}</td>
                    <td>
                      <button onClick={() => handleSingleShow(item.id)}>
                        <FaEye />
                      </button>
                      <button>
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteData(item.id, item.photo)}
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {single && (
        <div className="single_show_area">
          <div className="card">
            <button onClick={() => setSingle(false)}>
              <IoMdClose />
            </button>

            <img src={singledata.photo} alt="" />
            <div className="teax_area">
              <h2>{singledata.name}</h2>
              <p>miraz@gmail.com</p>
              <span>01303018917</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
