//Dummy Data form

export const canvasData = [
  {
    title: "Impact",
    description: ""
  },
  {
    title: "Necessity",
    description: ""
  },
  {
    title: "Scope and technical fit",
    description: ""
  },
  {
    title: "Credibility",
    description: ""
  }
];

//the format for adminCategories is properyName: displayOrder
//(where a higher displayOrder corresponds to a higher position on the submissions page listview of categories)
export const adminCategories = {
  contact: {
    "Organization name": 1,
    "Contact name": 2,
    "Contact email": 3,
    "How would you describe your vibes?": 4
  },
  grant: {},
  funding: {},
  mission: {}
};

export const fileCategories = {
  "File Upload": 1
};

export const longAnswerCategories = {
  "How many people does this problem affect?": 1,
  "Who are the users?": 1,
  "How important is this problem to your users?": 1,
  "How might you see the problem differently than your users?": 1,
  "What is your current process?": 2,
  "What are your current pain points?": 2,

  "What solutions are there that might solve part of this problem?": 2,
  "Are there any data privacy concerns?": 3,
  "Have you considered paying for a third-party solution for this problem?": 3,
  "Are you willing to pay for hosting and development costs?": 3,

  "Will you be able to put us in contact with users that we can work with throughout the project?": 4,
  "What's the size of the user base?": 4,
  "What's the scale of the project?": 4
};

export const checkBoxCategories = {};

export const ratingCategories = {
  //todo upon completion of ratings API call
};
