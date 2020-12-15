import Application from "./Components/Application/Application";
import AllApplications from "./Components/List/ApplicationList/AllApplications";
import UserManagement from "./Components/Admin/ProgramUserManagement";
import StackedRankings from "./Components/StackedRankings/StackedRankings";
import AllCandidates from "./Components/AllCandidates/AllCandidates";
import CommitteeReview from "./Components/AllCandidates/CommitteeReview";
import CreateEditForm from "./Components/FormCreation/CreateEditForm";
import CreateSubmissionForm from "./Components/FormCreation/Submission/CreateSubmissionForm";
import ProgramManagement from "./Components/ProgramManagement/ProgramManagement";

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
    title: "Candidate Submissions",
    header: true,
    programGroup: ""
  },
  {
    path: "/home",
    component: null,
    title: "Program Management",
    header: false,
    programGroup: ""
  },
  {
    path: "/programs",
    component: ProgramManagement,
    header: false,
    title: "Program Management",
    programGroup: ""
  },
  {
    path: "/submissions/:organizationId",
    component: Application,
    title: "Applications View",
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
    path: "/admin/form-submission/:formId",
    component: CreateSubmissionForm,
    title: "Form Submission",
    header: false,
    programGroup: ""
  },
  {
    path: "/form/:formId",
    component: null,
    header: false,
    title: "Users Submission Page",
    programGroup: ""
  }
];

export default routes;
