function GoodsItem(props) {
  const { 
    mainId, 
    displayName, 
    displayDescription, 
    price, 
    displayAssets, 
    addToBasket = Function.prototype 
  } = props;

  return (
    <div className="card">
      <div className="card-image">
        <img src={displayAssets[0].full_background} alt={displayName}/>
      </div>
      <div className="card-content">
        <p>
            <span className="card-title ">{displayName}</span>
          {displayDescription}
        </p>
      </div>
      <div className="card-action">
        <button className="btn" onClick={() => addToBasket({
          mainId, 
          displayName, 
          price,
        })}>Купить</button>
        <span className="right price">{price.finalPrice} руб.</span>
      </div>
    </div>
  );
}

export { GoodsItem };
