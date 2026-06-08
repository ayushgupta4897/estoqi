import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useLocation,
} from "@tanstack/react-router";
import type React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import AboutESTOQI from "./pages/AboutESTOQI";
import BookConsultation from "./pages/BookConsultation";
import Collective from "./pages/Collective";
import ESTOQILabs from "./pages/ESTOQILabs";
import FeaturedIn from "./pages/FeaturedIn";
import ForFoodBusinesses from "./pages/ForFoodBusinesses";
import ForHomes from "./pages/ForHomes";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import LabReport from "./pages/LabReport";
import Science from "./pages/Science";
import TheSystem from "./pages/TheSystem";

// Layout component wrapping all pages.
// On Home the hero is full-bleed under a transparent Navbar.
// On every other route, we add a 68px spacer so the fixed Navbar
// does not overlap the page content.
const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  return (
    <div className="min-h-screen flex flex-col bg-bone text-ink">
      <Navbar />
      <div className={`flex-1 ${isHome ? "" : "pt-[68px]"}`}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </div>
      <Footer />
    </div>
  );
};

// Root route
const rootRoute = createRootRoute({ component: Layout });

// Child routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const theSystemRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/the-system",
  component: TheSystem,
});
const forHomesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/for-homes",
  component: ForHomes,
});
const forFoodBusinessesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/for-food-businesses",
  component: ForFoodBusinesses,
});
const scienceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/science",
  component: Science,
});
const journalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/journal",
  component: Journal,
});
const collectiveRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collective",
  component: Collective,
});
const bookConsultationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book-consultation",
  component: BookConsultation,
});
const estoqiLabsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/estoqi-labs",
  component: ESTOQILabs,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutESTOQI,
});
const featuredInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/featured-in",
  component: FeaturedIn,
});
const labReportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/labs/reports/$slug",
  component: LabReport,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  theSystemRoute,
  forHomesRoute,
  forFoodBusinessesRoute,
  scienceRoute,
  journalRoute,
  collectiveRoute,
  bookConsultationRoute,
  estoqiLabsRoute,
  aboutRoute,
  featuredInRoute,
  labReportRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App: React.FC = () => <RouterProvider router={router} />;

export default App;
