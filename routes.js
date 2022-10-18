const userRouter = require('./routes/userRouter');
const meldingenRouter = require('./routes/meldingenRouter');
const newsRouter = require('./routes/newsRouter');
const partnerBlogs = require('./routes/partnerBlogRouter');
const contactEmail = require('./routes/contactRouter');
const profileRouter = require('./routes/profileRouter');
const BlogRouter = require('./routes/blogRouter');
const CommentRouter = require('./routes/commentRouter');
const chartRouter = require('./routes/chartRouter');
const googleAuthRouter = require('./routes/googleAuthRouter');
const fbAuthRouter = require('./routes/facebookAuthRouter');
const seoRouter = require('./routes/seoRouter');
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
    app.use('/auth/google',googleAuthRouter);
    app.use('/auth/facebook',fbAuthRouter);
    app.use('/api/seo-data',seoRouter);
}