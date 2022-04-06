import Twitter from 'twitter-v2';
import fetch from 'node-fetch';
import styles from '../styles/Home.module.css';

const getTweetEndDate = () => {
  const today = new Date();
  return new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000);
};

const isAfterEarliestDate = (currentDateString) => {
  const currentDate = Date.parse(currentDateString);
  return currentDate > getTweetEndDate();
};

const getTweetPage = async (client, prevData, prevMeta, counter) => {
  console.log(counter);
  const { data, meta } = await client.get('tweets/search/recent', {
    query: '#CRYARS', max_results: 100, tweet: { fields: ['created_at', 'public_metrics'] }, ...(prevMeta && { next_token: prevMeta.next_token }),
  });
  prevData.push(data);
  if (meta.next_token && isAfterEarliestDate(data.at(-1).created_at) && counter < 100) {
    await getTweetPage(client, prevData, meta, counter + 1);
  }
  // Workout why last item is always undefined
  prevData.pop();
  return prevData;
};

export const getStaticProps = async () => {
  const client = new Twitter({
    consumer_key: 'E8Qk2apM2SrHLwAgKQbfpJRAa',
    consumer_secret: 'AnALVE2zfNMeuhHJBpnqMWx6tOybMI1Jnl9eqrtiIEu9KhavZ1',

  });
  const data = await getTweetPage(client, [], null, 1);
  if (data) {
    const response = await fetch('http://localhost:81/tweets/add', {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
  }

  return {
    props: { data },
  };
};

export default function Home() {
  return (
    <div className={styles.container}>
      Hello
    </div>
  );
}
