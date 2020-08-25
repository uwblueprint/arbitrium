const express = require("express");

const router = express.Router();
const db = require("../mongo.js");

// Base URL: /api/forms

//------------------------------------------------------------------------------
// Form
//------------------------------------------------------------------------------

// Create a new form
router.post("/", (req, res) => {
  db.forms.create(req.body, (error, result) => {
    if (error) {
      console.log("Error inserting new form into MongoDB");
      res.status(500).send(error);
    } else {
      res.status(201).json(result);
    }
  });
});

// Delete a form
router.delete("/:formId", (req, res) => {
  db.forms.deleteOne({ _id: req.params.formId }, (error, result) => {
    if (error || !result || (result && result.n !== 1)) {
      console.log(`Error deleting form with ID = ${req.params.formId}`);
      res.status(500).send(error);
    } else {
      res.status(204).send();
    }
  });
});

// Get form with formId
router.get("/:formId", (req, res) => {
  db.forms.findById(req.params.formId, (error, result) => {
    if (error) {
      console.log(`Error getting form with ID = ${req.params.formId}`);
      res.status(500).send(error);
    } else {
      res.status(200).json(result);
    }
  });
});

//------------------------------------------------------------------------------
// Sections
//------------------------------------------------------------------------------

// Add a section to an existing form, returns the resulting form object
router.post("/:formId/sections", (req, res) => {
  db.forms.findByIdAndUpdate(
    req.params.formId,
    { $push: { sections: req.body } },
    { useFindAndModify: false, runValidators: true, returnOriginal: false },
    (error, result) => {
      if (error) {
        console.log(
          `Error adding section to form with ID = ${req.params.formId}`
        );
        res.status(500).send(error);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

// Delete a section from an existing form, returns the resulting form object
router.delete("/:formId/sections/:sectionId", (req, res) => {
  db.forms.findByIdAndUpdate(
    req.params.formId,
    { $pull: { sections: { _id: req.params.sectionId } } },
    { useFindAndModify: false, returnOriginal: false },
    (error, result) => {
      if (error) {
        console.log(
          `Error deleting section with ID = ${req.params.sectionId} from form with ID = ${req.params.formId}`
        );
        res.status(500).send(error);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

// Update sections (e.g. change order), returns the resulting form object
// NOTE: The entire sections array is overwritten, req.body should include
//       the _id for each section if _id is required to stay constant
router.patch("/:formId/sections", (req, res) => {
  db.forms.findByIdAndUpdate(
    req.params.formId,
    { $set: { sections: req.body } },
    { useFindAndModify: false, returnOriginal: false, runValidators: true },
    (error, result) => {
      if (error) {
        console.log(
          `Error updating sections of form with ID = ${req.params.formId}`
        );
        res.status(500).send(error);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

//------------------------------------------------------------------------------
// Questions
//------------------------------------------------------------------------------

// Add a question to an existing section in an existing form, returns resulting form object
router.post("/:formId/sections/:sectionId/questions", (req, res) => {
  db.forms.findOneAndUpdate(
    { _id: req.params.formId, "sections._id": req.params.sectionId },
    { $push: { "sections.$.questions": req.body } },
    { useFindAndModify: false, runValidators: true, returnOriginal: false },
    (error, result) => {
      if (error) {
        console.log(
          `Error adding question to section with ID = ${req.params.sectionId} in form with ID = ${req.params.formId}`
        );
        res.status(500).send(error);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

// Delete a question from section in a form, returns resulting form object
router.delete(
  "/:formId/sections/:sectionId/questions/:questionId",
  (req, res) => {
    db.forms.findOneAndUpdate(
      { _id: req.params.formId, "sections._id": req.params.sectionId },
      { $pull: { "sections.$.questions": { _id: req.params.questionId } } },
      { useFindAndModify: false, returnOriginal: false },
      (error, result) => {
        if (error) {
          console.log(
            `Error deleting question with ID = ${req.params.questionId} from section with ID = ${req.params.sectionId} from form with ID = ${req.params.formId}`
          );
          res.status(500).send(error);
        } else {
          res.status(200).json(result);
        }
      }
    );
  }
);

// Update questions (e.g. change order), returns resulting form object
// NOTE: The entire questions array is overwritten, req.body should include
//       the _id for each question if _id is required to stay constant
router.patch("/:formId/sections/:sectionId/questions", (req, res) => {
  db.forms.findOneAndUpdate(
    { _id: req.params.formId, "sections._id": req.params.sectionId },
    { $set: { "sections.$.questions": req.body } },
    { useFindAndModify: false, returnOriginal: false, runValidators: true },
    (error, result) => {
      if (error) {
        console.log(
          `Error updating questions in section with ID = ${req.params.sectionId} in form with ID = ${req.params.formId}`
        );
        res.status(500).send(error);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

module.exports = router;
