 import { createContext, useState, useEffect } from "react";
 import PRODUCTS from '../shop-data.js';
//  import { addCollectionAndDocuments }  from "../utils/firebase/firebase.utils";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

 export const ProductsContext = createContext({
    products: [],
 });

 export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = { products };

//   useEffect(() => {
//      addCollectionAndDocuments('collections', PRODUCTS);
//   }, [])
   useEffect(async () => {
      const categoryMap = await getCategoriesAndDocuments('categories');
      console.log(categoryMap);
   }, []);

    return (
        <ProductsContext.Provider value = {value}>{children}</ProductsContext.Provider>
    );
 };
