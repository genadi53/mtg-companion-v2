import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/404", "/api(.*)", "/sign-in*", "/sign-up*"],
});

// Stop Middleware running on static files and public folder
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    "/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)",
    "/",
  ],
};
// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
