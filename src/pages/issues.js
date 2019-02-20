import React from 'react'
import gql from 'graphql-tag'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import client from '../clients/github'

class IssuesPage extends React.Component {
  fetchIssues(owner = 'cdes', repo = 'github-wishes') {
    client
      .query({
        query: gql`{
        search(type: ISSUE, query: "repo:${owner}/${repo} label:wishes is:issue is:open sort:reactions-+1-desc", first: 100) {
          edges {
            node {
              ... on Issue {
                id
                title
                ups: reactions(content: THUMBS_UP) {
                  totalCount
                }
              }
            }
          }
        }
      }`,
      })
      .then(result => {
        console.log(
          result.data.search.edges.map(issue => ({
            title: issue.node.title,
            ups: issue.node.ups.totalCount,
          }))
        )
        this.setState({ issues: result })
      })
  }

  componentDidMount() {
    this.fetchIssues()
  }

  render() {
    return (
      <Layout>
        <SEO title="Issues" />
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    )
  }
}

export default IssuesPage
