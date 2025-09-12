import { Child as Wheeler, Observable, ObservableMaybe, type JSX } from 'woby'

export type ToastType = 'success' | 'error' | 'loading' | 'blank' | 'custom'
export type ToastPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'

// export type Renderable = JSX.Element | string | null

export interface IconTheme {
    primary: string
    secondary: string
}

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue
export type ValueOrFunction<TValue, TArg> =
    | TValue
    | ValueFunction<TValue, TArg>

const isFunction = <TValue, TArg>(
    valOrFunction: ValueOrFunction<TValue, TArg>
): valOrFunction is ValueFunction<TValue, TArg> =>
    typeof valOrFunction === 'function'

export const resolveValue = <TValue, TArg>(
    valOrFunction: ValueOrFunction<TValue, TArg>,
    arg: TArg
): TValue => (isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction)

export interface Toast {
    id: string
    type: ObservableMaybe<ToastType>
    message: Observable<JSX.Child | Toast | ((t: any) => Wheeler)>
    icon?: ObservableMaybe<JSX.Child>
    duration?: ObservableMaybe<number>
    pauseDuration: ObservableMaybe<number>
    position?: ObservableMaybe<ToastPosition>

    ariaProps: {
        role: 'status' | 'alert'
        'aria-live': 'assertive' | 'off' | 'polite'
    }

    style?: ObservableMaybe<JSX.StyleProperties>
    className?: ObservableMaybe<string>
    iconTheme?: ObservableMaybe<IconTheme>

    createdAt: Observable<number>
    visible: Observable<boolean>
    height?: Observable<number>
}

export type ToastOptions = Partial<
    Pick<
        Toast,
        | 'id'
        | 'icon'
        | 'duration'
        | 'ariaProps'
        | 'className'
        | 'style'
        | 'position'
        | 'iconTheme'
        | 'message'
    >
>

export type DefaultToastOptions = ToastOptions & {
    [key in ToastType]?: ToastOptions
}

export interface ToasterProps {
    position?: ObservableMaybe<ToastPosition>
    toastOptions?: DefaultToastOptions
    reverseOrder?: ObservableMaybe<boolean>
    gutter?: ObservableMaybe<number>
    containerStyle?: JSX.StyleProperties
    containerClassName?: ObservableMaybe<string>
    children?: (toast: Toast) => JSX.Element
}

export interface ToastWrapperProps {
    toast: Toast
    className?: ObservableMaybe<string>
    style?: JSX.Style
    onHeightUpdate: (toast: Toast, height: number) => void
    children?: JSX.Children
}
