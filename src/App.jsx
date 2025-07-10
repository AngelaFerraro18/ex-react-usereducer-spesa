import { useState } from "react";
import Article from "./components/Article";


function App() {

  const [addedProducts, setAddedProducts] = useState([]);

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  function addToCart(product) {
    const productInCart = addedProducts.find(p => p.name === product.name);
    if (!productInCart) {
      setAddedProducts([...addedProducts, { ...product, quantity: 1 }])
    }
  }

  return (
    <>

      {products && products.map((p, i) =>
        <div key={i}>
          <Article data={p} />
          <button onClick={() => addToCart(p)}>Aggiungi al carrello</button>
        </div>)}
      {addedProducts.length > 0 && (
        <>
          <h3>Carrello</h3>
          {addedProducts.map((p, i) => <div key={i}>
            <span>{p.name} quantità: {p.quantity}</span>
          </div>)}
        </>
      )}
    </>
  )
}

export default App
