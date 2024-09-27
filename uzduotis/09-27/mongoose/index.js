import mongoose from 'mongoose';

try {
    await mongoose.connect('mongodb://127.0.0.1:27017/pirma_duombaze');
   console.log('Connected!');

} catch {
    console.log('Erororas!');
}

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date
});

const Post = mongoose.model('Post', BlogPost);

const post = new Post();

post.title = 'kalakutas';
post.body = 'kalakutiena';
post.date = Date()

await post.save();

Post.create({
    title:  'vista',
    body: 'vistiena'
});

// console.log(await Post.find().lean().exec());
// console.log(await Post.findOne({ title: 'vista' }).lean().exec());
// console.log(await Post.findOne({ title: 'vista' }).lean().exec());

