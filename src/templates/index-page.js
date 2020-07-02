import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import Pricing from '../components/Pricing'
import BlogRoll from '../components/BlogRoll'


export const IndexPageTemplate = ({
  image,
  title,
  subtitle,
  mainpitch,
  mainlicences,
  mainservices,
}) => (
    <div>
      <div className="layout margin-top-0"
        style={{
          backgroundColor: '#faebd7',
        }}>
        <div className="layout__item layout__item--body"
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '1.5rem',
          }}>
          <h1
            className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
            style={{
              backgroundColor: 'rgb(255, 0, 0)',
              color: 'white',
              fontSize: '24px',
              padding: '0.25em',
            }}>{title}</h1>
          <h3
            className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
            style={{

              backgroundColor: 'rgb(255, 0, 0)',
              color: 'white',

              padding: '0.25em',
            }}>
            {subtitle}
          </h3>
        </div>
        <div className="layout__item layout__item--figure">
          <img src={image.childImageSharp && image.childImageSharp.fluid.src} alt=""></img>
        </div>
      </div>
      <section className="section section--gradient">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="content">
                  <div className="content">
                    <div className="tile">
                      <h1 className="title">{mainpitch.title}</h1>
                    </div>
                    <div className="tile">
                      <h3 className="subtitle">{mainpitch.description}</h3>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-12">
                      <h3 className="has-text-weight-semibold is-size-2">
                        {mainlicences.heading}
                      </h3>
                      <div>{mainlicences.description}</div>
                    </div>
                  </div>
                  <Features gridItems={mainlicences.licences} />
                  <div className="columns">
                    <div className="column is-12 has-text-centered">
                      <Link className="btn" to="/products">
                        Όλες οι άδειες οδήγησης
                    </Link>
                    </div>
                  </div>
                  <h2 className="has-text-weight-semibold is-size-2">
                    {mainservices && mainservices.heading}
                  </h2>
                  <p className="is-size-5">{mainservices && mainservices.description}</p>
                  {mainservices && <Pricing data={mainservices.services} />}
                  <div className="columns">
                    <div className="column is-12 has-text-centered">
                      <Link className="btn" to="/services">
                        Όλες οι υπηρεσίες
                    </Link>
                    </div>
                  </div>
                  <div className="column is-12">
                    <h3 className="has-text-weight-semibold is-size-2">
                      Νέα
                  </h3>
                    <BlogRoll />
                    <div className="column is-12 has-text-centered">
                      <Link className="btn" to="/blog">
                        Περισσότερα
                    </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  mainpitch: PropTypes.object,
  mainlicences: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    licences: PropTypes.array,
  }),
  mainservices: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    services: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const {  markdownRemark: post  } = data

  return (
    <Layout>
      <IndexPageTemplate
        image={post.frontmatter.image}
        title={post.frontmatter.title}
        subtitle={post.frontmatter.subtitle}
        mainpitch={post.frontmatter.mainpitch}
        mainlicences={post.frontmatter.mainlicences}
        mainservices={post.frontmatter.mainservices}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        subtitle
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mainpitch {
          title
          description
        }
        mainlicences {
          licences {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
        mainservices {
          heading
          description
          services {
            service
            description
            items
          }
        }
      }
    }
  }
`
