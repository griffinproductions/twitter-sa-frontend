import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [tweets, setTweets] = useState([]);

  const getTweets = async (query) => {
    console.log(query);
    const res = await fetch('http://localhost:81/tweets/all');
    const data = await res.json();
    setTweets(data);
    console.log(tweets);
  };

  return (
    <div className={styles.container}>
      Hello
      <div>
        <button type="button" onClick={() => { getTweets('#MCILIV'); }}>Fetch Tweets</button>
      </div>
    </div>
  );
}
