import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { NavLayout } from '../components/NavLayout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Mono&display=swap" rel="stylesheet" />
      </Head>
      <NavLayout>
        <Component {...pageProps} />
      </NavLayout>
    </>
  )
}

export default MyApp
