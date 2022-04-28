import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState('');
  const [usd, setUsd] = useState(0);
  const [count, setCount] = useState(0);

  const onChange = (e) => setPrice(e.target.value);
  const onSelectChange = (e) => setUsd(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    const value = Math.floor(price / usd);
    setCount(value);
  };

  useEffect(() => {
    console.log('fetch url');
    fetch('https://api.coinpaprika.com/v1/tickers?limit=30') //
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      });
  }, []);
  useEffect(() => {}, [price]);
  useEffect(() => {}, [usd]);

  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>

      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <form onSubmit={onSubmit}>
          <input
            value={price}
            onChange={onChange}
            type="text"
            placeholder="Enter dollars..."
            required
          />
          <select onChange={onSelectChange}>
            {coins.map((item, i) => (
              <option key={i} value={item.quotes.USD.price}>
                {item.name} ({item.symbol}) : ${item.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <button>Click me!</button>
        </form>
      )}

      <h1>총 {count}개 살 수 있음.</h1>
    </div>
  );
}

// function App() {
//   const [toDo, setToDo] = useState('');
//   const [toDos, setToDos] = useState([]);
//   const onChange = (e) => setToDo(e.target.value);
//   const onSubmit = (e) => {
//     e.preventDefault();
//     if (toDo === '') {
//       return;
//     }
//     setToDos((prev) => [toDo, ...toDos]);
//     setToDo('');
//   };

//   return (
//     <div>
//       <h1>My To Dos ({toDos.length})</h1>
//       <form onSubmit={onSubmit}>
//         <input
//           value={toDo}
//           onChange={onChange}
//           tyep="text"
//           placeholder="Write your to do..."
//         />
//         <button>Add To Do</button>
//       </form>
//       <hr />
//       <ul>
//         {toDos.map((item, i) => (
//           <li key={i}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
