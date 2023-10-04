import { $, $$, Observable, useMemo } from 'voby'
import { DefaultToastOptions, Toast, ToastType } from './types'

const TOAST_LIMIT = 20

// interface State {
//     toasts: Observable<Toast[]>
//     pausedAt: Observable<number | undefined>
// }

const toastTimeouts = new Map<Toast['id'], ReturnType<typeof setTimeout>>()

export const TOAST_EXPIRE_DISMISS_DELAY = 1000

export const defaultTimeouts: {
    [key in ToastType]: number
} = {
    blank: 4000,
    error: 4000,
    success: 2000,
    loading: Infinity,
    custom: 4000,
}

const toasts = $<Toast[]>([])
const pausedAt = $<number>(undefined)
const onAdded = [] as ((toast: Toast) => void)[]
const onRemoved = [] as ((toast: Toast) => void)[]

export const useStore = (toastOptions: DefaultToastOptions = {}) => {
    const addToRemoveQueue = (toastId: string) => {
        if (toastTimeouts.has(toastId)) {
            return
        }

        const timeout = setTimeout(() => {
            toastTimeouts.delete(toastId)
            remove(toastId)
        }, TOAST_EXPIRE_DISMISS_DELAY)

        toastTimeouts.set(toastId, timeout)
    }


    const addOrUpdate = (toast: Toast) => {
        const idx = toasts().findIndex((t) => t.id === toast.id)
        if (idx >= 0)
            return toasts()[idx]

        toasts([toast, ...toasts()].slice(0, TOAST_LIMIT)); onAdded.forEach(f => f(toast))
        return toasts()[0]
    }

    const removeByIndex = <T>(array: T[], index: number): T | undefined => {
        if (index >= 0 && index < array.length)
            return array.splice(index, 1)[0]
        else
            return undefined
    }
    const dismiss = (toastId: string) => {
        // ! Side effects ! - This could be execrated into a dismissToast() action, but I'll keep it here for simplicity
        if (toastId)
            addToRemoveQueue(toastId)
        else
            toasts().forEach((toast) => addToRemoveQueue(toast.id))

        return toasts(toasts().map((t) => t.id === toastId || toastId === undefined ? (t.visible(false), t) : t))
    }

    const remove = (toastId: string) => {
        if (toastId === undefined)
            return toasts([])

        const ts = $$(toasts)
        const idx = toasts().findIndex((t) => t.id === toastId)
        if (idx >= 0) {
            onRemoved.forEach(f => f(ts[idx]))
            removeByIndex(ts, idx)
            return toasts([...ts])
        }
        else
            return toasts()
    }

    const isActive = (toastId: string) => toasts().findIndex((t) => t.id === toastId) >= 0

    const startPause = (time: number) => pausedAt(time)

    const endPause = (time: number) => {
        const diff = time - (pausedAt() || 0)

        pausedAt(undefined)
        toasts(toasts().map((t) => ({
            ...t,
            pauseDuration: $$(t.pauseDuration) + diff,
        })))
    }

    const mergedToasts = toasts().map((t) => ({
        ...toastOptions,
        ...$$(toastOptions[$$(t.type)]),
        ...t,
        duration: useMemo(() =>
            $$(t.duration) ||
            $$(toastOptions[$$(t.type)]?.duration) ||
            $$(toastOptions?.duration) ||
            $$(defaultTimeouts[$$(t.type)])),
        style: useMemo(() => ({
            ...$$(toastOptions.style),
            ...$$(toastOptions[$$(t.type)]?.style),
            ...$$(t.style),
        })),
    }))
    toasts(mergedToasts)
    return {
        toasts,
        pausedAt,
        // UPDATE_TOAST,
        // UPSERT_TOAST,
        addOrUpdate,
        dismiss,
        remove,
        startPause,
        endPause,
        isActive,
        onRemoved,
        onAdded
    }
}
