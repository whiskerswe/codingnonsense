import { useState } from 'react'
import drinkMe from '/tenniel/1book3.jpg'
import longNeck from '/tenniel/1book4.jpg'
import { ImageWithCredit } from './components/ImageWithCredit'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [image, setImage] = useState(drinkMe)

  function handleClick() {
      setCount((c) => {
          const next = c + 1;
          setImage(next % 2 == 0 ? drinkMe : longNeck);
          return next;
          });
      }
  return (
    <>
      <ImageWithCredit
      src={drinkMe}
      alt={"Illustration from Alice in Wonderland"}
      credit="Illustration by John Tenniel, 1865. Public domain."
      />
      <h1>Drink me</h1>
      <div className="card">
        <button onClick={handleClick}>
          Click me
        </button>
        <p>
          Count is {count}
        </p>
      </div>
      <p className="read-the-book">
        Paragraph of text to come
      </p>
    </>
  )
}

export default App
