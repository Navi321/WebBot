import React, { useState } from "react";
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";

const products = [
    {id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета'},
    {id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета'},
    {id: '3', title: 'Джинсы 2', price: 5500, description: 'Синего цвета'},
    {id: '4', title: 'Куртка 2', price: 10500, description: 'Синего цвета'},
    {id: '5', title: 'Джинсы 3', price: 4500, description: 'Синего цвета'},
    {id: '6', title: 'Куртка 3', price: 11000, description: 'Синего цвета'},
    {id: '7', title: 'Джинсы 4', price: 5000, description: 'Синего цвета'},
    {id: '8', title: 'Куртка 4', price: 10000, description: 'Синего цвета'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg} = useTelegram();

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems,product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;