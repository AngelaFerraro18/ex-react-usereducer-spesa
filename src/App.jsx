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
    } else {
      updateProductQuantity(product.name)
    }
  }

  function updateProductQuantity(productName, quantity) {
    if (quantity < 1 || isNaN(quantity)) {
      return;
    }
    setAddedProducts(prev => prev.map(p => p.name === productName ? { ...p, quantity } : p))
  }

  function removeFromCart(productName) {
    const removedProduct = addedProducts.filter(p => p.name !== productName);
    setAddedProducts(removedProduct);
  }

  const totalPrice = addedProducts.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0)

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
            <p>
              <input type="number" value={p.quantity} onChange={e => updateProductQuantity(p.name, parseInt(e.target.value))} />
              <span>{p.name} quantità: {p.quantity}</span>
            </p>

            <button onClick={() => removeFromCart(p.name)}>Rimuovi dal carrello</button>
          </div>)}
          <h4>Totale da pagare: {totalPrice.toFixed(2)}€</h4>
        </>
      )}
    </>
  )
}

export default App
