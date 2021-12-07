import React, { Fragment } from 'react'

import logo from '../assets/logo.svg'

const Home = () => (
  <Fragment>
    <div className="text-center hero my-5">
      <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
      <h1 className="mb-10">Cloud-developer final project</h1>

      <p className="lead">
        This application allow user to parser data from scanned pdf form using
        textract services. The data generated will be digested and stored. It
        also allow user to interactive with data. Click this{' '}
        <a href="https://reactjs.org">video</a> for demo.
      </p>
    </div>
  </Fragment>
)

export default Home
