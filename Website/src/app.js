const express = require("express");
const app = express();
const hbs = require("hbs");

require("./db/conn");

// Models importing
const Register = require("./models/registers");
const ProductCategory = require("./models/productcategory");
const Product = require("./models/product");
const HomePage = require("./models/pages/homepage");


const PORT = process.env.PORT || 3000;
const path = require("path");

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);


// To add routes from different file
const seller_routes = require("./routes/seller");
app.use("/seller_login", seller_routes);


const cart_routes = require("./routes/cart");
app.use("/cart", cart_routes);

const product_description_routes = require("./routes/product_description");
app.use("/product_description", product_description_routes);

const try_routes = require("./routes/try");
app.use("/try", try_routes);


const dataObject = {
  FirstGrid: [
    {
      Category: "Home",
      Collection: "Decoration",
      ImageSource:
        "https://images.unsplash.com/photo-1620243318482-fdd2affd7a38?auto=format&q=75&fit=crop&w=750",
    },
    {
      Category: "Mordern",
      Collection: "Furniture",
      ImageSource:
        "https://images.unsplash.com/photo-1620241608701-94ef138c7ec9?auto=format&q=75&fit=crop&w=750",
    },
  ],

  SecondGrid: [
    {
      FirstPlaceholder: "Men",
      SecondPlaceholder: "Business Causual",
      ImageSource:
        "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
    },
    {
      FirstPlaceholder: "Women",
      SecondPlaceholder: "Winter Season",
      ImageSource:
        "https://images.unsplash.com/photo-1552668693-d0738e00eca8?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
    },
    {
      FirstPlaceholder: "Men",
      SecondPlaceholder: "Streetwear",
      ImageSource:
        "https://images.unsplash.com/photo-1560269999-cef6ebd23ad3?auto=format&q=75&fit=crop&w=600&h=700",
    },
    {
      FirstPlaceholder: "Women",
      SecondPlaceholder: "Sale",
      ImageSource:
        "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
    },
  ],

  ThirdGrid: [
    {
      Category: "Home",
      Collection: "Decoration",
      ImageSource:
        "https://images.unsplash.com/photo-1620243318482-fdd2affd7a38?auto=format&q=75&fit=crop&w=750",
    },
    {
      Category: "Mordern",
      Collection: "Furniture",
      ImageSource:
        "https://images.unsplash.com/photo-1620241608701-94ef138c7ec9?auto=format&q=75&fit=crop&w=750",
    },
  ],
};


///////////////////////////////////////////  All the GET Methods...



const getAllElementsForHomePage = async()=>{
  // get current- 1 offer
  // get current- 2 offer
  // get collections
}



app.get("/", async (req, res) => {
  console.log("Home Page")
  try {
    const HomePageObject = await HomePage.findOne().sort({
    DateCreated: "desc",
    });
    res.render("home", HomePageObject)
  } catch (e) {
    res.status(400).send(e)
  }
});

app.get("/temp", async (req, res) => {
  console.log("Home Page")
  try {
    
    res.render("template")
    
  } catch (e) {
    res.status(400).send(e)
  }
});









app.get("/home", async (req, res) => {
  console.log("Home Page")
  try {
    const HomePageObject = await HomePage.findOne().sort({
      DateCreated: "desc",
    });
    res.render("home", HomePageObject)
  } catch (e) {
    res.status(400).send(e)
  }
})




















// app.get("/product_description", async(req, res) => {
//   console.log("Product-description")
//   try {
//     const product_id = parseInt(req.query.id)
//     const product = await Product.findOne({product_id})
//     console.log(product)
//     res.render("product_description",product)
//   } catch (error) {
//     console.log(error)
//     res.status(400).send("Error")
//   }
// })



app.get("/product_grid", async(req, res) => {
  try {
    console.log("product_grid")
    const category = req.query.category;
    const sub_category = req.query.sub_category;

    const products = await Product.find({category,sub_category})

    if (products.length === 0){
      console.log("No product found")
      res.render("noproduct");
    }

    res.render("product_grid", {products});
  } catch (e) {
    res.status(400).send(e);
  }
});



app.get("/template2", (req, res) => {
  console.log("template2")
  res.render("temp/template2");
});

app.get("/personal_information", (req, res) => {
  console.log("personal_information")
  res.render("personal_information");
});

app.get("/profile", (req, res) => {
  console.log("profile")
  res.render("profile");
});

app.get("/signup", (req, res) => {
  console.log("signup")
  res.render("signup");
});

app.get("/login", (req, res) => {
  console.log("login")
  res.render("login");
});

app.get("/categories", (req, res) => {
  console.log("categories")
  res.render("seller/create/categories");
});
//////////////////////////////////////////////////////////////////////////////////////////////

const ranges = [
  { min: 300, max: 400, category: 1 },
  { min: 400, max: 500, category: 2 },
  { min: 500, max: 600, category: 3 },
];

const updates = ranges.map(range => {
  return {
    updateOne: {
      filter: { product_id: { $gte: range.min, $lt: range.max } },
      update: { $set: { category_id: range.category } }
    }
  };
});





app.get("/tests", async(req, res) => {
  try {
    console.log("tests")
  await Product.updateMany({}, { $set: { category_id: 1 }});
    const products = await Product.find()
    console.log(products)
    res.send("Done");
  } catch (error) {
    res.send("Errpr");
  }
  
});







































// create a new user in our databse
app.post("/register", async (req, res) => {
  try {
    const registerOne = new Register({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    });

    const registered = await registerOne.save();
    console.log(registered);
    res.status(201).render("index");
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/simple-search", async (req, res) => {
  try {
    console.log(req.body.keyword);

    res.status(201).render("product_grid");
  } catch (e) {
    res.status(400).send(e);
  }
  // try{
  //     const registerOne = new Register({
  //         name: req.body.name,
  //         email: req.body.email,
  //         phone: req.body.phone,
  //         address: req.body.address
  //     })

  //     const registered = await registerOne.save();
  //     console.log(registered)
  //     res.status(201).render("index");

  // }catch(e){
  //     res.status(400).send(e);
  // }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    console.log(req.body);

    const check = await Register.findOne({ email: email });
    console.log(check);
    res.status(201).send(check);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});


const createDocument = async () => {
  try {
    const userInstance = new User({
      id: "10002",
      username: "good@123",
      password: "abcde",
      first_name: "Good",
      last_name: "One",
      address: "Jabalpur",
      contact: "123456789",
    });
    // insert
    const result = await userInstance.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};



// Create many documents
const manyDoc = [
  { category_id: 1, category_name: "Electronics" },
  { category_id: 2, category_name: "Clothing" },
  { category_id: 3, category_name: "Shoes" },
  { category_id: 4, category_name: "Jewelry" },
  { category_id: 5, category_name: "Beauty" },
  { category_id: 6, category_name: "Health & Wellness" },
  { category_id: 7, category_name: "Sports & Outdoors" },
  { category_id: 8, category_name: "Toys & Games" },
  { category_id: 9, category_name: "Home & Garden" },
  { category_id: 10, category_name: "Kitchen & Dining" },
  { category_id: 11, category_name: "Furniture" },
  { category_id: 12, category_name: "Bedding & Bath" },
  { category_id: 13, category_name: "Books" },
  { category_id: 14, category_name: "Music" },
  { category_id: 15, category_name: "Movies & TV" },
  { category_id: 16, category_name: "Pet Supplies" },
  { category_id: 17, category_name: "Food & Beverages" },
  { category_id: 18, category_name: "Office & School Supplies" },
  { category_id: 19, category_name: "Travel & Luggage" },
  { category_id: 20, category_name: "Automotive" },
  { category_id: 21, category_name: "Art Supplies" },
  { category_id: 22, category_name: "Crafts & Hobbies" },
  { category_id: 23, category_name: "Baby Gear" },
  { category_id: 24, category_name: "Kids' Clothing" },
  { category_id: 25, category_name: "Baby & Toddler Toys" },
  { category_id: 26, category_name: "Outdoor Play Equipment" },
  { category_id: 27, category_name: "Gardening & Lawn Care" },
  { category_id: 28, category_name: "DIY & Home Improvement" },
  { category_id: 29, category_name: "Industrial & Scientific" },
  { category_id: 30, category_name: "Electrical & Lighting" },
  { category_id: 31, category_name: "Plumbing & HVAC" },
  { category_id: 32, category_name: "Wedding & Party Supplies" },
];

const createManyDocAndInsertIt = async () => {
  const docs = [];
  for (let i in manyDoc) {
    docs.push(new ProductCategory(manyDoc[i]));
  }
  try {
    const result = await ProductCategory.insertMany(docs);
    console.log("Succesfully inserted..");
    //console.log(result);
  } catch (err) {
    console.log(err);
  }
};

//createManyDocAndInsertIt();
