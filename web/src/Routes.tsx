// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, PrivateSet } from '@redwoodjs/router'

import { useAuth } from './auth'
import AppLayout from './layouts/AppLayout/AppLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
      <PrivateSet unauthenticated="login" wrap={AppLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/create-space" page={CreateSpacePage} name="createSpace" />
        <Route path="/space/{slug:String}" page={SpaceHomePage} name="spaceHome" />
        <Route path="/space/{slug:String}/list/{id:String}" page={ListPage} name="list" />
      </PrivateSet>
    </Router>
  )
}

export default Routes
