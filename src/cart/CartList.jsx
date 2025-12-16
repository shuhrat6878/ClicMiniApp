import CartItem from "./CartItem"

function CartList({ cart, removeitem }) {
  if (cart.length === 0) {
    return <p>Cart is empty</p>
  }

  return (
    <div>
      {cart.map(item => (
        <CartItem
          key={item.id}
          item={item}
          OnRemove={removeitem}
        />
      ))}
    </div>
  )
}

export default CartList