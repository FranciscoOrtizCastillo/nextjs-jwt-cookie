import Head from "next/head";
import Navbar from "./Navbar";

export const Layout = ({ children }) => (
  <>
    <Head>
      <title>Ejemplo App Nextjs</title>
    </Head>
    <Navbar />

    <main className="bg-zinc-800 min-h-screen">{children}</main>
  </>
);