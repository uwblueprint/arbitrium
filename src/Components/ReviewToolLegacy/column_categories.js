//the format for adminCategories is properyName: displayOrder
//(where a higher displayOrder corresponds to a higher position on the submissions page listview of categories)
export const adminCategories = {
  contact: {
    "Contact First Name": 1,
    "Contact Last Name": 2,
    "Phone Number": 3,
    "Email Address": 4,
    "Street Address Line": 5,
    City: 6,
    "Province, State or County": 7,
    "Select a Country": 8,
    "Postal Code": 9,
    "Organization Website": 10
  },
  socialMedia: {
    Twitter: 1,
    Facebook: 2,
    Linkedin: 3,
    "Other Social Media Link": 4
  },
  organizationInformation: {
    "Charitable Registration Number": 1,
    "Organization Name": 2,
    "Organization Affiliation": 3,
    "Total Number of clients served in 2019": 4,
    "Total Number of volunteers in 2019": 5,
    "Annual Budget": 6,
    "Do your primary activities support residents in the Region of Waterloo?": 7
  },
  applicationInformation: {
    "Have you discussed your application with SVP's Executive Director?": 1
  }
};

export const fileCategories = {
  "A list of your current Board of Directors AND 3 external references (references could include other funders, past board members, or other community leaders etc)": 1,
  "An Executive Director bio": 2,
  "The current year's operational budget": 3,
  "Updates to the financial statements provided above, including non-audited or audited YTD statements": 4,
  "A letter supporting this application signed by the Board Chair and Executive Director": 5,
  "The two most recent audited financial statements": 6
};

export const longAnswerCategories = {
  "Mission and Vision - 600 characters (~100 words)": 1,
  "Elevator Pitch and Vision - 1800 characters (~300 words)": 1,
  "Senior Leadership - 900 characters (~150 words)": 2,
  "Board of Directors - 600 characters (~100 words)": 2,
  "Senior Leadership and Board Dynamics - 600 characters (~100 words)": 2,
  "Expected Leadership Changes - 900 characters (~150 words)": 2,
  "Succession Plan - 900 characters (~150 words)": 4,
  "Capacity Building Areas and Recent Experience - 900 characters (~150 words)": 4,
  "Potential Projects for SVP Partnership - 1500 characters (~250 words)": 3,
  "Results and Impact - 900 characters (~150 words)": 3,
  "Innovation and Approach  - 900 characters (~150 words)": 5,
  "Organizational Challenges and Opportunities  - 900 characters (~150 words)": 5,
  "Additional Information - 600 characters (~100 words)": 5
};

export const ratingCategories = {
  //todo upon completion of ratings API call
};
