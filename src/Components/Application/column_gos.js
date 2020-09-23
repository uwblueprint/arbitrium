//SVP Full Proposal

export const canvasData = [
  {
    title: "Organizational Profile",
    description: "Does the organization’s primary activities/services align with the mission and mandate? Are they operating within United Way WRC’s service areas and focus areas?"
  },
  {
    title: "Strategic Planning",
    description: "Does the organization have a strategic plan that guides the organization’s activities or are they working toward a plan? Are they addressing equity?"
  },
  {
    title: "Financial Profile",
    description: "Is the organization fiscally sound? Are the sources of revenue diverse? Are there reserve funds in place to support the organization long-term?"
  },
  {
    title: "Case For Support",
    description: "Does the organization seem to have a culture of learning (i.e. they are aware of areas for improvement and have strategies to address, etc.)? Do they have a way to measure effectiveness? (Q3 and Q4) Is the organization collaborative? (Q5,Q6,Q7) "
  },
];

//the format for adminCategories is properyName: displayOrder
//(where a higher displayOrder corresponds to a higher position on the submissions page listview of categories)
export const adminCategories = {
  contact: {
    "Organization Name": 1,
    "Charitable Number / Incorporation Number": 2,
    "Agency Website": 3,
    "Other Social Media": 4,
    "Contact Name": 5,
    "Contact Email": 6,
    "Contact Position Title": 7,
    "Contact Phone Number": 8,
    "Executive Name": 9,
    "Executive Position Title and/or affiliation with organization": 10,
    "Executive Email": 11,
    "Executive Phone Number": 12,
    "Street Address or P-O- Box": 13,
    "Community/Region Name": 14,
    "Province or Territory": 15,
    "Postal Code": 16,
  },
  grant: {
    "How much funding are you requesting (ex 5000)": 1,
  },
  funding: {},
  mission: {}
};

export const fileCategories = {
  "Authorization and Confirmation": 1,
  "3-6-f - Audited Financials": 2,
};

export const longAnswerCategories = {
  "3-1 - What is your organization's mission and mandate (max- 50 words)": 1,
  "3-2 - What are your organization's primary activities, services or programs (max- 250 words)": 1,
  "3-3 - How many people were served by your organization last year": 1,
  "3-8 - In which geographic regions do you operate/serve participants Select all which apply-": 1,
  "3-9 - What are the primary areas of service for your organization": 1,

  "3-7-a - Does your organization have a current strategic plan (max- 200 words)": 2,
  "3-7-b - What are the strategic plan goals (max- 50 words)": 2,
  "3-7-c - Briefly describe how your programs and related activities are designed to achieve your goals- (max 200 words)": 2,
  "3-7-d - Have you added or eliminated any mission-related activities during the last 12 months If Yes, please explain- (max- 200 words)": 2,
  "Please describe how your organization is working toward building equity and inclusion within your workplace, your Board, and in your program delivery- (max- 250 words)": 2,

  "3-4-a - What was your total gross annual income last year": 3,
  "3-4-b - What percentage of your annual funding is unrestricted (max- 50 words)": 3,
  "3-5 - Does your organization, or any related organization (e-g- foundation) have an endowment fund, reserve fund or large surplus If yes, please advise us of the board policy, purpose and restrictions on these funds- Please indicate the fund balance(s) at the end of the last fiscal year- (max- 200 words)": 3,
  "3-6-a - List the amounts and the total of your organization's top ten sources of revenue in the last complete fiscal year- (max- 250 words)": 3,
  "3-6-b - Have there been meaningful shifts or changes in your funding sources over the last five years If Yes, how so (max- 100 words)": 3,
  "3-6-c - What changes in funding, if any, do you anticipate in the next three years (max- 100 words)": 3,
  "3-6-d - Approximately how many months of operating cash or cash equivalents does your organization currently hold (max- 50 words)": 3,
  "3-6-e - Briefly describe any financial challenges and budget concerns that you are currently facing- (max- 100 words)": 3,
  "3-6-f - Audited Financials": 3,
  "4-4 - What would need to change, if anything, in order for you to feel that your organization was financially secure (max- 150 words)": 3,

  "4-1-a - What gets in the way of your organization achieving its mission (max- 150 words)": 4,
  "4-1-b - What short and long-term strategies, if any, have you identified for addressing these obstacles (max- 150 words)": 4,
  "4-3-a - How do you track and measure the effectiveness of your organization (max- 150 words)": 4,
  "4-3-b - Please summarize key evaluation results or findings that demonstrate the organization's impact- (max- 150 words)": 4,

  "4-2-a - What collaboratives/networks are you actively involved in Why (max- 250 words)": 4,
  "4-2-b - Who do you consider to be your most important partners (max- 250 words)": 4,
  "4-2-c - What work, if any, are you involved in that reaches beyond the scope of your individual organization (e-g- field-building work, advocacy, systems change, etc-) Please describe- (max- 250 words)": 4,
};

export const checkBoxCategories = {};

export const ratingCategories = {
  //todo upon completion of ratings API call
};
