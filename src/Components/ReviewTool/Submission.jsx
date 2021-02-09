import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useContext,
  useCallback
} from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Categories from "../ReviewToolComponents/CategoriesUpdated";
import DecisionCanvas from "../ReviewToolComponents/DecisionCanvas/DecisionCanvasUpdated";
import Rating from "../ReviewToolComponents/Rating";
import LoadingOverlay from "../Common/LoadingOverlay";
import { HEADER_HEIGHT } from "../Header/Header";
import { reviewReducer } from "../../Reducers/reviewReducer";
import { connect } from "react-redux";
import { newReview, updateNavbar } from "../../Actions";
import usePromise from "../../Hooks/usePromise";
import { getReview, updateReview } from "../../requests/reviews";
import { ProgramContext } from "../../Contexts/ProgramContext";
import moment from "moment";
import FileLink from "../ReviewToolComponents/FileLink";

const padding = HEADER_HEIGHT * 2 + "px";
const PageWrapper = styled.div`
  padding-top: ${padding};
`;

const BodyWrapper = styled.div`
  margin: 0 auto;
  padding-left: 80px;
  padding-right: 80px;
  max-width: 800px;
  h1 {
    font-size: 28px;
    font-weight: normal;
    .all-applicants {
      display: block;
      color: #888888;
      border-radius: 4px;
      transform: translateX(-4px);
    }
  }
  h2 {
    font-size: 20px;
    font-weight: 500;
  }
  hr {
    border: 0px solid #cccccc;
    border-bottom-width: 1px;
    margin: 20px 0;
  }
  button {
    text-transform: none;
    margin-bottom: 16px;
  }
`;

const ApplicationSelector = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 37px;
  button {
    border-radius: 4px;
  }
`;

function createReview(user, appId, program, application) {
  if (!application) return;

  //Note we store the sections as questionList (legacy)
  //Each section or item in the questionList is a card on the decision canvas
  let review = {};
  const comments = [];
  const questionList = [];

  application.form.sections.forEach((section) => {
    questionList.push({
      sectionId: section._id,
      notes: [],
      rating: -1
    });
  });

  review = {
    submissionId: appId,
    userId: user.userId,
    programId: program,
    rating: -1,
    comments: comments,
    lastReviewed: moment(),
    questionList: questionList
  };
  return review;
}

function Application({
  dispatchNavbarUpdate,
  dispatchNewReview,
  history,
  match,
  user,
  program
}) {
  const appId = match.params.submissionId;
  const isRated = useRef(false);
  const [review, setReview] = useState(null);
  const loadedApplications = useContext(ProgramContext);
  const applications = loadedApplications.applications;
  const [application, appIndex] = getApplicationDetails(applications, appId);

  const blankReview = useMemo(
    () => createReview(user, appId, program, application),
    [appId, user, program, application]
  );

  const [loadedReview] = usePromise(
    getReview,
    { user, applicationId: appId, program },
    null,
    [program]
  );

  //If the review doesn't exist, use a blank one
  useEffect(() => {
    if (loadedReview.isPending) return;
    const rev = loadedReview.value;
    const reviewExists = rev != null;
    if (reviewExists) {
      isRated.current = rev.rating > -1;
    }
    setReview(reviewExists ? rev : blankReview);
  }, [loadedReview, blankReview, program]);

  const dispatchReviewUpdate = useCallback(
    async (action) => {
      try {
        const updatedReview = reviewReducer(review, action);
        if (!isRated.current && updatedReview.rating > -1) {
          isRated.current = true;
          dispatchNewReview();
        }

        const res = await updateReview(updatedReview);
        if (res.ok !== 1) {
          throw res;
        }
        dispatchNavbarUpdate();
        setReview(updatedReview);
      } catch (e) {
        alert("Error in saving your review!");
        console.error(e);
      }
    },
    [review, dispatchNavbarUpdate, dispatchNewReview]
  );

  const fileDownloadURL = useMemo(() => {
    if (!application) {
      return "";
    } else return "forms/" + application.formId + "/" + application._id + "/";
  }, [application]);

  const { files, categoryData, canvasData } = useMemo(() => {
    let groupedAnswersandQuestions = null;
    let files = [];
    const categoryData = [];
    const canvasData = [];

    //Loop through the form sections and questions and add the answers from the submission
    if (loadedApplications.form && application) {
      groupedAnswersandQuestions = loadedApplications.form.sections.map(
        (section) => {
          return {
            ...section,
            questions: section.questions.map((question) => {
              if (
                question.type === "SHORT_ANSWER" ||
                question.type === "PARAGRAPHS"
              ) {
                return {
                  ...question,
                  answer: application.answers.find((ans) => {
                    return (
                      ans.questionId === question._id &&
                      ans.sectionId === section._id
                    );
                  })?.answerString
                };
              }
              if (
                question.type === "CHECKBOXES" ||
                question.type === "MULTIPLE_CHOICE"
              ) {
                const selected = application.answers.find((ans) => {
                  return (
                    ans.questionId === question._id &&
                    ans.sectionId === section._id
                  );
                })?.answerArray;
                return {
                  ...question,
                  answer: question.x_options.map((option) => {
                    return {
                      ...option,
                      selected: selected.includes(option._id)
                    };
                  })
                };
              }
              if (question.type === "FILE_UPLOAD") {
                const fileAnswers = application.answers.find((ans) => {
                  return (
                    ans.questionId === question._id &&
                    ans.sectionId === section._id
                  );
                })?.answerArray;
                files = files.concat(fileAnswers);
              }
              return null;
            })
          };
        }
      );

      //Filter our questions that are not answered (maybe due to not being required)
      //Place the sections in the array based on if it is admin info or decision criteria
      groupedAnswersandQuestions.forEach((section) => {
        const newSection = {
          ...section,
          questions: section.questions.filter((question) => question)
        };
        if (section.sectionType === "Decision Criteria") {
          canvasData.push(newSection);
        }
        if (section.sectionType === "Admin Info") {
          categoryData.push(newSection);
        }
      });
    }
    return { files, categoryData, canvasData };
  }, [application, loadedApplications]);

  const previousApplication =
    applications && appIndex > 0
      ? "/submissions/" + applications[appIndex - 1]["_id"]
      : null;
  const nextApplication =
    applications && appIndex < applications.length - 1
      ? "/submissions/" + applications[appIndex + 1]["_id"]
      : null;

  console.log(review);
  console.log(application);
  if (!application && !loadedReview.isPending && !loadedReview.value) {
    history.push("/applications");
  }

  return (
    <PageWrapper>
      <LoadingOverlay show={!review} />
      <BodyWrapper>
        <Button
          className="all-applicants"
          onClick={() => history.push("/applications")}
        >
          &lt; Back to list of applications
        </Button>
        <ApplicationSelector>
          <Button
            variant="outlined"
            color="primary"
            disabled={!previousApplication}
            onClick={() => {
              previousApplication && history.push(previousApplication);
            }}
          >
            Previous applicant
          </Button>
          <Button
            variant="outlined"
            color="primary"
            disabled={!nextApplication}
            onClick={() => {
              nextApplication && history.push(nextApplication);
            }}
          >
            Next applicant
          </Button>
        </ApplicationSelector>
        <h1>
          {application ? (
            application["identifier"]
          ) : (
            <div>
              <p> Loading... </p>
            </div>
          )}
        </h1>
        <hr />
        {applications.length > 0 && application != null ? (
          <div className="application-information">
            {categoryData ? <Categories categoryData={categoryData} /> : null}
            {files ? (
              <div>
                <h2>Files</h2>
                {files.map((file, i) => {
                  return (
                    <FileLink
                      key={i}
                      fileDownloadURL={fileDownloadURL}
                      awsFileUrl={file}
                    />
                  );
                })}
              </div>
            ) : null}
            <hr />
            {canvasData ? (
              <DecisionCanvas
                categoryData={canvasData}
                update={dispatchReviewUpdate}
                review={review}
              />
            ) : null}
            <hr />
            <Rating review={review} update={dispatchReviewUpdate} />
            <hr />
          </div>
        ) : null}
        <ApplicationSelector>
          <Button
            variant="outlined"
            color="primary"
            disabled={!previousApplication}
            onClick={() => {
              previousApplication && history.push(previousApplication);
            }}
          >
            Previous applicant
          </Button>
          <Button
            variant="outlined"
            color="primary"
            disabled={!nextApplication}
            onClick={() => {
              nextApplication && history.push(nextApplication);
            }}
          >
            Next applicant
          </Button>
        </ApplicationSelector>
      </BodyWrapper>
    </PageWrapper>
  );
}

//Helper function
// returns tuple: [appData, appIndex in appList]
function getApplicationDetails(appList, appId) {
  for (let i = 0; i < appList.length; ++i) {
    const app = appList[i];
    if (app["_id"] === appId) {
      return [app, i];
    }
  }
  return [null, -1];
}

const mapStateToProps = (state) => ({
  program: state.program
});

const mapDispatchToProps = {
  dispatchNewReview: newReview,
  dispatchNavbarUpdate: updateNavbar
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
