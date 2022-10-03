const userRouter = require('./routes/userRouter');
const meldingenRouter = require('./routes/meldingenRouter');
const newsRouter = require('./routes/newsRouter');
const partnerBlogs = require('./routes/partnerBlogRouter');
const contactEmail = require('./routes/contactRouter');
const profileRouter = require('./routes/profileRouter');
const BlogRouter = require('./routes/blogRouter');
const CommentRouter = require('./routes/commentRouter');
const chartRouter = require('./routes/chartRouter')
module.exports = (app) =>{
    app.use('/api/user',userRouter);
    app.use('/api/meldingen',meldingenRouter);
    app.use('/api/news',newsRouter);
    app.use('/api/partner-blogs',partnerBlogs);
    app.use('/api/contact',contactEmail);
    app.use('/api/profile',profileRouter);
    app.use('/api/blogs',BlogRouter);
    app.use('/api/comments',CommentRouter);
    app.use('/api/charts',chartRouter);
}