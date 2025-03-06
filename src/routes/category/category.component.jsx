import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { ProductsContext } from '../../context/products.context';

import './category.styles.scss';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(ProductsContext);
  const [final_prods, setFinalProds] = useState(categoriesMap[category]);

  useEffect(() => {
    setFinalProds(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className='cat-title'>{category.toUpperCase()}</h2>
      <div className='cat-container'>
        {final_prods &&
          final_prods.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;