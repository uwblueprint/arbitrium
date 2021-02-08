import Application from "./Components/ReviewToolLegacy/Application";
import AllApplications from "./Components/ApplicationTable/AllApplications";
import UserManagement from "./Components/Admin/ProgramUserManagement";
import StackedRankings from "./Components/StackedRankings/StackedRankings";
import AllCandidates from "./Components/AllCandidates/AllCandidates";
import CommitteeReview from "./Components/AllCandidates/CommitteeReview";
import CreateEditForm from "./Components/FormCreation/CreateEditForm";
import CreateSubmissionForm from "./Components/FormCreation/Submission/CreateSubmissionForm";
import ProgramManagement from "./Components/ProgramManagement/ProgramManagement";
import Submission from "./Components/ReviewTool/Submission";

/*
path: "/",          =>Add the path to the switch in app.js (makes it a valid route)
component: Home,    =>The component to be loaded at the path specified
title: "Home",      =>The title of the path, more for documentation
header: "true",     =>This route is to be displayed in the drop down in the header when the user is Admin
programprogramGroup: "ADMIN|ADMIN_REVIEWER|REVIEWER|GUEST"
                    => Users will need this program role to access the page
                    => If "" then the user only has to be authenticated
                    => If non-empty then the user must be apart of the programGroup and authenticated
orgprogramGroup: "true|false" => If true, a user must be an admin of org to access the page
*/
const routes = [
  {
    path: "/applications",
    component: AllApplications,
    title: "Submissions",
    header: true,
    programGroup: "REVIEWER"
  },
  {
    path: "/programs",
    component: ProgramManagement,
    header: false,
    title: "Programs List",
    programGroup: ""
  },
  {
    path: "/submissions/legacy/:appId",
    component: Application,
    title: "Applications View",
    header: false,
    programGroup: "REVIEWER"
  },
  {
    path: "/submissions/:submissionId",
    component: Submission,
    title: "Submission View",
    header: false,
    programGroup: "REVIEWER"
  },
  {
    path: "/admin/submissions/:organizationId",
    component: Application,
    title: "Admin Applications View",
    header: false,
    programGroup: "ADMIN"
  },
  {
    path: "/rankings",
    component: StackedRankings,
    title: "Stacked Rankings",
    header: false,
    programGroup: "REVIEWER"
  },
  {
    path: "/admin/allcandidates",
    component: AllCandidates,
    title: "Candidate Statistics",
    header: true,
    programGroup: "ADMIN"
  },
  {
    path: "/admin/committeereview",
    component: CommitteeReview,
    title: "Reviewer Statistics",
    header: true,
    programGroup: "ADMIN"
  },
  {
    path: "/admin/user-management",
    component: UserManagement,
    title: "User Management",
    header: true,
    programGroup: "ADMIN"
  },
  {
    path: "/admin/form/:programId",
    component: CreateEditForm,
    title: "Form Management",
    header: true,
    programGroup: "ADMIN"
  },
  {
    path: "/form-preview/:formId",
    component: CreateSubmissionForm,
    title: "Preview Form Submission",
    header: false,
    loginRequired: false,
    programGroup: ""
  },
  {
    path: "/form/:formId",
    component: CreateSubmissionForm,
    header: false,
    title: "Submit Response",
    loginRequired: false,
    programGroup: ""
  }
];

export default routes;
