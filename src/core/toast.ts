import {
    Toast,
    ToastOptions,
    ToastType,
    DefaultToastOptions,
    ValueOrFunction,
    resolveValue,
} from './types'
import { genId } from './utils'
import { useStore } from './store'
import { Child, Observable, ObservableMaybe } from 'voby'
import { $, $$ } from 'voby'

const { toasts, addOrUpdate, dismiss, remove, } = useStore()

type Message = Child | ((t: Toast) => Child) // ValueOrFunction<Child, Toast>

type ToastHandler = (message: ObservableMaybe<Message | Toast | ((t: any) => Child)>, options?: ToastOptions) => string

const createToast = (message: ObservableMaybe<Message | Toast | ((t: any) => Child)>, type: ObservableMaybe<ToastType> = $('blank'), opts?: ToastOptions): Toast => ({
    createdAt: $(Date.now()),
    height: $(),
    visible: $(true),
    type,
    ariaProps: {
        role: 'status',
        'aria-live': 'polite',
    },
    //@ts-ignore
    message, //: isObservable(message) ? message : $(message),
    pauseDuration: $(1000), //5000000),
    ...opts,
    id: opts?.id || genId(),
})

const createHandler = (type?: ToastType): ToastHandler => (message, options) => {
    if (options?.id) {
        const r = toasts().find(t => t.id === options.id)
        if (r) {
            r.createdAt(Date.now())
            r.message(resolveValue(message, r))
            r.visible(true)
            return r.id
        }
    }

    const toast = createToast(message, type, options)
    addOrUpdate(toast)
    return toast.id
}

const toast = (message: ObservableMaybe<Message | Toast> | ((t: any) => Child), opts?: ToastOptions) => createHandler('blank')(message, opts)

toast.error = createHandler('error')
toast.success = createHandler('success')
toast.loading = createHandler('loading')
toast.custom = createHandler('custom')

toast.dismiss = (toastId?: string) => dismiss(toastId)
toast.remove = (toastId?: string) => remove(toastId)

toast.promise = <T>(
    promise: Promise<T>,
    msgs: {
        loading: Observable<Child | Toast>
        success: ValueOrFunction<Observable<Child | Toast>, T>
        error: ValueOrFunction<Observable<Child | Toast>, any>
    },
    opts?: DefaultToastOptions
) => {
    const id = toast.loading(msgs.loading, { ...opts, ...opts?.loading })

    promise
        .then((p) => {
            toast.success(resolveValue(msgs.success, p), {
                id,
                ...opts,
                ...opts?.success,
            })
            return p
        })
        .catch((e) => {
            toast.error(resolveValue(msgs.error, e), {
                id,
                ...opts,
                ...opts?.error,
            })
        })

    return promise
}

export { toast }
