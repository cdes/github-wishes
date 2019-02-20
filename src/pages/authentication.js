import React from 'react'
import { Link, navigate } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import SocialButton from '../components/social-button'

class AuthenticationPage extends React.Component {
  onSuccess = user => {
    console.log('authenticated')
    console.log(user)

    // Store in local storage
    localStorage.setItem('auth_code', user._token.accessToken)
    localStorage.setItem('username', user._profile.name)
    localStorage.setItem('profilePicURL', user._profile.profilePicURL)

    // Redirect to issues page
    navigate('/issues')
  }

  onFailure = error => {
    // TODO:
    console.error(error)
  }

  render() {
    return (
      <Layout>
        <SEO title="Login using GitHub" />

        {/* TODO: Show this only when localStorage doesn't exist or auth fails */}
        <SocialButton
          provider="github"
          appId="335e5654ddc5ba0d8399"
          gatekeeper="https://github-wishes-gatekeeper.herokuapp.com"
          redirect="http://localhost:8000/authentication"
          // Not sure if we need repo scope, it gives access to too much data,
          // I would prefer to get search or issues access only, please see:
          // https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/#available-scopes
          scope={['public_repo', 'read:user']}
          onLoginSuccess={this.onSuccess}
          onLoginFailure={this.onFailure}
        >
          Login with GitHub
        </SocialButton>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    )
  }
}

export default AuthenticationPage
