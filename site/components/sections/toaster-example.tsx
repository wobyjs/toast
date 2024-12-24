import { ObservableMaybe, $, $$, Observable } from 'woby'
import toast, { ToastPosition } from '../../../src'
import Arrow from '../../assets/dist/arrow'
import { Code } from '../code'

import { EmojiButton } from '../emoji-button'

export const positions: Array<ToastPosition> = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
]

export const ToasterExample = ({ position, reverse }: {
    position: Observable<ToastPosition>
    reverse: Observable<boolean>
}) => {
    const reverseIt = () => {
        setTimeout(() => {
            toast('Notification 1', {
                icon: '1️⃣',
                id: 'reverse-1',
            })
        }, 10)

        setTimeout(
            () =>
                toast('Notification 2', {
                    icon: '2️⃣',
                    id: 'reverse-2',
                }),
            250
        )
        setTimeout(
            () =>
                toast('Notification 3', {
                    icon: '3️⃣',
                    id: 'reverse-3',
                }),
            500
        )
        setTimeout(
            () =>
                toast('Notification 4', {
                    icon: '4️⃣',
                    id: 'reverse-4',
                }),
            750
        );
        (window as any).splitbee?.track('Change Order', {
            reverseOrder: !reverse,
        })
        reverse(!$$(reverse))
    }

    const renderPosition = (p: ObservableMaybe<ToastPosition>) => (
        <button
            id="p"
            class={[
                'rounded-xl text-center text-xs md:text-sm py-2 px- flex items-center justify-center cursor-pointer flex-col md:flex-row',
                () => $$(position) === p
                    ? 'bg-toast-900 text-toast-100 '
                    : 'bg-white shadow-small-button'
            ]}
            onClick={() => {
                toast.success(
                    <span>
                        Position set to <b>{p}</b>
                    </span>,
                    {
                        id: 'position',
                    }
                );

                (window as any).splitbee?.track('Change Position', { position: p, });

                (window as any).splitbee?.track('Trigger Toast', { example: 'position', })

                position($$(p))
            }}
        >
            <span class="mr-2">{p}</span>
        </button>
    )

    return (
        <section class="flex flex-col md:grid grid-cols-1 md:grid-cols-3 gap-2">
            <Code
                snippet={() => `<Toaster
  position="${$$(position)}"
  reverseOrder={${$$(reverse)}}
/>`}
            />
            <div class="order-first md:order-none col-span-2 grid grid-cols-3 justify-between bg-toast-100 rounded-xl gap-x-2 gap-y-4 p-2 md:p-4">
                {positions.map((p) => renderPosition(p))}
            </div>
            <div class="col-start-2 col-span-2 flex justify-center my-4">
                <EmojiButton
                    emoji={
                        <Arrow
                            class={[
                                'transform transition-transform',
                                () => (($$(position).includes('bottom') && !$$(reverse)) ||
                                    ($$(position).includes('top') && $$(reverse))) &&
                                    'rotate-180'
                            ]}
                        />
                    }
                    onClick={reverseIt}
                >
                    Toggle Direction
                </EmojiButton>
            </div>
        </section>
    )
}
