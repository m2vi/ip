import '@styles/globals.css';
import '@styles/colors.css';
import 'tailwindcss/tailwind.css';
import '@styles/leaflet.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
