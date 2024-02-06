/** @jsx  */
import { ObservableMaybe, jsx, $$, useMemo, type JSX } from 'woby'

import { tw, styled, keyframes } from 'woby-styled'

import { Toast } from '../core/types'
import { ErrorIcon, ErrorTheme } from './error'
import { LoaderIcon, LoaderTheme } from './loader'
import { CheckmarkIcon, CheckmarkTheme } from './checkmark'

const StatusWrapper = tw('div')`absolute`

const IndicatorWrapper = tw('div')`relative flex justify-center items-center min-w-[20px] min-h-[20px]`

const enter = keyframes`
from {
  transform: scale(0.6);
  opacity: 0.4;ww
}
to {
  transform: scale(1);
  opacity: 1;
}`

export const AnimatedIconWrapper = styled('div')`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${enter} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
`

export type IconThemes = Partial<{
    success: CheckmarkTheme
    error: ErrorTheme
    loading: LoaderTheme
}>

export const ToastIcon = ({ toast }: { toast: ObservableMaybe<Toast> }) => {
    const { icon, type, iconTheme } = $$(toast)
    if (icon !== undefined) {
        if (typeof icon === 'string') {
            return <AnimatedIconWrapper>{icon}</AnimatedIconWrapper>
        } else {
            return icon
        }
    }

    if (type === 'blank') {
        return null
    }

    return useMemo(() => <IndicatorWrapper>
        <LoaderIcon /* {...iconTheme} */ />
        {() => type !== 'loading' && (
            <StatusWrapper>
                {() => type === 'error' ? (
                    <ErrorIcon /* {...iconTheme} */ />
                ) : (
                    <CheckmarkIcon /* {...iconTheme} */ />
                )}
            </StatusWrapper>
        )}
    </IndicatorWrapper>)
}
