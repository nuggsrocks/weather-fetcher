import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export const Weather = ({data}) => {
  return <Fragment>
    <h1>
      {data.location.name}
      {data.location.region && `, ${data.location.region}`}
      {data.location.country && `, ${data.location.country}`}
    </h1>
  </Fragment>
}

Weather.propTypes = {
  data: PropTypes.object
}


