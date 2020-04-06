//the format for adminCategories is properyName: displayOrder
//(where a higher displayOrder corresponds to a higher position on the submissions page listview of categories)
export const adminCategories = {
  Admin:  {
    'Organization Name': 1,
    'Registered Charitable #': 2,
    'Executive Director / CEO Name': 3,
    'Executive Director / CEO Email': 4,
    'Contact Name': 5,
    'Conect Email': 6,
    'Office Address': 7,
    'Website Address': 8,
    'Amount Requested (up to $20,000)': 9
  },
}

export const fileCategories = {
}

export const longAnswerCategories = {
  'What is the urgent or emerging need that is being addressed via this application? (300 words)': 1,
  'Provide a brief description of the core activities for which you are seeking funding - Describe what the activities are, who they involve, where they will take place and whether these activities are new or enhance existing service delivery (500 words)': 2,
  'Provide a description of the activities for which you are seeking funding that will support the health, wellness and safety of your staff and volunteers? What percentage of the funding you have requested is dedicated to this (500 words)': 3,
  'What plans have you and your board put together or are thinking about to ensure the viability of your organization for the next 6 months? Please include any organization that you are currently in discussions with or partnering with for service continuity (500 words)': 4,
  'If you have background information that is already completed and provides more information on your organization that will help us evaluate your application, please provide links to your documents (PDF)': 5,
}

export const ratingCategories = {
    //todo upon completion of ratings API call
}
