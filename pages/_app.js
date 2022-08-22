import { Layout } from '../src/components/Layout'

import '../styles/globals.css'
import '../styles/Navbar.css'

// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'



function MyApp({ Component, pageProps }) {
  return  (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
