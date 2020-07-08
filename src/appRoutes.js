import Application from "./Components/Application/Application";
import ApplicationsTable from "./Components/List/ApplicationList/ApplicationsTable";
import UserManagement from "./Components/AdminView/UserManagement/UserManagement";
import StackedRankings from "./Components/StackedRankings/StackedRankings";
import AllCandidates from "./Components/AllCandidates/AllCandidates";
import AdminStatsView from "./Components/AdminView/ApplicationStats/ApplicationStats";
import CommitteeReview from "./Components/AllCandidates/CommitteeReview";
import Admin from "./Components/Admin/Admin";

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
    component: ApplicationsTable,
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
    path: "/admin",
    component: Admin,
    title: "Admin view to view all users",
    groups: ["admin"]
  },
  {
    path: "/admin/submissions/:organizationId",
    component: AdminStatsView,
    title: "Admin view of a single application",
    groups: []
  }
];

export default routes;
