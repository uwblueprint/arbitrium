import moment from "moment";

import {
  fileCategories,
  adminCategories,
  longAnswerCategories,
  checkBoxCategories
} from "./column_categories3";

export function createReview(user, appId) {
  let review = {};
  const comments = [];
  const questionList = [];

  // THIS NEEDS TO BE MADE DYNAMIC IN THE FUTURE
  questionList.push({
    id: "canvas_1",
    notes: [],
    rating: -1
  });
  questionList.push({
    id: "canvas_2",
    notes: [],
    rating: -1
  });
  questionList.push({
    id: "canvas_3",
    notes: [],
    rating: -1
  });
  questionList.push({
    id: "canvas_4",
    notes: [],
    rating: -1
  });
  questionList.push({
    id: "canvas_5",
    notes: [],
    rating: -1
  });
  review = {
    applicationId: appId,
    userId: user.uid,
    rating: -1,
    comments: comments,
    lastReviewed: moment(),
    questionList: questionList
  };
  return review;
}

export function transpileCategoryData(application) {
  //todo when category data is made available, currently leverages mock data
  return {
    admin: Object.keys(adminCategories.contact).map((adminCategory) => ({
      title: adminCategory,
      value: application[adminCategory]
    })),
    funding: Object.keys(adminCategories.funding).map(
      adminCategory => ({
        title: adminCategory,
        value: application[adminCategory]
      })
    ),
    mission: Object.keys(adminCategories.mission
    ).map(adminCategory => ({
      title: adminCategory,
      value: application[adminCategory]
    })),
    grant: Object.keys(adminCategories.grant
    ).map(adminCategory => ({
      title: adminCategory,
      value: application[adminCategory]
    })),
    /*
    applicationInformation: Object.keys(
      adminCategories.applicationInformation
    ).map(adminCategory => ({
      title: adminCategory,
      value: application[adminCategory]
    }))
    */
  };
}

export function transpileFileData(application) {
  const files = Object.keys(fileCategories).map((fileCategory, index) => ({
    name: fileCategory,
    link: application[fileCategory],
    size: index * 500
  }));
  const fileLinks = [];
  files.forEach((file) => {
    if (file.link == null) return;
    file.link.split(",").forEach((link, index) => {
      let append = "";
      if (file.link.split(",").length > 1) {
        append = "(" + (index + 1) + ")";
      }
      fileLinks.push({
        name: file.name + append,
        link: link,
        size: file.size
      });
    });
  });
  return fileLinks;
}

export function transpileLongAnswerData(application) {
  const answers = Object.keys(longAnswerCategories).map(
    (longAnswerCategory) => ({
      id: longAnswerCategories[longAnswerCategory],
      answers: {
        question: longAnswerCategory,
        response: application[longAnswerCategory]
      },
      title: "canvas_" + longAnswerCategories[longAnswerCategory]
    })
  );

  const data = [];
  data.push({
    id: 1,
    answers: [],
    title: "Vulnerable Populations Served",
    description: "Do the vulnerable populations selected align with the project/program described?"
  });
  data.push({
    id: 2,
    answers: [],
    title: "Service Types and Output Tracking",
    description: "Will the selected outputs provide sufficient information to evaluate the success/impact of services provided?"
  });
  data.push({
    id: 3,
    answers: [],
    title: "Types of Activities",
    description: "Do the activities, geographic area, and timelines make sense for the program? Are they aligned with the criteria of the ECSF?"
  });
  data.push({
    id: 4,
    answers: [],
    title: "Service Description (Long Answer)",
    description: "Does the description adequately answer the questions? Do the answers provided present a logical implementation plan?"
  });
  data.push({
    id: 5,
    answers: [],
    title: "Additional Service Information",
    description: "Has additional service information been provided? Are the responses reasonable within the ECSF context?"
  });
  answers.forEach((answer) => {
    data.forEach((item) => {
      if (answer.id === item.id) {
        item.answers.push({
          question: answer.answers.question,
          response: answer.answers.response
        });
      }
    });
  });
  return data;
}
export function transpileCheckBoxData(application) {

  const answers = Object.keys(checkBoxCategories).map((checkBoxCategory) => {
      console.log("Checkbox categories:" + checkBoxCategory)
      console.log(application[checkBoxCategory])

      let answers = []
      let p = {
        id: checkBoxCategories[checkBoxCategory],
        answers: {
          question: checkBoxCategory,
          response: application[checkBoxCategory]
        },
      }
      return p
    });

/*
{
  id: checkBoxCategories[checkBoxCategory],
  answers: {
    question: longAnswerCategory,
    response: application[longAnswerCategory]
  },
  title: "Undetermined" + longAnswerCategories[longAnswerCategory]
})
*/
  const data = [];
  data.push({
    id: 1,
    answers: [],
    title: "Vulnerable Populations Served"
  });
  data.push({
    id: 2,
    answers: [],
    title: "Service Types and Output Tracking"
  });
  data.push({
    id: 3,
    answers: [],
    title: "Types of Activities"
  });
  data.push({
    id: 4,
    answers: [],
    title: "Service Description (Long Answer)"
  });
  data.push({
    id: 5,
    answers: [],
    title: "Addition Service Information"
  });
  answers.forEach((answer) => {
    console.log(answer)
    data.forEach((item) => {
      if (answer.id === item.id) {
        item.answers.push({
          question: answer.answers.question,
          response: answer.answers.response
        });
      }
    });
  });
  return data;
}
