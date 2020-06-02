//the format for adminCategories is properyName: displayOrder
//(where a higher displayOrder corresponds to a higher position on the submissions page listview of categories)
export const adminCategories = {
  Admin: {
    "Organization Name": 1,
    "Registered Charitable #": 2,
    "Executive Director / CEO Name": 3,
    "Executive Director / CEO Email": 4,
    "Contact Name": 5,
    "Contact Email": 6,
    "Contact Phone Number": 7,
    "Office Address": 8,
    "Website Address": 9,
    "Amount Requested (up to $20,000)": 10,
    "Number of seniors to be served": 11
  }
};

export const fileCategories = {};

export const longAnswerCategories = {
  "What is the urgent or emerging need that is being addressed via this application (~300 words)": 1,
  "Provide a brief description of the activities for which you are seeking funding - Describe what the activities are, where they will take place, and whether these activities are new or enhance existing service delivery (~500 words)": 2,
  "Services to be Provided (check all that apply)": 3,
  "Demographics of participants – Please indicate which categories participants fall into (check all that apply):": 4
};

export const ratingCategories = {
  //todo upon completion of ratings API call
};
