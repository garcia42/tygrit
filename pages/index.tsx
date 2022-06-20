import 'tailwindcss/tailwind.css'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import { useState } from "react"
import Toasts from "../components/Toasts"
import InfoForm from "../components/InfoForm"
import dynamic from 'next/dynamic'
import HowItWorks from "../components/HowItWorks"
let FamewallEmbed = dynamic(() => import("react-famewall"), { ssr: false }) //<- set SSr to false
FamewallEmbed = FamewallEmbed as any

const Home: NextPage = () => {
  let [successToast, setSuccessToast] = useState<string>("");
  let [failToast, setFailToast] = useState<string>("");

  return (
    <div className="">
      <Head>
        <title>Tygrit Investing</title>
        <meta name="description" content="Quick, hassle-free offers on mobile homes" />
        <link rel="icon" href="/chess-strategy.png" />
      </Head>

      <div className="flex py-2 px-4 bg-blue-900 sm:px-16 lg:px-24 justify-center">
          <Link href={"/"}>
            <a className="font-semibold flex">
              <div className="self-center text-center text-white tracking-wide">TYGRIT INVESTING</div>
            </a>
          </Link>
      </div>

      <main className="justify-center align-center">
        <div className="relative">
          <div className="mx-auto sm:flex justify-center relative bg-[url('/land.jpg')] bg-cover">
            <div className="bg-cover bg-gradient-to-b from-gray-600 absolute top-0 w-full h-full opacity-70"/>
            <div className="md:flex p-4 py-8 z-0 relative">
              <div className="text-left self-center pb-4 md:pr-8 max-w-lg text-white">

                <h1 className="text-shadow-xl font-semibold text-2xl md:text-3xl md:pt-0 pt-4 text-white shadow-lg">
                  Sell Your Land in Port Orchard Today
                </h1>

                <h5 className="text-shadow-xl text-lg md:text-xl mt-2">
                  No Realtors. No Fees. No Commissions.
                </h5>
              </div>
              <div className="hidden sm:block">
                <InfoForm setSuccessToast={setSuccessToast} setFailToast={setFailToast}/>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden block mt-2">
          <InfoForm setSuccessToast={setSuccessToast} setFailToast={setFailToast}/>
        </div>

        <HowItWorks/>

        <div className="mx-auto text-center text-lg font-semibold tracking-wide mt-2 bg-white mb-2">TESTIMONIALS</div>
        {/*// @ts-ignore */}
        <FamewallEmbed wallUrl="tygrit"/>

        <div className=" mx-auto md:w-6/12 bg-opacity-50 mt-10 text-lg md:text-xl justify-center text-center">
          <InfoForm setSuccessToast={setSuccessToast} setFailToast={setFailToast}/>
        </div>
      </main>
      <footer className="flex flex-1 py-4 mt-8 border-t justify-center items-center mx-2">
        <div className="block">
          <a
            className="mx-auto"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className=" h-4 ml-2">
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
          <div className="grid grid-cols-4">
            <div>
              <a href="https://www.flaticon.com/free-icons/quick" title="quick icons">Quick icons created by kornkun - Flaticon</a>
            </div>
            <div>
              <a href="https://www.flaticon.com/free-icons/personalization" title="personalization icons">Personalization icons created by Freepik - Flaticon</a>
            </div>
            <div>
              <a href="https://www.flaticon.com/free-icons/sync" title="sync icons">Sync icons created by Freepik - Flaticon</a>
            </div>
            <div>
            <a href="https://iconscout.com/icons/chess-strategy">Chess strategy Icon</a> by <a href="https://iconscout.com/contributors/iconscout">Iconscout Store</a>
            </div>
          </div>
        </div>
      </footer>

      <Toasts successToast={successToast} setSuccessToast={setSuccessToast} failToast={failToast} setFailToast={setFailToast}/>
    </div>
  )
}

export default Home
