import Head from 'next/head';
import '../style.scss'
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import Script from "next/script";

function MyApp({ Component, pageProps }) {

    useEffect(()=>{
        import("bootstrap/dist/js/bootstrap");
    },[])
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Interactive Maps</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet" />
                <Script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
                crossOrigin="anonymous"
                />
         
            </Head>

            <Component {...pageProps} />
        </>
    );
}
export default MyApp
