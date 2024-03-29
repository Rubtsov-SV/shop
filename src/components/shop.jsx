import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../config";
import { Preloader } from "./Preloader";
import { GoodsList } from "./GoodsList";
import { Cart } from "./Cart";
import { BasketList } from "./BasketList.jsx";
import { Alert } from "./Alert.jsx";

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, SetOrder] = useState([]);
    const [isBasketShow, setIsBasketShow] = useState(false);
    const [alertName, setAlertName] = useState("");

    const addToBasket = (item) => {
        const itemIndex = order.findIndex(
            (orderItem) => orderItem.mainId === item.mainId
        );
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            };
            SetOrder([...order, newItem]);
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    };
                } else {
                    return orderItem;
                }
            });
            SetOrder(newOrder);
        }
        setAlertName(item.displayName);
    };

    const handleBasketShow = () => {
        setIsBasketShow(!isBasketShow);
    };

    const incQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if (el.mainId === itemId) {
                const newQuatity = el.quantity + 1;
                return {
                    ...el,
                    quantity: newQuatity,
                };
            } else {
                return el;
            }
        });
        SetOrder(newOrder);
    };

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter((el) => el.mainId !== itemId);
        SetOrder(newOrder);
    };

    const decQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if (el.mainId === itemId) {
                const newQuatity = el.quantity - 1;
                return {
                    ...el,
                    quantity: newQuatity >= 0 ? newQuatity : 0,
                };
            } else {
                return el;
            }
        });
        SetOrder(newOrder);
    };

    const closeAlert = () => {
        setAlertName("");
    };

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.shop && setGoods(data.shop);
                setLoading(false);
            });
    }, []);

    return (
        <main className="container content">
            <Cart
                quantity={order.length}
                handleBasketShow={handleBasketShow}
            />
            {loading ? (
                <Preloader />
            ) : (
                <GoodsList
                    goods={goods}
                    addToBasket={addToBasket}
                />
            )}
            {isBasketShow && (
                <BasketList
                    order={order}
                    handleBasketShow={handleBasketShow}
                    removeFromBasket={removeFromBasket}
                    decQuantity={decQuantity}
                    incQuantity={incQuantity}
                />
            )}
            {alertName && (
                <Alert
                    displayName={alertName}
                    closeAlert={closeAlert}
                />
            )}
        </main>
    );
}

export { Shop };
