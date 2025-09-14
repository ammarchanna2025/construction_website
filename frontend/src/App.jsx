import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/frontend/Home";
import About from "./components/frontend/About";
import "./assets/css/style.scss";
import Services from "./components/frontend/Services";
import Projects from "./components/frontend/Projects";
import Blogs from "./components/frontend/Blogs";
import ContactUs from "./components/frontend/ContactUs";
import Login from "./components/backend/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/backend/Dashboard";
import RequireAuth from "./components/common/RequireAuth";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { AuthProvider } from "./components/backend/context/Auth";

import { default as Show } from "./components/backend/services/Show";
import { default as Create } from "./components/backend/services/Create";
import { default as Edit } from "./components/backend/services/Edit";
import { default as ShowProjects } from "./components/backend/projects/Show";
import { default as CreateProjects } from "./components/backend/projects/Create";
import { default as EditProjects } from "./components/backend/projects/Edit";
import { default as ShowArticles } from "./components/backend/articles/Show";
import { default as EditArticles } from "./components/backend/articles/Edit";
import { default as CreateArticles } from "./components/backend/articles/Create";
import { default as ShowTestimonails } from "./components/backend/testimonials/Show";
import { default as EditTestimonails } from "./components/backend/testimonials/Edit";
import { default as CreateTestimonails } from "./components/backend/testimonials/Create";
import { default as ShowMembers } from "./components/backend/members/Show";
import { default as EditMembers } from "./components/backend/members/Edit";
import { default as CreateMembers } from "./components/backend/members/Create";



function App() {
  return (
    <>
      <ErrorBoundary>
        <AuthProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/admin/login" element={<Login />} />

            <Route
              path="/admin/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />

            {/* Services Routes */}
            <Route
              path="/admin/services"
              element={
                <RequireAuth>
                  <Show />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/services/create"
              element={
                <RequireAuth>
                  <Create />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/services/edit/:id"
              element={
                <RequireAuth>
                  <Edit />
                </RequireAuth>
              }
            />

            {/* Projects Routes */}
            <Route
              path="/admin/projects"
              element={
                <RequireAuth>
                  <ShowProjects />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/projects/create"
              element={
                <RequireAuth>
                  <CreateProjects />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/projects/edit/:id"
              element={
                <RequireAuth>
                  <EditProjects />
                </RequireAuth>
              }
            />

            {/* Articles Routes */}
            <Route
              path="/admin/articles"
              element={
                <RequireAuth>
                  <ShowArticles />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/articles/create"
              element={
                <RequireAuth>
                  <CreateArticles />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/articles/edit/:id"
              element={
                <RequireAuth>
                  <EditArticles />
                </RequireAuth>
              }
            />

            {/* Testimonials Routes */}
            <Route
              path="/admin/testimonials"
              element={
                <RequireAuth>
                  <ShowTestimonails />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/testimonials/create"
              element={
                <RequireAuth>
                  <CreateTestimonails />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/testimonials/edit/:id"
              element={
                <RequireAuth>
                  <EditTestimonails />
                </RequireAuth>
              }
            />

            {/* Members Routes */}
            <Route
              path="/admin/members"
              element={
                <RequireAuth>
                  <ShowMembers />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/members/create"
              element={
                <RequireAuth>
                  <CreateMembers />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/members/edit/:id"
              element={
                <RequireAuth>
                  <EditMembers />
                </RequireAuth>
              }
            />
          </Routes>
          </BrowserRouter>
          <ToastContainer />
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
