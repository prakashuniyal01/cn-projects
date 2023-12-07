// importing css module styles
import styles from "./album.module.css";

function Album(props) {
  // info about album and to open an album
  var { info, setOpenAlbum } = props;

  // onClick on album to see the content
  function handleClick() {
    setOpenAlbum({ albumId: info.id, open: true });
  }

  return (
    <>
      {/* main section */}
      <div className={styles.albumContainer}>
        {/* logo */}
        <div className={styles.albumLogo} onClick={handleClick}></div>

        {/* album name */}
        <div className={styles.albumName}>{info.Albumname}</div>
      </div>
    </>
  );
}

export default Album;
