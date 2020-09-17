import React, { useContext } from "react";
import { connect } from "react-redux";
import { getAllApplicationsAPI, getReviewCountAPI } from "../requests/get";
import { AuthContext } from "../Authentication/Auth";
import usePromise from "../Hooks/usePromise";

export const ProgramContext = React.createContext();

async function fetchProgramData({ userId, program }) {
  if (!userId || !program) return { applications: [], reviewCount: 0 };
  const apps = await getAllApplicationsAPI();
  const reviewCount = await getReviewCountAPI(userId);
  return { applications: apps, reviewCount };
}

function ProgramContextProvider({ program, children }) {
  const { currentUser } = useContext(AuthContext);
  const [programData] = usePromise(
    fetchProgramData,
    {
      userId: currentUser ? currentUser.uid : null,
      program
    },
    { applications: [], reviewCount: 0 }
  );

  const context = { isLoading: programData.isPending, ...programData.value };

  console.log(context.applications);
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
