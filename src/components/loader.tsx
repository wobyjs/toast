import { styled, keyframes } from 'voby-styled'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export interface LoaderTheme {
    primary?: string
    secondary?: string
}

export const LoaderIcon = styled('div')`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: #e0e0e0;
  border-right-color: #616161;
  animation: ${rotate} 1s linear infinite;
`