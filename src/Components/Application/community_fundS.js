//SVP Full Proposal

export const canvasData = [
  {
    title: "Supplementary Information",
    description: ""
  }
];

//the format for adminCategories is properyName: displayOrder
//(where a higher displayOrder corresponds to a higher position on the submissions page listview of categories)
export const adminCategories = {
  contact: {
    "Organization Name": 1,
    "Email Address": 2,
    "Service Name": 3
  },
  grant: {
    "4_dot_1_dot_a _dash_ What is the total grant request from United Way Waterloo Region Communities?": 1,
    "4_dot_1_dot_b _dash_ Will the service be provided if awarded a lesser amount?": 2
  },
  funding: {},
  mission: {}
};

export const fileCategories = {
  "Authorization and Confirmation": 1,
  Budget: 2
};

export const longAnswerCategories = {
  "Has anything changed with respect to your organizations eligibility to apply for this fund? If so, please provide details:": 1,
  "Are there any updates to the contact person or their information since the last application? If so, please provide details:": 1,
  "Are there any updates to the executive contact person or their information since the last application? If so, please provide details:": 1,
  "Are there any updates to the contact information provided for the qualified donee? If so, please provide details:": 1,
  "Are there any updates to the Service Information provided since the last application (such as Population Served, Geographic area served, duration of program/project, primary service area, or items related to Service Description, including how funds requested will be used, how the program will be evaluated or intended outcome)?": 1,
  "Are there any updates to finance information including Reserve Fund(s), or current audited financial statements? If so, please provide details:": 1
};

export const checkBoxCategories = {};

export const ratingCategories = {
  //todo upon completion of ratings API call
};
