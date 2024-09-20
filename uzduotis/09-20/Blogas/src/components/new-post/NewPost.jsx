
import './NewPost.css'

const NewPost = ({ addPost }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = {};
    
        const form = new FormData(e.target);
    
        for (const entry of form.entries()) {
            data[entry[0]] = entry[1];
        }

        addPost(data); 

        e.target.reset();
    }

    return (
        <div className="container mt-5 text-center newPost">
            <h1 className="mb-5">New Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="" className="mb-2">Post Title</label>
                    <input type="text" className="form-control" maxLength="100" name="title" />
                </div>
                <div className="mb-3">
                    <label htmlFor=""className="mb-2">Post Category</label>
                    <input type="text" className="form-control" name="category" />
                </div>
                <div className="mb-3">
                    <label htmlFor=""className="mb-2">Post Image</label>
                    <input type="text" className="form-control" name="image" />
                </div>
                <div className="mb-3">
                    <label htmlFor=""className="mb-2">Post Content</label>
                    <input type="text" className="form-control" maxLength="200" name="content" />
                </div>
                <div className="mb-3">
                    <label htmlFor=""className="mb-2">Post Author</label>
                    <input type="text" className="form-control" name="author" />
                </div>
                <div className="mb-3">
                    <label htmlFor=""className="mb-2">Post Author Role</label>
                    <input type="text" className="form-control" name="role" />
                </div>
                <div className="mb-3">
                    <label htmlFor=""className="mb-2">Post Author Image</label>
                    <input type="text" className="form-control" name="authorImage" /> 
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default NewPost;
