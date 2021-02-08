//SVP Full Proposal

export const canvasData = [
  {
    title: "Service Information",
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
    "Executive Contact Name": 9,
    "Executive Contact Position Title": 10,
    "Executive Email": 11,
    "Executive Phone Number": 12,
    "Street Address or P_dot_O_dot_ Box": 13,
    "City/Town": 14,
    "Province or Territory": 15,
    "Postal Code": 16
  },
  grant: {
    "4_dot_1_dot_a _dash_ What is the total grant request from United Way Waterloo Region Communities?": 1,
    "4_dot_1_dot_b _dash_ Will the service be provided if awarded a lesser amount?": 2,
    "Organization Mission (maximum 25 words)": 3,
    "Please describe how your organization is working toward building equity and inclusion within your workplace, your Board, and in your program delivery_dot_ (max_dot_ 250 words)": 4
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
  "One_dash_Line Description (maximum 25 words)": 1,
  "3_dot_1 _dash_ Which populations do you serve? Select all which apply_dot_": 1,

  "3_dot_4_dot_a _dash_ What is the issue being addressed and who will the service help? (max_dot_ 250 words)": 2,
  "3_dot_4_dot_b _dash_ How will the funding requested be used (key activities)? (max_dot_ 250 words)": 2,
  "3_dot_4_dot_c _dash_ Why is it important and how do you know? (max_dot_ 250 words)": 2,
  "3_dot_4_dot_d_dash_ What difference or benefit, it will make in lives (outcomes) and how will you know (evaluation)? (max_dot_ 250 words)": 2,

  "3_dot_4_dot_e _dash_ What outputs are you tracking (e_dot_g_dot_ # of food hampers, # of counselling sessions, etc_dot_)? Minimum of three required_dot_ (max_dot_ 250 words)": 3,
  "3_dot_4_dot_f _dash_ How many unique individuals do you anticipate serving?": 3,

  "3_dot_5 _dash_ What is the primary service area that this program/project proposal will address?": 4,
  "3_dot_2 _dash_ In which geographic regions do you operate/serve participants? Select all which apply_dot_": 4,
  "3_dot_3 _dash_ Service Start Date (for which funding applies)": 4,
  "3_dot_3 _dash_ Service End Date (for which funding applies)": 4,

  "3_dot_6_dot_a _dash_ Is this program/project being delivered by a coalition of agencies or through a partnership table in your community?": 5,
  "3_dot_6_dot_b _dash_ If yes, please provide details about the coalition (e_dot_g_dot_ lead agency, member agencies, roles)_dot_ (max_dot_ 200 words)": 5
};

export const checkBoxCategories = {};

export const ratingCategories = {
  //todo upon completion of ratings API call
};
