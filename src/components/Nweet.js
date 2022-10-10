import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "../fBase";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  const onChangeText = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };
  const onSubmitEdit = async (e) => {
    e.preventDefault();
    const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
    await updateDoc(NweetTextRef, { text: newNweet });
    setEditing((prev) => !prev);
  };
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
      await deleteDoc(NweetTextRef);
      // delete nweet
    }
  };
  return (
    <div>
      {editing ? (
        <>
          <form>
            <input
              value={newNweet}
              placeholder="Edit your Nweet"
              onChange={onChangeText}
              required
            />
          </form>
          <button onClick={onSubmitEdit}>Editing?</button>
        </>
      ) : (
        <h4>{nweetObj.text}</h4>
      )}
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Nweet</button>
          <button onClick={toggleEditing}>Edit Nweet</button>
        </>
      )}
      <div>{isOwner}</div>
    </div>
  );
};
export default Nweet;
