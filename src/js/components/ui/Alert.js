import React, { Fragment } from 'react'

export const Alert = ({message}) => {
  return <Fragment>
    <h1>Error!</h1>
    <div>{message}</div>
  </Fragment>
}
