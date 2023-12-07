import React, { useEffect, useState } from "react";

import ImageForm from "../ImaageForm/ImageForm";
import Image from "../Image/Image";

// import styles
import styles from "./imagelist.module.css";

// firebase DB importing
import { db } from "../../firebaseInit";
import { doc, arrayRemove, updateDoc, onSnapshot } from "firebase/firestore";

// toast notification
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ImageList(props) {
  // declaring variable to store the data

  // open or close one album
  const { openAlbum, setOpenAlbum } = props;
  // to show or hide add image form
  const [showImageForm, setShowImageForm] = useState(false);
  // for updating an image
  const [updateImage, setUpdateImage] = useState(null);
  // imageList containing all the images within an album
  const [imageList, setImageList] = useState([]);
  // for searching image within an album
  const [search, setSearch] = useState("");
  // lightbox
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // function to back to the album list page
  function handleBackClick(e) {
    e.preventDefault();
    setOpenAlbum({ albumId: "", open: false });
    console.log("handleBack is Clicked");
  }

  // get the images from the DB
  useEffect(() => {
    onSnapshot(doc(db, "album", openAlbum.albumId), (doc) => {
      const data = doc.data().imageList;
      setImageList(data);
    });
  }, [openAlbum.albumId]);

  // deleting an image from list
  async function handleImageDelete(image) {
    const albumRef = doc(db, "album", openAlbum.albumId);
    await updateDoc(albumRef, {
      imageList: arrayRemove(image),
    });
    toast.success("Image Successfully Deleted from your Album!");
  }

  // updating any image
  function handleImageEdit(image) {
    setUpdateImage(image);
    setShowImageForm(true);
  }

  // open lightbox
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  // close lightbox
  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ToastContainer />
      {/* button container */}
      <div className={styles.btnContainer}>
        {/* back button */}
        <button
          className={`${styles.btn} ${styles.backBtn}`}
          onClick={handleBackClick}
        >
          Back
        </button>
        {/* input box to search image in that perticualr album */}
        <input
          className={styles.searchbtn}
          type="text"
          placeholder="Search Image.."
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* add image / cancel button */}
        {/* open / hide image form */}
        <button
          className={`${styles.btn} ${styles.addBtn}`}
          onClick={() => setShowImageForm(!showImageForm)}
        >
          {!showImageForm ? "Add Image" : "Cancel"}
        </button>
      </div>

      {/* image form to add image */}
      <div style={{ textAlign: "center" }}>
        {showImageForm && (
          <ImageForm
            albumId={openAlbum.albumId}
            updateImage={updateImage}
            setUpdateImage={setUpdateImage}
            setShowImageForm={setShowImageForm}
          />
        )}

        {/* collection heading on condition */}
        {/* if album is empty it will show diffrent heading */}
        <h1>
          {imageList.length !== 0
            ? "Images in Album"
            : "No images found in the album."}
        </h1>
      </div>

      {/* looping open each images in DB and displaying them  */}
      <div className={styles.imageList}>
        {/* filter function to show search images if user enter somthing in the search box  */}
        {imageList
          .filter((image) => {
            return search.toLocaleLowerCase() === ""
              ? image
              : image.name.toLocaleLowerCase().includes(search);
            // map function to map over each image and show them inside a card
          })
          .map((image, i) => (
            <Image
              image={image}
              key={i}
              index={i}
              handleImageEdit={handleImageEdit}
              handleImageDelete={handleImageDelete}
              openLightbox={openLightbox}
            />
          ))}
      </div>

      {/* id user click over an image then light box will open */}
      {isOpen && (
        // main container
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container">
            {/* close button to close the light box */}
            <button className="close-button" onClick={closeLightbox}>
              Close
            </button>
            <img
              className="lightbox-image"
              src={imageList[currentImageIndex].link}
              alt={`${currentImageIndex}`}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ImageList;
