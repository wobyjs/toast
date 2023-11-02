import { $, $$, useEffect, CSSProperties, Observable, useMemo, Child, ObservableMaybe, type JSX } from 'woby'

import {
    resolveValue,
    Toast,
    ToasterProps,
    ToastPosition,
    ToastWrapperProps,
} from '../core/types'
import { useToaster } from '../core/use-toaster'
import { prefersReducedMotion } from '../core/utils'
import { ToastBar } from './toast-bar'
import { append } from 'woby-styled'

const ToastWrapper = ({ toast, className, style, onHeightUpdate, children, }: ToastWrapperProps) => {
    const ref = $<HTMLDivElement>()

    useEffect(() => {
        if (!$$(ref)) return void 0

        const updateHeight = () => {
            const height = $$(ref).getBoundingClientRect().height
            onHeightUpdate(toast, height)
        }
        updateHeight()
        const o = new MutationObserver(updateHeight)
        o.observe($$(ref).parentElement, {
            subtree: true,
            childList: true,
            characterData: true,
        })

        return () => o.disconnect()
    })
    return <div ref={ref} className={className} style={style}>
        {children}
    </div>
}

const getPositionStyle = (position: ObservableMaybe<ToastPosition>, offset: Observable<number>) => useMemo<CSSProperties>(() => {
    const top = $$(position).includes('top')
    const verticalStyle: CSSProperties = top ? { top: 0 } : { bottom: 0 }
    const horizontalStyle: CSSProperties = $$(position).includes('center') ? { justifyContent: 'center', }
        : $$(position).includes('right') ? { justifyContent: 'flex-end', } : {}

    return {
        left: 0,
        right: 0,
        display: 'flex',
        position: 'absolute',
        transition: prefersReducedMotion()
            ? undefined
            : `all 230ms cubic-bezier(.21,1.02,.73,1)`,
        transform: `translateY(${$$(offset) * (top ? 1 : -1)}px)`,
        ...verticalStyle,
        ...horizontalStyle,
    }
})

const activeClass = `
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`

const DEFAULT_OFFSET = 16

export const Toaster = ({ reverseOrder, position = $('top-center'), toastOptions, gutter, children, containerStyle, containerClassName }: ToasterProps) => {
    const { toasts, handlers } = useToaster(toastOptions)
    const { calculateOffset, updateHeight } = handlers
    const cont = $<HTMLDivElement>()
    const ids = {} as Record<string, () => void>
    // const ids = new Map<Toast, Child>()

    handlers.onAdded.push(t => {
        // const toastPosition: Observable<ToastPosition> = (isObservable(t.position) ? t.position : $(t.position) || isObservable(position) ? position : $(position)) as any
        const toastPosition = t.position || position
        const offset = calculateOffset(t, {
            reverseOrder: $$(reverseOrder),
            gutter: $$(gutter),
            defaultPosition: $$(position),
        })

        const positionStyle = getPositionStyle(toastPosition, offset)

        ids[t.id] = append(<ToastWrapper
            toast={t}
            onHeightUpdate={updateHeight}
            className={() => $$(t.visible) ? activeClass : ''}
            style={positionStyle}
        >
            {/** @ts-ignore */}
            {t.type === 'custom' ? resolveValue(t.message, t) : children ? children(t) : <ToastBar toast={t} position={toastPosition} />}
        </ToastWrapper>, cont)
    })
    handlers.onRemoved.push(t => {
        if (!ids[t.id]) return
        ids[t.id]()

        delete t.id
    })

    // handlers.onRemoved.push(t => ids.delete(t))

    return <div ref={cont}
        style={{
            position: 'fixed',
            zIndex: 9999,
            top: DEFAULT_OFFSET,
            left: DEFAULT_OFFSET,
            right: DEFAULT_OFFSET,
            bottom: DEFAULT_OFFSET,
            pointerEvents: 'none',
            ...containerStyle,
        }}
        className={containerClassName}
        onMouseEnter={handlers.startPause}
        onMouseLeave={handlers.endPause}
    >
        {/* {() => $$(toasts).map((t) => {
            if (ids.get(t)) {
                console.log('from cache')
                return ids.get(t)
            }

            const toastPosition = t.position || position
            const offset = handlers.calculateOffset(t, {
                reverseOrder: $$(reverseOrder),
                gutter: $$(gutter),
                defaultPosition: $$(position),
            })

            const positionStyle = getPositionStyle($$(toastPosition), offset)

            const r = <ToastWrapper
                toast={t}
                onHeightUpdate={handlers.updateHeight}
                className={() => $$(t.visible) ? activeClass : ''}
                style={positionStyle}
            >
                {t.type === 'custom' ? resolveValue(t.message, t) : children ? children(t) : <ToastBar toast={t} position={toastPosition} />}
            </ToastWrapper>

            ids.set(t, r)
            return r
        })} */}
    </div>
}
