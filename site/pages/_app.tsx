import '../styles/tailwind-utils.css'
import '../styles/main.css'
import * as React from 'woby'
import { Navigate } from 'woby-router'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/woby'


import { MDXProvider } from '@mdx-js/woby'
import { Code } from '../components/code'

console.log('const components')
const components = {
    a: (props) => (
        <Navigate href={props.href}>
            <a {...props} />
        </Navigate>
    ),
    code: (props) =>
        props.className ? (
            <Code className={props.className} snippet={props.children} />
        ) : (
            <code
                className="bg-toast-300 py-1 my-0.5 px-1 rounded bg-opacity-40"
                {...props}
            />
        ),
}

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                {process.browser && (
                    <script async data-no-cookie data-api="/_hive" src="/bee.js" />
                )}
                <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
            </Head>
            <MDXProvider components={components}>
                <Component {...pageProps} />
                <Analytics />
            </MDXProvider>
        </>
    )
}

export default MyApp
