import { GoogleOAuthFailure } from "@/page/auth/google-oauth-failure";
import { SignIn } from "@/page/auth/sign-in";
import { SignUp } from "@/page/auth/sign-up";
import { WorkspaceDashboard } from "@/page/workspace/dashboard";
import { Members } from "@/page/workspace/members";
import { ProjectDetails } from "@/page/workspace/project-details";
import { Settings } from "@/page/workspace/settings";
import { Tasks } from "@/page/workspace/tasks";
import { AUTH_ROUTES, BASE_ROUTE, PROTECTED_ROUTES } from "./routePaths";
import { InviteUser } from "@/page/invite/invite-user";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
  { path: AUTH_ROUTES.GOOGLE_OAUTH_CALLBACK, element: <GoogleOAuthFailure /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.WORKSPACE, element: <WorkspaceDashboard /> },
  { path: PROTECTED_ROUTES.TASKS, element: <Tasks /> },
  { path: PROTECTED_ROUTES.MEMBERS, element: <Members /> },
  { path: PROTECTED_ROUTES.SETTINGS, element: <Settings /> },
  { path: PROTECTED_ROUTES.PROJECT_DETAILS, element: <ProjectDetails /> },
];

export const baseRoutePaths = [
  { path: BASE_ROUTE.INVITE_URL, element: <InviteUser /> },
];
