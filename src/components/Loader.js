import React from 'react'
import styled, { keyframes } from 'styled-components'

const Loader = () => <Animate />

const ballScale = keyframes`
  0% {
    transform: scale(0.0);
  }

  100% {
    transform: scale(1.0);
    opacity: 0;
  }
`

const Animate = styled.div`
  background-color: cornflowerblue;
  animation-fill-mode: both;
  border-radius: 100%;

  margin-top: 200px;
  display: inline-block;
  animation: ${ballScale} 2s ease-in-out infinite;
  height: 100px;
  width: 100px;
`

export default Loader
