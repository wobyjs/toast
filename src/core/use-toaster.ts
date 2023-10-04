import { useEffect, $, $$, ObservableMaybe, useMemo, Observable, ObservableReadonly } from 'voby'
import { useStore } from './store'
import { toast } from './toast'
import { DefaultToastOptions, Toast, ToastPosition } from './types'

export const useToaster = (toastOptions?: DefaultToastOptions) => {
    const { toasts, pausedAt, startPause: StartPause, endPause: EndPause, onAdded, onRemoved } = useStore(toastOptions)

    const startPause = () => StartPause(Date.now())
    const updateHeight = (toast: Toast, height: number) => toast.height(height)

    useEffect(() => {
        if ($$(pausedAt)) {
            return void 0
        }

        const now = Date.now()
        const timeouts = toasts().map((t) => {
            if (t.duration === Infinity) {
                return void 0
            }

            const durationLeft = ($$(t.duration) || 0) + $$(t.pauseDuration) - (now - $$(t.createdAt))

            if (durationLeft < 0) {
                if ($$(t.visible)) {
                    toast.dismiss(t.id)
                }
                return void 0
            }
            return setTimeout(() => toast.dismiss(t.id), durationLeft)
        })

        return () => {
            timeouts.forEach((timeout) => timeout && clearTimeout(timeout))
        }
    })

    const endPause = () => {
        if ($$(pausedAt))
            EndPause(Date.now())
    }

    const calculateOffset = (toast: Toast, opts?: { reverseOrder?: ObservableMaybe<boolean>, gutter?: number, defaultPosition?: ToastPosition, }) => {
        return useMemo(() => {
            const { reverseOrder = false, gutter = 8, defaultPosition } = opts || {}

            const relevantToasts = toasts().filter((t) =>
                (t.position || defaultPosition) ===
                (toast.position || defaultPosition) && t.height
            )
            const toastIndex = relevantToasts.findIndex((t) => t.id === toast.id)
            const toastsBefore = relevantToasts.filter((toast, i) => i < toastIndex /* && $$(toast.visible) */).length

            const offset = relevantToasts
                .filter((t) => $$(t.visible))
                .slice(...($$(reverseOrder) ? [toastsBefore + 1] : [0, toastsBefore]))
                .reduce((acc, t) => acc + ($$(t.height) || 0) + gutter, 0)

            return offset
        })
    }

    return {
        toasts,
        handlers: {
            updateHeight,
            startPause,
            endPause,
            calculateOffset,
            onAdded,
            onRemoved
        },
    }
}
