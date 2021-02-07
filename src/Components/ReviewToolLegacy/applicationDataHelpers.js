import moment from "moment";

//UnitedWay
//Emergency Community Support Fund (ECSF) Round 1 and 2
import * as UnitedWay from "./column_categories3";
import * as UnitedWay2 from "./column_categories3";
import * as UnitedWay3 from "./column_categories3";
import * as SVPFullProposal from "./column_categories4";
import * as Gos from "./column_gos";
import * as ProgramProject from "./column_project.js";
import * as Demo from "./demo_categories";

import * as CommunityFund from "./community_fund";
import * as GOS2 from "./gos2";
import * as CommunityFundS from "./community_fundS";
import * as GOS2S from "./gos2S";

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
  if (program === "5f54b04d9971a3dd4f741a9e") {
    adminCategories = UnitedWay.adminCategories;
  }
  if (program === "5f54af1b9971a3dd4f73e451") {
    adminCategories = UnitedWay2.adminCategories;
  }
  if (program === "5f9efdb531ca305f14ab42a6") {
    adminCategories = UnitedWay3.adminCategories;
  }
  if (program === "5f54b07f9971a3dd4f742328") {
    adminCategories = SVPFullProposal.adminCategories;
  }
  if (program === "5f5a508ef10bedc78cb87ddf") {
    adminCategories = Gos.adminCategories;
  }
  if (program === "5f5a528ff10bedc78cb8e02b") {
    adminCategories = ProgramProject.adminCategories;
  }
  if (program === "5fab02657cf3c7788fc00d1f") {
    adminCategories = Demo.adminCategories;
  }
  if (program === "5fc16f3c7cf3c7788f3105fc") {
    adminCategories = CommunityFund.adminCategories;
  }
  if (program === "5fc16ec77cf3c7788f30e5b1") {
    adminCategories = GOS2.adminCategories;
  }
  if (program === "5fc16f497cf3c7788f310a26") {
    adminCategories = CommunityFundS.adminCategories;
  }
  if (program === "5fc16f267cf3c7788f310143") {
    adminCategories = GOS2S.adminCategories;
  }

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

export function transpileFileData(application, program) {
  let fileCategories = {};
  if (program === "5f54b04d9971a3dd4f741a9e") {
    fileCategories = UnitedWay.fileCategories;
  }
  if (program === "5f54af1b9971a3dd4f73e451") {
    fileCategories = UnitedWay2.fileCategories;
  }
  if (program === "5f9efdb531ca305f14ab42a6") {
    fileCategories = UnitedWay3.fileCategories;
  }
  if (program === "5f54b07f9971a3dd4f742328") {
    fileCategories = SVPFullProposal.fileCategories;
  }
  if (program === "5f5a508ef10bedc78cb87ddf") {
    fileCategories = Gos.fileCategories;
  }
  if (program === "5f5a528ff10bedc78cb8e02b") {
    fileCategories = ProgramProject.fileCategories;
  }
  if (program === "5fab02657cf3c7788fc00d1f") {
    fileCategories = Demo.fileCategories;
  }
  if (program === "5fc16f3c7cf3c7788f3105fc") {
    fileCategories = CommunityFund.fileCategories;
  }
  if (program === "5fc16ec77cf3c7788f30e5b1") {
    fileCategories = GOS2.fileCategories;
  }
  if (program === "5fc16f497cf3c7788f310a26") {
    fileCategories = CommunityFundS.fileCategories;
  }
  if (program === "5fc16f267cf3c7788f310143") {
    fileCategories = GOS2S.fileCategories;
  }

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

export function transpileLongAnswerData(application, program) {
  let longAnswerCategories = {};
  if (program === "5f54b04d9971a3dd4f741a9e") {
    longAnswerCategories = UnitedWay.longAnswerCategories;
  }
  if (program === "5f54af1b9971a3dd4f73e451") {
    longAnswerCategories = UnitedWay2.longAnswerCategories;
  }
  if (program === "5f9efdb531ca305f14ab42a6") {
    longAnswerCategories = UnitedWay3.longAnswerCategories;
  }
  if (program === "5f54b07f9971a3dd4f742328") {
    longAnswerCategories = SVPFullProposal.longAnswerCategories;
  }
  if (program === "5f5a508ef10bedc78cb87ddf") {
    longAnswerCategories = Gos.longAnswerCategories;
  }
  if (program === "5f5a528ff10bedc78cb8e02b") {
    longAnswerCategories = ProgramProject.longAnswerCategories;
  }
  if (program === "5fab02657cf3c7788fc00d1f") {
    longAnswerCategories = Demo.longAnswerCategories;
  }
  if (program === "5fc16f3c7cf3c7788f3105fc") {
    longAnswerCategories = CommunityFund.longAnswerCategories;
  }
  if (program === "5fc16ec77cf3c7788f30e5b1") {
    longAnswerCategories = GOS2.longAnswerCategories;
  }
  if (program === "5fc16f497cf3c7788f310a26") {
    longAnswerCategories = CommunityFundS.longAnswerCategories;
  }
  if (program === "5fc16f267cf3c7788f310143") {
    longAnswerCategories = GOS2S.longAnswerCategories;
  }

  let canvasData = [];
  if (program === "5f54b04d9971a3dd4f741a9e") {
    canvasData = UnitedWay.canvasData;
  }
  if (program === "5f54af1b9971a3dd4f73e451") {
    canvasData = UnitedWay2.canvasData;
  }
  if (program === "5f9efdb531ca305f14ab42a6") {
    canvasData = UnitedWay3.canvasData;
  }
  if (program === "5f54b07f9971a3dd4f742328") {
    canvasData = SVPFullProposal.canvasData;
  }
  if (program === "5f5a508ef10bedc78cb87ddf") {
    canvasData = Gos.canvasData;
  }
  if (program === "5f5a528ff10bedc78cb8e02b") {
    canvasData = ProgramProject.canvasData;
  }
  if (program === "5fab02657cf3c7788fc00d1f") {
    canvasData = Demo.canvasData;
  }
  if (program === "5fc16f3c7cf3c7788f3105fc") {
    canvasData = CommunityFund.canvasData;
  }
  if (program === "5fc16ec77cf3c7788f30e5b1") {
    canvasData = GOS2.canvasData;
  }
  if (program === "5fc16f497cf3c7788f310a26") {
    canvasData = CommunityFundS.canvasData;
  }
  if (program === "5fc16f267cf3c7788f310143") {
    canvasData = GOS2S.canvasData;
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
  if (program === "5f54b04d9971a3dd4f741a9e") {
    checkBoxCategories = UnitedWay.checkBoxCategories;
  }
  if (program === "5f54af1b9971a3dd4f73e451") {
    checkBoxCategories = UnitedWay2.checkBoxCategories;
  }
  if (program === "5f9efdb531ca305f14ab42a6") {
    checkBoxCategories = UnitedWay3.checkBoxCategories;
  }
  if (program === "5f54b07f9971a3dd4f742328") {
    checkBoxCategories = SVPFullProposal.checkBoxCategories;
  }
  if (program === "5f5a508ef10bedc78cb87ddf") {
    checkBoxCategories = Gos.checkBoxCategories;
  }
  if (program === "5f5a528ff10bedc78cb8e02b") {
    checkBoxCategories = ProgramProject.checkBoxCategories;
  }
  if (program === "5fab02657cf3c7788fc00d1f") {
    checkBoxCategories = Demo.checkBoxCategories;
  }

  let canvasData = [];
  if (program === "5f54b04d9971a3dd4f741a9e") {
    canvasData = UnitedWay.canvasData;
  }
  if (program === "5f54af1b9971a3dd4f73e451") {
    canvasData = UnitedWay2.canvasData;
  }
  if (program === "5f9efdb531ca305f14ab42a6") {
    canvasData = UnitedWay3.canvasData;
  }
  if (program === "5f54b07f9971a3dd4f742328") {
    canvasData = SVPFullProposal.canvasData;
  }
  if (program === "5f5a508ef10bedc78cb87ddf") {
    canvasData = Gos.canvasData;
  }
  if (program === "5f5a528ff10bedc78cb8e02b") {
    canvasData = ProgramProject.canvasData;
  }
  if (program === "5fab02657cf3c7788fc00d1f") {
    canvasData = Demo.canvasData;
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
