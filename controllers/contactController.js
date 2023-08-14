const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all constact
//@route GET /api/contacts
//@access Private
const getContacts = asyncHandler(
    async(req, res) => {
        const contacts = await Contact.find({user_id:req.user.id});
        res.status(200).json(contacts);
});

//@desc Create new constact
//@route POST /api/contacts
//@access Private
const createContact = asyncHandler(
    async(req, res) => {
        const reqBody = req.body;
        console.log(`Req body is: ${JSON.stringify(reqBody)}`);
        const { email, name, phone } = req.body;
        if (!email || !name || !phone) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        const contact = await Contact.create({
            name:reqBody.name, 
            email:reqBody.email,
            phone:reqBody.phone,
            user_id:req.user.id,
        })
        res.status(201).json(contact);
});

//@desc Get constact
//@route GET /api/contacts/:id
//@access Private
const getContact = asyncHandler(
    async(req, res, next) => {
        const contact = await Contact.findById(req.params.id);
        console.log(contact);
        if (contact===null) {
            console.log("Error Caught");
            res.status(404);
            throw new Error("Contact not found");
        }
        if(contact.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error("User don't have permission to view other user contacts");
        }
        res.status(200).json(contact);
    }
);
//@desc Update constact
//@route PUT /api/contacts/:id
//@access Private
const updateContact = asyncHandler(
    async(req, res) => {
        const contact = await Contact.findById(req.params.id);
        console.log(contact);
        if (contact===null) {
            console.log("Error Caught");
            res.status(404);
            throw new Error("Contact not found");
        }
        if(contact.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error("User don't have permission to update other user contacts");
        }
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.status(200).json(updatedContact);
});

//@desc Delete constact
//@route DELETE /api/contacts/:id
//@access Private
const deleteContact = asyncHandler(
    async(req, res) => {
        const contact = await Contact.findById(req.params.id);
        console.log(typeof(contact));
        console.log(contact);
        if (contact===null) {
            console.log("Error Caught");
            res.status(404);
            throw new Error("Contact not found");
        }
        if(contact.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error("User don't have permission to delete other user contacts");
        }
        //contact is object
        await contact.deleteOne();
        res.status(200).json(contact);
    }
);

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
};
