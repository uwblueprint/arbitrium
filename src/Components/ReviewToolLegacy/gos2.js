//SVP Full Proposal

export const canvasData = [
  {
    title: "Organizational Profile",
    description:
      "Does the organization’s primary activities/services align with the mission and mandate? Are they operating within United Way WRC’s service areas and focus areas?"
  },
  {
    title: "Strategic Planning",
    description:
      "Does the organization have a strategic plan that guides the organization’s activities or are they working toward a plan? Are they addressing equity?"
  },
  {
    title: "Financial Profile",
    description:
      "Is the organization fiscally sound? Are the sources of revenue diverse? Are there reserve funds in place to support the organization long-term?"
  },
  {
    title: "Case For Support",
    description:
      "Does the organization seem to have a culture of learning (i.e. they are aware of areas for improvement and have strategies to address, etc.)? Do they have a way to measure effectiveness? (Q3 and Q4) Is the organization collaborative? (Q5,Q6,Q7) "
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
    "Street Address or P_dot_O_dot_ Box": 13,
    "City/Town": 14,
    "Province or Territory": 15,
    "Postal Code": 16
  },
  grant: {
    "How much funding are you requesting (ex 5000)": 1
  },
  funding: {},
  mission: {}
};

export const fileCategories = {
  "Authorization and Confirmation": 1,
  "Audited Financials": 2
};

export const longAnswerCategories = {
  "3_dot_1 _dash_ What is your organization's mission and mandate? (max_dot_ 50 words)": 1,
  "3_dot_2 _dash_ What are your organization's primary activities, services or programs? (max_dot_ 250 words)": 1,
  "3_dot_3 _dash_ How many people were served by your organization last year?": 1,
  "3_dot_8 _dash_ In which geographic regions do you operate/serve participants? Select all which apply_dot_": 1,
  "3_dot_9 _dash_ What are the primary areas of service for your organization?": 1,

  "3_dot_7_dot_a _dash_ Does your organization have a current strategic plan? (max_dot_ 200 words)": 2,
  "3_dot_7_dot_b _dash_ What are the strategic plan goals? (max_dot_ 50 words)": 2,
  "3_dot_7_dot_c _dash_ Briefly describe how your programs and related activities are designed to achieve your goals_dot_ (max_dot_ 250 words)": 2,
  "3_dot_7_dot_d _dash_ Have you added or eliminated any mission_dash_related activities during the last 12 months? If Yes, please explain_dot_ (max_dot_ 200 words)": 2,
  "Please describe how your organization is working toward building equity and inclusion within your workplace, your Board, and in your program delivery_dot_ (max_dot_ 250 words)": 2,

  "3_dot_4_dot_a _dash_ What was your total gross annual income last year?": 3,
  "3_dot_4_dot_b _dash_ What percentage of your annual funding is unrestricted?": 3,
  "3_dot_5 _dash_ Does your organization, or any related organization (e_dot_g_dot_ foundation) have an endowment fund, reserve fund or large surplus? (max_dot_ 200 words)": 3,
  "3_dot_6_dot_a _dash_ List the amounts and the total of your organization's top ten sources of revenue in the last complete fiscal year_dot_ (max_dot_ 250 words)": 3,
  "3_dot_6_dot_b _dash_ Have there been meaningful shifts or changes in your funding sources over the last five years? If Yes, how so? (max_dot_ 100 words)": 3,
  "3_dot_6_dot_c _dash_ What changes in funding, if any, do you anticipate in the next three years? (max_dot_ 100 words)": 3,
  "3_dot_6_dot_d _dash_ Approximately how many months of operating cash or cash equivalents does your organization currently hold? (max_dot_ 50 words)": 3,
  "3_dot_6_dot_e _dash_ Briefly describe any financial challenges and budget concerns that you are currently facing_dot_ (max_dot_ 100 words)": 3,
  "4_dot_4 _dash_ What would need to change, if anything, in order for you to feel that your organization was financially secure? (max_dot_ 150 words)": 3,

  "4_dot_1_dot_a _dash_ What gets in the way of your organization achieving its mission? (max_dot_ 150 words)": 4,
  "4_dot_1_dot_b _dash_ What short and long_dash_term strategies, if any, have you identified for addressing these obstacles? (max_dot_ 150 words)": 4,
  "4_dot_3_dot_a _dash_ How do you track and measure the effectiveness of your organization? (max_dot_ 150 words)": 4,
  "4_dot_3_dot_b _dash_ Please summarize key evaluation results or findings that demonstrate the organization's impact_dot_ (max_dot_ 150 words)": 4,

  "4_dot_2_dot_a _dash_ What collaboratives/networks are you actively involved in? Why? (max_dot_ 250 words)": 4,
  "4_dot_2_dot_b _dash_ Who do you consider to be your most important partners? (max_dot_ 250 words)": 4,
  "4_dot_2_dot_c _dash_ What work, if any, are you involved in that reaches beyond the scope of your individual organization (e_dot_g_dot_ field_dash_building work, advocacy, systems change, etc_dot_)? Please describe_dot_ (max_dot_ 250 words)": 4
};

export const checkBoxCategories = {};

export const ratingCategories = {
  //todo upon completion of ratings API call
};
