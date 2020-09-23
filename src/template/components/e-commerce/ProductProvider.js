import React, { useState, useReducer, useEffect } from 'react';
import { ProductContext } from '../../context/Context';
import { arrayReducer } from '../../reducers/arrayReducer';
import { toast } from 'react-toastify';
import { getItemFromStore, setItemToStore } from '../../helpers/utils';
import rawProducts from '../../data/e-commerce/products';

const promoCodes = [{ code: 'GET20', discount: 20 }, { code: 'GET50', discount: 50 }]; // dummy promo codes

const ProductProvider = ({ children }) => {
  // Reducer
  const [products, productsDispatch] = useReducer(arrayReducer, [], () => getItemFromStore('products', rawProducts));
  console.log(products);
  const [shoppingCart, shoppingCartDispatch] = useReducer(arrayReducer, [], () =>
    getItemFromStore('shoppingCart', [
      { id: rawProducts[0].id, quantity: 3 },
      { id: rawProducts[1].id, quantity: 3 },
      { id: rawProducts[2].id, quantity: 3 }
    ])
  );
  const [favouriteItems, favouriteItemsDispatch] = useReducer(arrayReducer, [], () =>
    getItemFromStore('favouriteItems', [{ id: rawProducts[0].id }, { id: rawProducts[1].id }])
  );
  const [promo, setPromo] = useState(getItemFromStore('promo', '', sessionStorage));
  const [appliedPromo, setAppliedPromo] = useState(null);

  // State
  const [productsLayout, setProductsLayout] = useState('grid');
  const [isAsc, setIsAsc] = useState(true);
  const [sortBy, setSortBy] = useState('price');
  const [modal, setModal] = useState(false);

  // Helper
  const isInShoppingCart = id => !!shoppingCart.find(shoppingCartItem => shoppingCartItem.id === id);
  const isInFavouriteItems = id => !!favouriteItems.find(favouriteItem => favouriteItem.id === id);
  const applyPromoCode = promoCode => {
    // Get your promo codes from your sources
    const searchPromo = promoCodes.find(reservedPromoCode => reservedPromoCode.code === promoCode);
    if (!!searchPromo) {
      setPromo(promoCode);
      setAppliedPromo(searchPromo);
      toast.success(
        <span>
          Congratulations, You got <strong>{searchPromo.discount}%</strong> discount!
        </span>
      );
    } else {
      setPromo('');
      setAppliedPromo(null);
      toast.error('Promo code is not valid! Try again.');
    }
  };

  const handleCartAction = ({ id, quantity = 1, type = 'ADD' }) => {
    // Dispatch
    type === 'REMOVE' && shoppingCartDispatch({ type, id });
    if (type === 'ADD' && !isInShoppingCart(id)) {
      shoppingCartDispatch({ type, payload: { id, quantity } });
    } else {
      shoppingCartDispatch({
        id,
        type: 'EDIT',
        payload: { id, quantity: quantity + shoppingCart.find(shoppingCartItem => shoppingCartItem.id === id).quantity }
      });
    }
    // Modal control
    setModal(!modal);
  };

  // Handler
  const handleSort = newSortBy => {
    setSortBy(newSortBy);
    productsDispatch({ type: 'SORT', order: [isAsc ? 'desc' : 'asc'], sortBy });
    sortBy === newSortBy && setIsAsc(!isAsc);
  };

  // Life-cycle
  useEffect(() => {
    setAppliedPromo(promoCodes.find(reservedPromoCode => reservedPromoCode.code === promo));
  }, [promo]);

  useEffect(() => {
    setItemToStore('products', products);
  }, [products]);

  useEffect(() => {
    setItemToStore('shoppingCart', shoppingCart);
  }, [shoppingCart]);

  useEffect(() => {
    setItemToStore('favouriteItems', favouriteItems);
  }, [favouriteItems]);

  useEffect(() => {
    setItemToStore('promo', promo, sessionStorage);
  }, [promo]);

  const value = {
    products,
    productsDispatch,
    shoppingCart,
    shoppingCartDispatch,
    productsLayout,
    setProductsLayout,
    sortBy,
    isAsc,
    favouriteItems,
    favouriteItemsDispatch,
    handleSort,
    isInShoppingCart,
    isInFavouriteItems,
    applyPromoCode,
    appliedPromo,
    handleCartAction
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
