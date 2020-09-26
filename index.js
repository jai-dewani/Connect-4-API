var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser")
    mongoose    = require("mongoose");



//Default setup commands
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

mongoose.set('useCreateIndex', true);
const url = "mongodb+srv://temp:tempUser@pratilipi-challenge.qv4ww.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.connect(url,{ useNewUrlParser: true,  useUnifiedTopology: true  })
                    .then(() => console.log("MongoDB Connected..."))
                    .catch((err) => console.log(err))


// Routes 
var indexRoutes = require("./routes/index");
app.use("/",indexRoutes);

// Run Server 
app.listen(8080,process.env.IP,function(){
    console.log("The project has started");
});
    