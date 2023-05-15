import { useRef, useState } from "react";
import "./Dropdown.css";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

// drag drop file component
export function DragDropFile({ user }) {
  // file state

  const [files, setFiles] = useState("");

  const [uploadProccess, setUploadProccess] = useState(0);

  // drag state
  const [dragActive, setDragActive] = useState(false);
  // ref
  const inputRef = useRef(null);

  function handleFile(files) {
    setFiles(files);
  }

  // upload file to farebase server
  const HandleUpload = () => {
    if (files) {
      const storage = getStorage();
      const namer = `${new Date()}_${files.name}`;
      const storageRef = ref(storage, namer);
      const uploadTask = uploadBytesResumable(storageRef, files);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get the upload progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          setUploadProccess(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Upload completed successfully
          toast.success("Files uploaded successfully");

          // Save the file URL to Cloud Firestore
          getDownloadURL(storageRef)
            .then((url) => {
              addDoc(collection(db, "files"), {
                fullname: namer,
                name: files.name,
                link: url,
                user: user.uid,
              })
                .then((docRef) => {
                  console.log(`Document written with ID: ${docRef.id}`);
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      );
      setFiles("");
    } else {
      alert("file not selected ");
    }
  };

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFiles(e.target.files[0]);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        multiple={true}
        onChange={handleChange}
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : ""}
      >
        <div>
          <p>Drag and drop your file here or</p>
          <button className="upload-button" onClick={onButtonClick}>
            Upload a file
          </button>
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}

      {files ? (
        <button onClick={HandleUpload} className="button-64">
          <span className="text">Upload to firebase</span>
        </button>
      ) : (
        ""
      )}
    </form>
  );
}
