import moment from "moment";



//UnitedWay
//Emergency Community Support Fund (ECSF) Round 1 and 2
import {
  fileCategories,
  adminCategories,
  longAnswerCategories,
  checkBoxCategories,
  canvasData
} from "./column_categories3";


//SVP Full Proposal
import {
  fileCategories,
  adminCategories,
  longAnswerCategories,
  checkBoxCategories,
  canvasData
} as SVPFullProposal from "./column_categories4";



export function createReview(user, appId) {
  let review = {};
  const comments = [];
  const questionList = [];


  // THIS NEEDS TO BE MADE DYNAMIC IN THE FUTURE
  //Legacy content
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
    funding: Object.keys(adminCategories.funding).map((adminCategory) => ({
      title: adminCategory,
      value: application[adminCategory]
    })),
    mission: Object.keys(adminCategories.mission).map((adminCategory) => ({
      title: adminCategory,
      value: application[adminCategory]
    })),
    grant: Object.keys(adminCategories.grant).map((adminCategory) => ({
      title: adminCategory,
      value: application[adminCategory]
    }))
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

  Object.keys(canvasData).map((card, index) => {
    data.push({
      id: index,
      answers: [],
      title: card.title,
      description: card.description
    });
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
    const p = {
      id: checkBoxCategories[checkBoxCategory],
      answers: {
        question: checkBoxCategory,
        response: application[checkBoxCategory]
      }
    };
    return p;
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
  Object.keys(canvasData).map((card, index) => {
    data.push({
      id: index,
      answers: [],
      title: card.title,
      description: card.description
    });
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
