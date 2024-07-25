const Person = require('../model/personModel');

const deletePersonById = async (req, res) => {
  try {
    const id = req.params.id;
    const person = await Person.findById(id);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.render('deletePerson', { person });
  } catch (error) {
    console.error("Error fetching person for deletion:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const confirmDeletePersonById = async (req, res) => {
  try {
    const id = req.params.id;
    await Person.findByIdAndDelete(id);
    res.redirect('/person');
  } catch (error) {
    console.error("Error deleting person:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllPerson: async (req, res) => {
    try {
      const persons = await Person.find();
      res.render('listPerson', { persons });
    } catch (error) {
      console.error("Error fetching persons:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  addNewPerson: async (req, res) => {
    try {
      const { name, age, gender, mobileNumber } = req.body;
      const newPerson = new Person({ name, age, gender, mobileNumber });
      await newPerson.save();
      res.redirect('/person');
    } catch (error) {
      console.error("Error adding person:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  editPerson: async (req, res) => {
    try {
      const id = req.params.id;
      const person = await Person.findById(id);
      if (!person) {
        return res.status(404).json({ message: "Person not found" });
      }
      res.render('editPerson', { person });
    } catch (error) {
      console.error("Error fetching person for editing:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  updatePersonById: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, age, gender, mobileNumber } = req.body;
      await Person.findByIdAndUpdate(id, { name, age, gender, mobileNumber });
      res.redirect('/person');
    } catch (error) {
      console.error("Error updating person:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  deletePersonById,
  confirmDeletePersonById
};
