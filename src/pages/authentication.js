import React from 'react'
import GitHubLogin from 'react-github-login'
import addMonths from 'date-fns/add_months'
import { Link } from 'gatsby'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'

import Layout from '../components/layout'
import SEO from '../components/seo'

class AuthenticationPage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  }

  onSuccess = response => {
    console.log('authenticated')
    console.log(response)

    // Store in cookies
    const { cookies } = this.props
    cookies.set('auth_code', response, {
      path: '/',
      expires: addMonths(new Date(), 3),
    })

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

        {/* TODO: Show this only when cookie doesn't exist or auth fails */}
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

export default withCookies(AuthenticationPage)
