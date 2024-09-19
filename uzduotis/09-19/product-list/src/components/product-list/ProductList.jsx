import { useState , useEffect } from "react";
import Quantity from "../quantity/Quantity";


const ProductList = () => {
    const [product, setProduct] = useState('')
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(savedProducts);
      }, []);

    useEffect(() => {
        if (products.length > 0) { 
        localStorage.setItem('products', JSON.stringify(products));
        }
      }, [products]);


    const addProduct = () => {
        if (product.trim()) {
            setProducts([...products, product.trim()]);
            setProduct('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          addProduct();
        }
      };

    const removeProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    }

    return (
        <div className="container col-3">
            <div className="input-group mt-5 mb-3">
                <input className="form-control" type="text" 
                value={product} 
                onChange={(e)=>setProduct(e.target.value)} 
                onKeyDown={handleKeyDown}
                placeholder="Product name and press Enter" />
                <button className="btn btn-primary" onClick={addProduct}>Add product</button>
            </div>

            <ul className="list-group">
                {products.map((item, index) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                        {item} 
                        <div className="box d-flex justify-content-between align-items-center">
                            <Quantity/>
                            <button className="btn btn-close p-3" onClick={()=> removeProduct(index)}></button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
   

export default ProductList;