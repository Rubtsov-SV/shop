import {BasketItem} from './BasketItem.jsx'

function BasketList(props) {
    const {order = [], 
        handleBasketShow = Function.prototype, removeFromBasket = Function.prototype,
        incQuantity = Function.prototype, 
        decQuantity = Function.prototype, 
    } = props;

    const totalPrice = order.reduce((sum, el) => {
        return sum + el.price.finalPrice * el.quantity
    }, 0)

    return  <ul className="collection basket-list">
    <li className="collection-item active">Корзина</li>
    {
        order.length ? order.map(item => (
            <BasketItem key={item.mainId} removeFromBasket={removeFromBasket}
            decQuantity={decQuantity}
            incQuantity={incQuantity}
            {...item}/>
        )) : <li className="collection-item">Корзина пуста</li>
    }
    <li className="collection-item active">Общая стоимость: {totalPrice} руб.</li>
    <i className="material-icons basket-close" onClick={handleBasketShow}>close</i>
  </ul>
}

export {BasketList}