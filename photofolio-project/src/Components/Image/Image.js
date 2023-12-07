import styles from "./image.module.css";

// to Show all the images within an album
function Image(props) {
  const { image, index, handleImageEdit, handleImageDelete, openLightbox } =
    props;
  return (
    <>
      {/* mian continer of the image */}
      <div className={styles.imageCard}>
        {/* showing image */}
        <div className={styles.imageBox}>
          <img
            src={image.link}
            alt={image.name}
            onClick={() => openLightbox(index)}
          />
        </div>

        {/* image name with button to delete or edit image */}
        <div className={styles.imageInfo}>
          {image.name}
          {/* for edit */}
          <button
            className={`${styles.imageBtn} ${styles.editBtn}`}
            onClick={() => handleImageEdit(image)}
          ></button>

          {/* to delete */}
          <button
            className={`${styles.imageBtn} ${styles.deleteBtn}`}
            onClick={() => handleImageDelete(image)}
          ></button>
        </div>
      </div>
    </>
  );
}

export default Image;
