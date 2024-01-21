const mongoose = require("mongoose");
const Person = require("./models/person");
const dotenv =   require('dotenv');
dotenv.config();

//---@connecting database to server---
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
        .then( () => console.log("connected to database with succes"))
        .catch((err) => console.log("connection failed", err));

//---@creating and Saving a Record of a Model---
async function createPerson(){
        const person = new Person({
            name: "Omar",
            email:"omar12542@gmail.com",
            age:25,
            favoriteFoods:["pizza", "sandwich"],
            isVegetarian: false
    })
    const result = await person.save();
    console.log(result);
}
    createPerson();



//------@Create Records------
const arrayOfPeople = [
    {name:"Mohamed", email:"mohamed@gmail.fr", age: 18, favoriteFoods:["Pizza","Cake"],isVegetarian:true},
    {name:"Ahmed", email:"ahmed@gmail.com", age: 25, favoriteFoods:["Hamburger","Cheese"],isVegetarian:false},
    {name:"Darine", age: 11, favoriteFoods:["Banane","Fraise"],isVegetarian:true},
    {name:"Sameh", email:"sameh123@gmail.com", age: 51, favoriteFoods:["Lasagne"],isVegetarian:false}
];
const createManyPerson = async (arrayOfPeople) => {
    try{
        const createPeople = await  Person.create(arrayOfPeople);
        console.log("People created successfully:", createPeople);
    }
    catch (err) {
        console.log(err);
    }  
};
    createManyPerson(arrayOfPeople);




//------@Use model.find() to Search Your Database------
    const findModelByName = async (name) =>{      //searching by name
        try{
        const people = await Person.find({name: name});
        console.log(`the person named is ${name}:`,people);
        } catch (err){
            console.log(err);
        }   
    };
    findModelByName("Sameh");





//------@Use model.findOne() to Return a Single Matching Document from Your Database------
    const findOnePerson= async (favoriteFoods) =>{       //seraching bu favorite food
        try{
            const personlovesfood = await Person.findOne({favoriteFoods:{$in: [favoriteFoods]}});
            console.log(`the person who loves ${favoriteFoods} is: `, personlovesfood);
        } catch (err){
            console.error(err);
        }
    };
    findOnePerson("Pizza");





//-----@Use model.findById() to Search Database By _id----
    const findPersonById= async (_id) =>{
        try{
            const personById = await Person.findById({_id : _id });       //find person by id
            console.log(`the person by Id is :`, personById);
        } catch(err){
            console.error(err);
        }
    };
    findPersonById( '6596783caa37b64de14ca9f1');





//-----@Perform Classic Updates by Running Find, Edit, then Save-------
    const updateFood = async (_id) =>{
        try{
            const personfinded = await Person.findById(_id );    //finded person by id
            personfinded.favoriteFoods.push('Salade');        //push Salade to [favoriteFoods]
            const updatedFood = await personfinded.save();       //save the update to the person finded by id
            console.log("updated food of the person ", updatedFood );
        }catch(err){
            console.error(err);
        }
    };
    updateFood('6596783caa37b64de14ca9f1');





//-------@Perform New Updates on a Document Using model.findOneAndUpdate()-------
const updatePerson =  async (name) => {          //finding person by name
    try{
        const personfound =  await Person.findOneAndUpdate({ name: name }, { $set: { age: 20 } }, { new: true })
        console.log("person found and updated:", personfound);
    } catch (err) {
        console.error(err);
    }
};
    updatePerson("Lassaad");




//------@Delete One Document Using model.findByIdAndRemove------
const deletePerson =  async (_id) => {
    try{
        const personDeleted = await  Person.findByIdAndDelete( {_id} )
        console.log("person deleted:", personDeleted);
    } catch (err) {
        console.error(err);
    }
}
    deletePerson('6596787d9be22e325f5282a5');



//-----@Delete Many Documents with model.deleteMany()-----
const deleteManyPeople = async (name) =>{
    try{
        const manyPeopleDeleted = await Person.deleteMany({name: "Mohamed"})
        console.log("person deleted are:", manyPeopleDeleted)
    } catch (err){
        console.error(err);
    };
}
    deleteManyPeople();




//------@Chain Search Query Helpers to Narrow Search Results-----
const queryChain = () =>{
    Person.find({favoriteFoods:"Lasagne"})       //Find people who like burritos
        .sort({name:1})       // sort ascending by firstName
        .limit(2)            // limit to 2 items
        .select("-age")     // Hide the age
        .exec()
        .then(()=>{
            console.log("Query Chain Completed!");
        })
        .catch((err) => {
            console.error(err);
        })
}
    queryChain();

