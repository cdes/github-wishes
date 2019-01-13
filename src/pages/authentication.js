import React from 'react'
import GitHubLogin from 'react-github-login'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

class AuthenticationPage extends React.Component {
  onSuccess = response => {
    console.log('authenticated')
    console.log(response)

    // Store in local storage
    localStorage.setItem('auth_code', response.code)

    // TODO: Redirect to issues page
  }

  onFailure = response => {
    // TODO:
    console.error(response)
  }

  render() {
    return (
      <Layout>
        <SEO title="Login using GitHub" />

        {/* TODO: Show this only when localStorage doesn't exist or auth fails */}
        <GitHubLogin
          clientId="335e5654ddc5ba0d8399"
          redirectUri="http://localhost:8000/oauth/callback"
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
        />
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    )
  }
}

export default AuthenticationPage
