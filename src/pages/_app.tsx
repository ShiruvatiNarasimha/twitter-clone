import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "@/components/Layout";
import Model from "@/components/Model";
import {RecoilRoot} from "recoil";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import EditModal from "@/components/modals/EditModal"
import {SessionProvider} from "next-auth/react";
import {Toaster} from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return(
      <SessionProvider session={pageProps.session}>
            <RecoilRoot>
                <Toaster/>
                <LoginModal/>
                <RegisterModal/>
                <EditModal/>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </RecoilRoot>
      </SessionProvider>
  )
}
