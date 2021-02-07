import React, { useContext } from "react";
import { connect } from "react-redux";
import {
  getAllApplicationsAPI,
  getReviewCountAPI,
  getProgramByID
} from "../requests/get";
import * as SUBMISSION from "../requests/submission";
import * as REVIEWS from "../requests/reviews";
import { AuthContext } from "../Authentication/Auth";
import usePromise from "../Hooks/usePromise";

export const ProgramContext = React.createContext();

async function fetchProgramData({ userId, program }) {
  if (!userId || !program) return { applications: [], reviewCount: 0 };
  console.log(program);

  const programDocument = await getProgramByID({ programId: program });
  console.log(programDocument.appVersion);
  const apps =
    programDocument.appVersion === 1
      ? await getAllApplicationsAPI()
      : await SUBMISSION.getAllSubmissions(program);

  console.log(apps);
  const reviewCount =
    programDocument.appVersion === 1
      ? await getReviewCountAPI(userId)
      : await REVIEWS.getReviewCount(userId, program);
  console.log(reviewCount);
  return {
    applications: apps,
    reviewCount,
    appVersion: programDocument.appVersion
  };
}

function ProgramContextProvider({ program, children }) {
  const { currentUser } = useContext(AuthContext);
  const [programData] = usePromise(
    fetchProgramData,
    {
      userId: currentUser ? currentUser.uid : null,
      program
    },
    { applications: [], reviewCount: 0, appVersion: 0 }
  );

  const context = { isLoading: programData.isPending, ...programData.value };

  return (
    <ProgramContext.Provider value={context}>
      {children}
    </ProgramContext.Provider>
  );
}

const mapStateToProps = (state) => ({
  program: state.program
});

export default connect(mapStateToProps)(ProgramContextProvider);
