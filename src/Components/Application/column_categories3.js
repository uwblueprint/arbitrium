//the format for adminCategories is properyName: displayOrder
//(where a higher displayOrder corresponds to a higher position on the submissions page listview of categories)
export const adminCategories = {
  contact: {
    "Organization Name (legal name)": 1,
    "Charitable Number / Incorporation Number": 2,
    "Agency Website": 3,
    "Other Social Media": 4,
    "Contact Name": 5,
    "Contact Email": 6,
    "Contact Position Title": 7,
    "Contact Phone Number": 8,
    "Street Address or P-O- Box": 9,
    "Community/Region Name": 10,
    "Province or Territory": 11,
    "Postal Code": 12,
  },
  grant: {
    "What is the total grant request from United Way Waterloo Region Communities (Ex- 20000)": 1,
    "Will the service be provided if awarded a lesser amount": 1,
  },
  funding: {
    "1-2 Has the organization applied to any other funder (i-e- Canadian Red Cross or Community Foundations Canada) for this specific request": 1,
    "Please state which funder": 2,
    "Please state the amount": 3,
    "Please indicate if this application covers different expenses within this service": 4
  },
  mission: {
    "Organization Mission (approximately 25 words)": 1
  }
};

export const fileCategories = {
  "Budget": 1,
  "Authorization and Confirmation": 2,
};

export const longAnswerCategories = {
  "Service Name": 1,
  "One-Line Description (approximately 25 words)": 1,
  "Populations by Children, Youth, or Elderly ": 1,
  "Populations Requiring Specific Care or Support ": 1,
  "Indigenous People ": 1,
  "Racialized Communities ": 1,
  "Gender, Sexual Identity, and Newcomers ": 1,
  "Vulnerable Workers ": 1,
  "Linguistic Minorities ": 1,
  "Other": 1,
  "Food Security": 2,
  "Financial Wellness": 2,
  "Home Care or Personal Support": 2,
  "Health and Hygiene": 2,
  "Information and Navigation": 2,
  "Legal Support": 2,
  "Mental Health and Wellness": 2,
  "Shelter": 2,
  "Personal Safety": 2,
  "Social Inclusion and Learning": 2,
  "Transportation": 2,
  "Other, Specify:": 2,
  "Types of Activities": 3,
  "Geographic Areas of Service": 3,
  "Service Start Date": 3,
  "Service End Date": 3,
  "Who the service will help (max 250 words)": 4,
  "And, how it will help them, or what the activities are (max 250 words)": 4,
  "And, the difference, benefit, it will make in lives  (max 250 words)": 4,
  "Optional:  How do you know this is needed, in relation to COVID-19 (Answer with statistical, story, or anecdotal evidence as you see fit-  Max 250 words):": 4,
  "How many unique individuals do you anticipate serving": 4,
  "How many service interactions do you anticipate providing": 4,
  "Is this an existing service": 5,
  "If yes, how many additional people does the service anticipate reaching as a result of this application": 5,
  "Is this program/project being delivered by a coalition of agencies or through a partnership table in your community ": 5,
  "If yes, please provide details about the coalition (e-g- lead agency, member agencies, roles-  Max 200 words)        ": 5,
  "3-9 Will this service engage the support/involvement of Canadians/Businesses": 5,
  "If yes, How many volunteers": 5,
  "If yes, How many businesses": 5,
  "If yes, How many Donors": 5,
};

export const checkBoxCategories = {
    "Populations by Children, Youth, or Elderly ": 1,

}

export const ratingCategories = {
  //todo upon completion of ratings API call
};
