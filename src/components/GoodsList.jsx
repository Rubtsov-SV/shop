import {GoodsItem} from './GoodsItem'
function GoodsList (props) {
    const {goods = []} = props;

    if(!goods.length) {
        return <h3>Nothung here</h3>
    }
    return  <div className="goods">
        {goods.map(item => (
            <GoodsItem key={item.mainId} {...item}/>
        )
    )}
    </div>
}

export {GoodsList}