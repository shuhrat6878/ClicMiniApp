function CartItem({ item, OnRemove }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />
      <div>
        <h4>{item.title}</h4>
        <p>
          ${item.price} * {item.quantity}
        </p>
        <button onClick={() => OnRemove(item.id)}>
          Remove
        </button>
      </div>
    </div>
  )
}

export default CartItem