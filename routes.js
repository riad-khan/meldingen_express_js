const userRouter = require('./routes/userRouter');
module.exports = (app) =>{
    app.use('/api/user',userRouter);
}