const FormAddProduct = ({ addItem }) => {

    const handleSubmit = (e) => {
      e.preventDefault();
  
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
  
      data.discount = parseFloat(data.discount);
      data.rating = parseFloat(data.rating);
      data.price = parseFloat(data.price);
  
      addItem(data);
  
      e.target.reset();
    };
  
    return (
      <div className="container mt-5 text-center newPost">
        <h1 className="mb-5">Add New Item</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="mb-2">Item Title</label>
            <input type="text" className="form-control" maxLength="100" name="title" required />
          </div>
          <div className="mb-3">
            <label htmlFor="brand" className="mb-2">Item Brand</label>
            <input type="text" className="form-control" name="brand" required />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="mb-2">Item Image</label>
            <input type="text" className="form-control" name="image" required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="mb-2">Item Description</label>
            <input type="text" className="form-control" maxLength="200" name="description" required />
          </div>
          <div className="mb-3">
            <label htmlFor="discount" className="mb-2">Item Discount (%)</label>
            <input type="number" className="form-control" name="discount" required />
          </div>
          <div className="mb-3">
            <label htmlFor="rating" className="mb-2">Item Rating</label>
            <input type="number" className="form-control" name="rating" min="1" max="5" required />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="mb-2">Item Price</label>
            <input type="number" className="form-control" name="price" required />
          </div>
          <button type="submit" className="btn btn-primary">Add Item</button>
        </form>
      </div>
    );
  };
  
  export default FormAddProduct;
  