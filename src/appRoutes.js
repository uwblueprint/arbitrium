import Application from "./Components/Application/Application";
import AllApplications from "./Components/List/ApplicationList/AllApplications";
import UserManagement from "./Components/Admin/UserManagement";
import StackedRankings from "./Components/StackedRankings/StackedRankings";
import AllCandidates from "./Components/AllCandidates/AllCandidates";
import DatabaseManagement from "./Components/Admin/DatabaseManagement";
import CommitteeReview from "./Components/AllCandidates/CommitteeReview";
import CreateEditForm from "./Components/FormCreation/CreateEditForm";

/*
path: "/",          =>Add the path to the switch in app.js (makes it a valid route)
component: Home,    =>The component to be loaded at the path specified
title: "Home",      =>The title of the path, more for documentation
groups: []          =>A list of groups Ex. ["admin", "user"].
                      =>If [] then the user only has to be authenticated
                      =>If non-empty then the user must be apart of at LEAST ONE group and authenticated
*/
const routes = [
  {
    path: "/applications",
    component: AllApplications,
    title: "List of Applications",
    groups: []
  },
  {
    path: "/submissions/:organizationId",
    component: Application,
    title: "A single Application",
    groups: []
  },
  {
    path: "/rankings",
    component: StackedRankings,
    title: "View all Stacked Rankings",
    groups: []
  },
  {
    path: "/admin/allcandidates",
    component: AllCandidates,
    title: "Admin view to view all candidates",
    groups: ["Admin"]
  },
  {
    path: "/admin/committeereview",
    component: CommitteeReview,
    title: "Admin view to review the status of committee members",
    groups: ["Admin"]
  },
  {
    path: "/admin/user-management",
    component: UserManagement,
    title: "Admin view to view all users",
    groups: ["Admin"]
  },
  {
    path: "/admin/create-form",
    component: CreateEditForm,
    title: "Create or edit custom form",
    groups: ["Admin"]
  }
];

export default routes;
