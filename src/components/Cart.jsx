function Cart(props) {
    const {quantity = 0} = props;

    return (
        <div className="cart blue darken-3 white-text">
            <i class="material-icons ">shopping_cart</i>
            {quantity ? <span className="cart-quatity">{quantity}</span> : null}
        </div>
        );
}

export {Cart}