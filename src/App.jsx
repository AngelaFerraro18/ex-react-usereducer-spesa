import { useReducer } from "react";
import Article from "./components/Article";

function cartReducer(addedProducts, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const productInCart = addedProducts.find(p => p.name === action.payload.name);
      if (productInCart) {
        action.payload.quantity = addedProducts.quantity + 1;

      } else {
        return [...addedProducts, { ...action.payload, quantity: 1 }]
      }

    case 'UPDATE_QUANTITY':

      if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
        return addedProducts;
      }
      return addedProducts.map(p => p.name === action.payload.name ? { ...p, quantity: action.payload.quantity } : p)
    case 'REMOVE_ITEM':
      return addedProducts.filter(p => p.name !== action.payload);
    default:
      return addedProducts;
  }
}

function App() {

  const [addedProducts, dispatchCart] = useReducer(cartReducer, []);

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const totalPrice = addedProducts.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0)

  return (
    <>

      {products && products.map((p, i) =>
        <div key={i}>
          <Article data={p} />
          <button onClick={() => dispatchCart({ type: 'ADD_ITEM', payload: p })}>Aggiungi al carrello</button>
        </div>)}
      {addedProducts.length > 0 && (
        <>
          <h3>Carrello</h3>
          {addedProducts.map((p, i) => <div key={i}>
            <p>
              <input type="number" value={p.quantity} onChange={e => dispatchCart({ type: 'UPDATE_QUANTITY', payload: { name: p.name, quantity: parseInt(e.target.value) } })} />
              <span>{p.name} quantità: {p.quantity}</span>
            </p>

            <button onClick={() => dispatchCart({ type: 'REMOVE_ITEM', payload: p.name })}>Rimuovi dal carrello</button>
          </div>)}
          <h4>Totale da pagare: {totalPrice.toFixed(2)}€</h4>
        </>
      )}
    </>
  )
}

export default App
