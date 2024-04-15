import { $, $$, Child, useMemo, type JSX } from 'woby'
import { tw, keyframes } from 'woby-styled'

import { Toast, ToastPosition, resolveValue } from '../core/types'
import { ToastIcon } from './toast-icon'
import { prefersReducedMotion } from '../core/utils'
import { CSSProperties, ObservableMaybe } from 'woby'

const enterAnimation = (factor: number) => `
0% {transform: translate3d(0,${factor * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`

const exitAnimation = (factor: number) => `
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${factor * -150}%,-1px) scale(.6); opacity:0;}
`

const fadeInAnimation = `0%{opacity:0;} 100%{opacity:1;}`
const fadeOutAnimation = `0%{opacity:1;} 100%{opacity:0;}`

const ToastBarBase = tw('div')`flex items-center bg-white text-[#363636] leading-[1.3] will-change-transform shadow-[0_3px_10px_rgba(0,0,0,0.1),0_3px_3px_rgba(0,0,0,0.05)] max-w-[350px] pointer-events-auto px-2.5 py-2 rounded-lg`

const Message = tw('div')`flex justify-center text-inherit flex-auto whitespace-pre-line mx-2.5 my-1`

interface ToastBarProps {
    toast: ObservableMaybe<Toast>
    position?: ObservableMaybe<ToastPosition>
    style?: ObservableMaybe<CSSProperties>
    children?: (components: {
        icon: Child
        message: Child
    }) => Child
}

const getAnimationStyle = (
    position: ToastPosition,
    visible: boolean
): CSSProperties => {
    const top = position.includes('top')
    const factor = top ? 1 : -1

    const [enter, exit] = prefersReducedMotion()
        ? [fadeInAnimation, fadeOutAnimation]
        : [enterAnimation(factor), exitAnimation(factor)]

    return {
        animation: visible
            ? keyframes(enter)`0.35s cubic-bezier(.21,1.02,.73,1) forwards`
            : keyframes(exit)`0.4s forwards cubic-bezier(.06,.71,.55,1)`,
    }
}

export const ToastBar = ({ toast, position, style, children }: ToastBarProps) => {
    const animationStyle = useMemo(() => {
        const aniStyle = $$($$(toast).height)
            ? getAnimationStyle(
                $$($$(toast).position) || $$(position) || 'top-center',
                $$($$(toast).visible)
            )
            : { opacity: 0 }

        return { ...aniStyle, ...$$(style), ...$$($$(toast).style) }
    })

    const icon = <ToastIcon toast={toast} />
    const message = <Message {...$$(toast).ariaProps}>
        {/** @ts-ignore */}
        {resolveValue($$(toast).message, $$(toast))}
        {/* {$$(toast).message} */}
    </Message>

    return <ToastBarBase
        className={(() => $$(toast).className) as any}
        style={animationStyle}
    >
        {() => typeof children === 'function' ? (
            children({ icon, message, })) : (
            <>
                {icon}
                {message}
            </>
        )}
    </ToastBarBase>
}
