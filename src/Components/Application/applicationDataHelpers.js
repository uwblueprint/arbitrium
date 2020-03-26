import moment from "moment";

import {
  fileCategories,
  adminCategories,
  longAnswerCategories
} from "./column_categories";

export function createReview(user, appId) {
  let review = {};
  let comments = [];
  let questionList = [];

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
    contact: Object.keys(adminCategories.contact).map(adminCategory => ({
      title: adminCategory,
      value: application[adminCategory]
    })),
    socialMedia: Object.keys(adminCategories.socialMedia).map(
      adminCategory => ({
        title: adminCategory,
        value: application[adminCategory]
      })
    ),
    organizationInformation: Object.keys(
      adminCategories.organizationInformation
    ).map(adminCategory => ({
      title: adminCategory,
      value: application[adminCategory]
    })),
    applicationInformation: Object.keys(
      adminCategories.applicationInformation
    ).map(adminCategory => ({
      title: adminCategory,
      value: application[adminCategory]
    }))
  };
}

export function transpileFileData(application) {
  let files = Object.keys(fileCategories).map((fileCategory, index) => ({
    name: fileCategory,
    link: application[fileCategory],
    size: index * 500
  }));
  let fileLinks = [];
  files.map(file => {
    if (file.link == null) return;
    file.link.split(",").map((link, index) => {
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
  let answers = Object.keys(longAnswerCategories).map(longAnswerCategory => ({
    id: longAnswerCategories[longAnswerCategory],
    answers: {
      question: longAnswerCategory,
      response: application[longAnswerCategory]
    },
    title: "Undetermined" + longAnswerCategories[longAnswerCategory]
  }));

  let data = [];
  data.push({
    id: 1,
    answers: [],
    title: "Mission and Vision"
  });
  data.push({
    id: 2,
    answers: [],
    title: "Leadership"
  });
  data.push({
    id: 3,
    answers: [],
    title: "Projects"
  });
  data.push({
    id: 4,
    answers: [],
    title: "Plan"
  });
  data.push({
    id: 5,
    answers: [],
    title: "Opportunities and Challenges"
  });
  answers.map(answer => {
    data.map(item => {
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