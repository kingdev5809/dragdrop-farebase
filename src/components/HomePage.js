import React, { useEffect, useState } from "react";
import { DragDropFile } from "./DragDropFile";
import { useNavigate } from "react-router";
import { auth, db } from "../firebase/firebase";
import trashIcon from "../assests/trash.png";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
function HomePage({ user }) {
  const [userFiles, setUserFiles] = useState([]);
  const [fileCount, setFileCount] = useState(0);
  const navigate = useNavigate();

  // get user files
  useEffect(() => {
    const fetchUserFiles = async () => {
      if (user?.uid) {
        const filesRef = collection(db, "files");
        const userFilesQuery = query(filesRef, where("userId", "==", user.uid));
        const unsubscribe = onSnapshot(userFilesQuery, (snapshot) => {
          const files = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserFiles(files);
          setFileCount(files.length);
          console.log(files);
        });
      }
    };
    fetchUserFiles();
  }, [user?.uid]);
  console.log(userFiles);
  console.log(user);

  // delete file from database
  const handleDelete = (id, name) => {
    var confirmed = window.confirm(`Are you sure to delete this file`);
    if (confirmed) {
      const storage = getStorage();
      const storageRef = ref(storage, name);
      deleteObject(storageRef)
        .then(() => {
          console.log("File deleted successfully");
          deleteDoc(doc(db, "files", id))
            .then(() => {
              console.log("Document deleted successfully");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // log out the user
  const logoutUser = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <div>
      <div className="header">
        <h2>{user.email}</h2>
        <button onClick={logoutUser}>Log out</button>
      </div>
      <DragDropFile user={user} />
      <div className="files-container">
        {userFiles.map((file) => (
          <>
            <div className="files" key={file.url}>
              <a target="_blank" href={file.url}>
                {file.filename}
              </a>
              <img
                src={trashIcon}
                alt="trashIcon"
                onClick={() => handleDelete(file.id, file.name)}
              />
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
