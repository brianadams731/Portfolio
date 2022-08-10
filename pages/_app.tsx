import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { NavLayout } from '../components/NavLayout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
      </Head>
      <NavLayout>
        <Component {...pageProps} />
      </NavLayout>
    </>
  )
}

export default MyApp
