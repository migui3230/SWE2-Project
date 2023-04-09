import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {

  // fixes issue #16 
  const pageLink = (x) => {
    if (!isAdmin) {
      if (keyword) {
        return `/search/${keyword}/page/${x + 1}`
      } else {
        return `/page/${x + 1}`
      }
    } else {
      return `/admin/productlist/${x + 1}`
    }
  }
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={pageLink()}
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
