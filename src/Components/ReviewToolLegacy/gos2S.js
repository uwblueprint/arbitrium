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
    "Email Address": 2
  },
  grant: {},
  funding: {},
  mission: {}
};

export const fileCategories = {
  "Authorization and Confirmation": 1
};

export const longAnswerCategories = {
  "Has anything changed with respect to your organizations eligibility to apply for this fund? If so, please provide details:": 1,
  "Are there any updates to the contact person or their information since the last application? If so, please provide details:": 1,
  "Are there any updates to the executive contact person or their information since the last application? If so, please provide details:": 1,
  "Are there any updates to the contact information provided for the qualified donee? If so, please provide details:": 1,
  "Are there any updates to the Organization Profile as provided in the last application?  (e_dot_g_dot_ Mission, Mandate, Primary Activities, People served or related to finances, including annual income,  Reserve Funds or the organizations strategic plan, geographic area served or areas of service)_dot_ If so, please provide details (max 300 words):": 1,
  "Are there any updates to the proposal provided in the previous application (including but not limited to organizational context, relationships with other service providers, evaluation plans or sustainability of the organization)?If so, please provide details (max 300 words):": 1
};

export const checkBoxCategories = {};

export const ratingCategories = {
  //todo upon completion of ratings API call
};
