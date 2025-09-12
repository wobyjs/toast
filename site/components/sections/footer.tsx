import { } from 'woby'
import { Navigate } from '@woby/router'

export function Footer({ noBadge }: { noBadge?: boolean }) {
    console.log('Footer')
    return (
        <footer class="container relative justify-center my-8 flex flex-col items-center space-y-4">
            <div class="flex space-x-4">
                <a
                    class="underline"
                    href="https://github.com/timolins/toast"
                >
                    GitHub
                </a>
                <Navigate to="/docs">
                    <a class="underline">Docs</a>
                </Navigate>
                <a class="underline" href="https://twitter.com/timolins">
                    Twitter
                </a>
            </div>
            <div class="text-toast-600">
                <span>© {new Date().getFullYear()} voby-toast</span>
                {' · '}
                <span>
                    <span>Built by </span>
                    <a class="underline" href="https://timo.sh">
                        Timo Lins
                    </a>
                </span>
            </div>
            {!noBadge && (
                <div>
                    <a
                        href="https://splitbee.io/?ref=rht"
                        data-splitbee-event="Click Splitbee Analytics"
                        data-splitbee-event-location="Footer"
                    >
                        <img
                            src="https://splitbee-cdn.fra1.cdn.digitaloceanspaces.com/static/badge/splitbee-badge.svg"
                            alt="Analytics by Splitbee.io"
                        />
                    </a>
                </div>
            )}
        </footer>
    )
}
