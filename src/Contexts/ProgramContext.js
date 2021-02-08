import React, { useContext } from "react";
import { connect } from "react-redux";
import {
  getAllApplicationsAPI,
  getReviewCountAPI,
  getProgramByID
} from "../requests/get";
import * as SUBMISSION from "../requests/submission";
import * as REVIEWS from "../requests/reviews";
import * as FORMS from "../requests/forms";
import { AuthContext } from "../Authentication/Auth";
import usePromise from "../Hooks/usePromise";

export const ProgramContext = React.createContext();

async function fetchProgramData({ userId, program }) {
  if (!userId || !program) return { applications: [], reviewCount: 0 };

  const programDocument = await getProgramByID({ programId: program });

  const apps =
    programDocument.appVersion === 1
      ? await getAllApplicationsAPI()
      : await SUBMISSION.getAllSubmissions(program);

  const reviewCount =
    programDocument.appVersion === 1
      ? await getReviewCountAPI({ userId })
      : await REVIEWS.getReviewCount({ userId, programId: program });

  //The form only exists for appVersion 2
  //V1 was done via google forms
  const form =
    programDocument.appVersion === 1
      ? {}
      : await FORMS.getForm({ programId: program });

  return {
    applications: apps,
    reviewCount,
    appVersion: programDocument.appVersion,
    form
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
    { applications: [], reviewCount: 0, appVersion: 0, form: {} }
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
