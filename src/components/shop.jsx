import {useState, useEffect} from 'react'
import {API_KEY, API_URL} from '../config'
import {Preloader} from './Preloader'
import {GoodsList} from './GoodsList'
import {Cart} from './Cart'


function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, SetOrder] = useState([]);
    const [isBasketShow, setIsBasketShow] = useState(false)


    const addToBasket = (item) => {
        const  itemIndex = order.findIndex(orderItem => orderItem.mainId === item.mainId)
        if(itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            }
            SetOrder([...order, newItem])
        } else {
            const newOrder = order.map((orderItem, index) => {
                if(index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                } else {
                    return orderItem
                }
            })
            SetOrder(newOrder)
        }
    }

    useEffect(function getGoods () {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            data.shop && setGoods(data.shop);
            setLoading(false)
        })

    }, [])

    return <main className="container content">
        <Cart quantity = {order.length}/>
        {
            loading ? <Preloader /> : <GoodsList goods={goods} addToBasket={addToBasket}/>
        }
    </main>
}

export {Shop}