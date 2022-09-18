const userRouter = require('./routes/userRouter');
const meldingenRouter = require('./routes/meldingenRouter');
const newsRouter = require('./routes/newsRouter');
const partnerBlogs = require('./routes/partnerBlogRouter');
const contactEmail = require('./routes/contactRouter');
module.exports = (app) =>{
    app.use('/api/user',userRouter);
    app.use('/api/meldingen',meldingenRouter);
    app.use('/api/news',newsRouter);
    app.use('/api/partner-blogs',partnerBlogs);
    app.use('/api/contact',contactEmail);

}