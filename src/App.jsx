import { useEffect, useState } from "react"
import CartList from "./cart/CartList"

function App() {
  const [cart, setcart] = useState([])

  useEffect(() => {
  function synccart() {
    const saved = localStorage.getItem("cart")
    if (saved) {
      setcart(JSON.parse(saved))
    }
  }

  window.addEventListener("cart-updated", synccart)

  return () => {
    window.removeEventListener("cart-updated", synccart)
  }
}, [])


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  function removeitem(id) {
    const updated = cart.filter(item => item.id !== id)
    setcart(updated)
  }

  const totalcount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalprice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="carts-bloc">
      <p>Items: {totalcount}</p>
      <p>Total: ${totalprice.toFixed(2)}</p>

      <CartList cart={cart} removeitem={removeitem} />
    </div>
  )
}

export default App