import Application from "./Components/Application/Application";
import AllApplications from "./Components/List/ApplicationList/AllApplications";
import UserManagement from "./Components/Admin/UserManagement";
import StackedRankings from "./Components/StackedRankings/StackedRankings";
import AllCandidates from "./Components/AllCandidates/AllCandidates";
import CommitteeReview from "./Components/AllCandidates/CommitteeReview";
import CreateEditForm from "./Components/FormCreation/CreateEditForm";

/*
path: "/",          =>Add the path to the switch in app.js (makes it a valid route)
component: Home,    =>The component to be loaded at the path specified
title: "Home",      =>The title of the path, more for documentation
header: "true",     =>This route is to be displayed in the drop down in the header when the user is Admin
groups: []          =>A list of groups Ex. ["admin", "user"].
                      =>If [] then the user only has to be authenticated
                      =>If non-empty then the user must be apart of at LEAST ONE group and authenticated
*/
const routes = [
  {
    path: "/applications",
    component: AllApplications,
    title: "Candiate Submissions",
    header: true,
    groups: []
  },
  {
    path: "/submissions/:organizationId",
    component: Application,
    title: "Applications View",
    header: false,
    groups: []
  },
  {
    path: "/rankings",
    component: StackedRankings,
    title: "Stacked Rankings",
    header: false,
    groups: []
  },
  {
    path: "/admin/allcandidates",
    component: AllCandidates,
    title: "Candiate Statistics",
    header: true,
    groups: ["Admin"]
  },
  {
    path: "/admin/committeereview",
    component: CommitteeReview,
    title: "Reviewer Statistics",
    header: true,
    groups: ["Admin"]
  },
  {
    path: "/admin/user-management",
    component: UserManagement,
    title: "User Management",
    header: true,
    groups: ["Admin"]
  },
  {
    path: "/admin/create-form",
    component: CreateEditForm,
    title: "Create Form",
    header: true,
    groups: ["Admin"]
  }
];

export default routes;
