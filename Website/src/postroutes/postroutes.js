// create a new user in our databse
module.exports = function(app){

    app.post("/register",async(req,res)=>{

        try{
            const registerOne = new Register({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address
            })
    
            const registered = await registerOne.save();
            console.log(registered)
            res.status(201).render("index");
    
        }catch(e){
            res.status(400).send(e);
        }
    
    });


}
