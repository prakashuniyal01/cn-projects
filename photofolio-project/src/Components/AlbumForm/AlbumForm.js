import React, { useRef } from "react";
import styles from "./albumform.module.css";

// importing firebase
import { db } from "../../firebaseInit";
import { collection, addDoc } from "firebase/firestore";

// toast for notification
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AlbumForm() {
  // for album name
  const nameRef = useRef();

  function clearForm(e) {
    e.preventDefault();
    nameRef.current.value = "";
    nameRef.current.focus();
  }
  // add a new album to the Database
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log("hello");
      const docRef = await addDoc(collection(db, "album"), {
        Albumname: nameRef.current.value,
        imageList: [],
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log("hiiiii");
      console.error("Error adding document: ", error);
    }

    // console.log("Document written with ID: ", docRef.id);

    // side notification for new album when created
    toast.success("Album added successfully");
    // clearing the value of input field and set focus
    nameRef.current.value = "";
    nameRef.current.focus();
  }

  return (
    <>
      {/* for notification */}
      <ToastContainer />
      {/* form container for add album */}
      <div className={styles.formContainer}>
        <h1>Create an album</h1>
        <form onSubmit={handleSubmit}>
          {/* input field */}
          <input
            className={styles.forminput}
            type="text"
            placeholder="Album Name"
            required
            ref={nameRef}
          />
          {/* clear data button */}
          <button
            className={`${styles.formBtn} ${styles.clearBtn}`}
            onClick={clearForm}
          >
            Clear
          </button>

          {/* create an album button */}
          <button className={`${styles.formBtn} ${styles.addBtn}`}>
            Create
          </button>
        </form>
      </div>
    </>
  );
}

export default AlbumForm;
