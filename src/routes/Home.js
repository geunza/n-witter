import { dbService } from "fBase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
//https://firebase.google.com/docs/firestore/query-data/get-data?hl=ko
//https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko
const Home = ({ userObj }) => {
  console.log(userObj);
  setTimeout(() => console.log(userObj), 2000);

  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    const query = await getDocs(collection(dbService, "nweets"));
    query.forEach((doc) => {
      const nweetObj = {
        ...doc.data(),
        id: doc.id,
        createorId: 121212,
      };
      setNweets((prev) => [nweetObj, ...prev]);
    });
    // setNweets(query)
  };
  useEffect(() => {
    getNweets();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: serverTimestamp(),
    });
    setNweet("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };
  return (
    <>
      <div>{userObj}</div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={nweet}
          onChange={onChange}
          placeholder="What's on your mind"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => {
          return (
            <div key={nweet.id}>
              <h4>{nweet.nweet}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Home;
