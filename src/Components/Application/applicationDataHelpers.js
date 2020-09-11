import moment from "moment";

//UnitedWay
//Emergency Community Support Fund (ECSF) Round 1 and 2
import * as UnitedWay from "./column_categories3";
import * as UnitedWay2 from "./column_categories3";
import * as SVPFullProposal from "./column_categories4";

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
    userId: user.userId,
    rating: -1,
    comments: comments,
    lastReviewed: moment(),
    questionList: questionList
  };
  return review;
}

export function transpileCategoryData(application, program) {
  //todo when category data is made available, currently leverages mock data
  let adminCategories = {
    contact: {},
    grant: {},
    funding: {},
    mission: {}
  };
  if (program === "UnitedWay") {
    adminCategories = UnitedWay.adminCategories;
  }
  if (program === "UnitedWay2") {
    adminCategories = UnitedWay2.adminCategories;
  }
  if (program === "SVPFullProposal") {
    adminCategories = SVPFullProposal.adminCategories;
  }

  return {
    admin: Object.keys(adminCategories.contact && {}).map((adminCategory) => ({
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

export function transpileFileData(application, program) {
  let fileCategories = {};
  if (program === "UnitedWay") {
    fileCategories = UnitedWay.fileCategories;
  }
  if (program === "UnitedWay2") {
    fileCategories = UnitedWay2.fileCategories;
  }
  if (program === "SVPFullProposal") {
    fileCategories = SVPFullProposal.fileCategories;
  }

  const files = Object.keys(fileCategories).map((fileCategory, index) => ({
    name: fileCategory,
    link: application[fileCategory],
    size: index * 500
  }));
  const fileLinks = [];
  files.forEach((file) => {
    if (file.link === null) return;
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

export function transpileLongAnswerData(application, program) {
  let longAnswerCategories = {};
  if (program === "UnitedWay") {
    longAnswerCategories = UnitedWay.longAnswerCategories;
  }
  if (program === "UnitedWay2") {
    longAnswerCategories = UnitedWay2.longAnswerCategories;
  }
  if (program === "SVPFullProposal") {
    longAnswerCategories = SVPFullProposal.longAnswerCategories;
  }

  let canvasData = [];
  if (program === "UnitedWay") {
    canvasData = UnitedWay.canvasData;
  }
  if (program === "UnitedWay2") {
    canvasData = UnitedWay2.canvasData;
  }
  if (program === "SVPFullProposal") {
    canvasData = SVPFullProposal.canvasData;
  }

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

  canvasData.map((card, index) => {
    return data.push({
      id: index + 1,
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
export function transpileCheckBoxData(application, program) {
  let checkBoxCategories = {};
  if (program === "UnitedWay") {
    checkBoxCategories = UnitedWay.checkBoxCategories;
  }
  if (program === "UnitedWay2") {
    checkBoxCategories = UnitedWay2.checkBoxCategories;
  }
  if (program === "SVPFullProposal") {
    checkBoxCategories = SVPFullProposal.checkBoxCategories;
  }

  let canvasData = [];
  if (program === "UnitedWay") {
    canvasData = UnitedWay.canvasData;
  }
  if (program === "UnitedWay2") {
    canvasData = UnitedWay2.canvasData;
  }
  if (program === "SVPFullProposal") {
    canvasData = SVPFullProposal.canvasData;
  }

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
  canvasData.map((card, index) => {
    return data.push({
      id: index + 1,
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
