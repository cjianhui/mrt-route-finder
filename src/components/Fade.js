import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'



export default (children) => (
  <CSSTransitionGroup
    transitionName='fade'
    transitionAppearTimeout={500}
    transitionLeaveTimeout={250}
    transitionEnterTimeout={500}
    transitionAppear
    transitionEnter
    transitionLeave
  >
    {children}
  </CSSTransitionGroup>
)
