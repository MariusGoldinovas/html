import './Post.css'

const Post =({ postData })=>{
    return(
        <>
            <div className="card">
                <img className="card-image" src={postData.image} alt="" />
                <div className="category">{postData.category}</div>
                <div className="title">{postData.title}</div>
                <div className="content">{postData.content}</div>
                <div className="author">
                    <img className="author-image" src={postData.authorImage} alt="" />
                    <div className="name-role">
                        <p className="author-name">{postData.author}</p>
                        <p className="author-role">{postData.role}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;
