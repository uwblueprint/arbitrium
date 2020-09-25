//SVP Full Proposal

export const canvasData = [
  {
    title: "Service Description (Brief) &amp; Vulnerable Populations Served",
    description:
      "Do the vulnerable populations selected align with the project/program described?"
  },
  {
    title: "Service Description (Long Answer)",
    description:
      "Do response provided present a clear picture of what the agency is trying to do, for whom, and why? Is an evaluation strategy provided?"
  },
  {
    title: "Output Tracking",
    description:
      "Will the selected outputs provide sufficient information to evaluate the success/impact of services provided?"
  },
  {
    title: "Service Area",
    description:
      "Does the service area, geographic area, and timelines make sense for the program? Are they aligned with the program or project described?"
  },
  {
    title: "Additional Service Information",
    description:
      "Has additional service information been provided? Are the responses reasonable within the context of the program or project described?"
  }
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
    "Postal Code": 16
  },
  grant: {
    "4-1-a - What is the total grant request from United Way Waterloo Region Communities": 1,
    "4-1-b - Will the service be provided if awarded a lesser amount": 2,
    "Organization Mission (approximately 25 words)": 3,
    "Please describe how your organization is working toward building equity and inclusion within your workplace, your Board, and in your program delivery- (max- 250 words)": 4
  },
  funding: {},
  mission: {}
};

export const fileCategories = {
  Budget: 1,
  "Audited Financials": 2,
  "Authorization and Confirmation": 3
};

export const longAnswerCategories = {
  "Service Name": 1,
  "One-Line Description (approximately 25 words)": 1,
  "3-1 - Which populations do you serve Select all which apply-": 1,

  "3-4-a - What is the issue being addressed and who will the service help (max- 250 words)": 2,
  "3-4-b - Why is it important and how do you know (max- 250 words)": 2,
  "3-4-c- What difference or benefit, it will make in lives (outcomes) and how will you know (evaluation) (max- 250 words)": 2,

  "3-4-d - What outputs are you tracking (e-g- # of food hampers, # of counselling sessions, etc-) Minimum of three required- (max- 250 words)": 3,
  "3-4-e - How many unique individuals do you anticipate serving": 3,

  "3-5 - What are the primary areas of service for your organization": 4,
  "3-2 - In which geographic regions do you operate/serve participants Select all which apply-": 4,
  "3-3 - Service Start Date": 4,
  "3-3 - Service End Date": 4,

  "3-6-a - Is this program/project being delivered by a coalition of agencies or through a partnership table in your community": 5,
  "3-6-b - If yes, please provide details about the coalition (e-g- lead agency, member agencies, roles)- (max- 200 words)": 5
};

export const checkBoxCategories = {};

export const ratingCategories = {
  //todo upon completion of ratings API call
};
