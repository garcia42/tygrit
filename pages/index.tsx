import 'tailwindcss/tailwind.css'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import { useState } from "react"
import Toasts from "../components/Toasts"
import InfoForm from "../components/InfoForm"

const cardStyle = {
  "padding": ".5rem",
  "textAlign": "center",
  "color": "inherit",
  "textDecoration": "none",
  "border": "1px solid #eaeaea",
  "borderRadius": "10px",
  "transition": "color 0.15s ease, border-color 0.15s ease",
} as any;

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

      <div className="flex py-2 bg-red-400 px-4 sm:px-16 lg:px-24 justify-center">
          <Link href={"/"}>
            <a className="font-semibold flex">
              <div className="self-center text-center text-white">SELL YOUR MOBILE HOME IN WASHINGTON TODAY!</div>
            </a>
          </Link>
      </div>

      <main className="justify-center align-center">
        <div className="relative">
          <div className="mx-auto sm:flex justify-center relative bg-[url('/mobileHome.jpeg')] bg-cover">
            <div className="bg-cover bg-gradient-to-b from-gray-600 absolute top-0 w-full h-full opacity-50"/>
            <div className="md:flex p-4 z-0 relative">
              <div className="text-left self-center pb-4 md:pr-8 max-w-lg text-white">

                <h1 className="text-shadow-xl font-semibold text-2xl md:text-3xl md:pt-0 pt-4 text-white shadow-lg">
                  We Buy Mobile Homes and Land in Port Orchard, Washington
                </h1>

                <h5 className="text-shadow-xl text-lg md:text-xl mt-2">
                  Sell your mobile home for cash!
                </h5>
              </div>
              <div className="hidden sm:block">
                <InfoForm setSuccessToast={setSuccessToast} setFailToast={setFailToast}/>
              </div>
            </div>
          </div>
        </div>

        <div className="items-center text-center mt-6 mx-4">
          <div className="text-xl">How it works:</div>
          <div className="font-semibold">
            From the first conversation to sale we can close in under 7 days
          </div>
        </div>

        <div className="flex align-center justify-center flex-wrap mt-2 mx-4">
          <div style={cardStyle} className="hover:!text-blue-400 hover:!border-blue-400 md:max-w-xs">
            <div className="flex items-center">
              {/* <h2 className="!mr-4">Hands Free</h2> */}
              <div className="block mx-auto mb-2">
                <Image alt="clock" height={40} width={40} src={"/sync.png"}/>
              </div>
            </div>
            <p>An initial call will help us understand your home and situation.</p>
          </div>

          <div style={cardStyle} className="hover:!text-blue-400 hover:!border-blue-400 md:max-w-xs md:mx-4 my-2 md:my-0">
            <div className="flex items-center">
              {/* <h2 className="!mr-4">Personalized</h2> */}
                <div className="block mx-auto mb-2">
                  <Image alt="personalized" height={40} width={40} src={"/exchange.png"}/>
                </div>
            </div>
            <p>Schedule a walkthrough or send us pictures from various locations.</p>
          </div>

          <div style={cardStyle} className="hover:!text-blue-400 hover:!border-blue-400 md:max-w-xs">
            <div className="flex items-center">
              {/* <h2 className="!mr-4">Save Time</h2> */}
              <div className="block mx-auto mb-2">
                <Image alt="clock" height={40} width={40} src={"/clock.png"}/>
              </div>
            </div>
            <p>Receive your cash and we will cover any transportation.</p>
          </div>
        </div>

        <div className="w-8/12 mx-auto my-10">
          <h2 className="mb-1 font-semibold text-xl">Mobile Home Buyer in Washington</h2>
          Located in <b>Port Orchard, WA</b> and need to sell your mobile or manufactured home? We are mobile home buyers and we make cash offers on <b>as-is</b> mobile and manufactured homes in Port Orchard, WA.
        </div>

        <div className="w-8/12 mx-auto my-10">
          <h2 className="mb-1 font-semibold text-xl">Do we purchase the land or just the home?</h2>
          We can purchase any of the land and/or home. If you&apos;re looking to move quickly and don&apos;t have the time or the energy to remove debris from the land then we&apos;ll gladly handle that for you.
        </div>

        <div className="w-8/12 mx-auto my-10">
          <h2 className=" mb-1 font-semibold text-xl">Are you in any of these situations?</h2>
          <ul className=" list-disc">
            <li>Need to sell as-is, for cash?</li>
            <li>Selling your home without land?</li>
            <li>In a position where you need to sell FAST?</li>
            <li>Tenants are always late with rent and you&apos;ve had enough?</li>
            <li>Don&apos;t want to pay agent commision on the sale?</li>
          </ul>
          <h2 className=" mb-1 text-lg mt-3 font-semibold">If so, give us a call at (425) 243-7573 and let&apos;s work together on a solution.</h2>
        </div>

        <div className=" max-w-2xl justify-center mx-auto text-center my-3">
          <p className="text-lg mb-1 font-semibold">Who are we?</p>
          <div className="justify-center items-center md:flex mx-auto">
            <div className="flex-1">
            <Image alt="Who are we?" width={300} height={300} src={"/jesusAndJordan.jpeg"}/>
            </div>
            <div className="md:w-1/3 mx-4 md:mx-2 p-2 bg-slate-200 rounded-xl flex-1">
              <div className="">Hi, i&apos;m Jesus and this is my fiance Jordan.<br/><br/>We&apos;re passionate about housing and enjoy helping others with their housing needs.<br/><br/> I do software engineering and Jordan runs an environmental consulting company.</div>
            </div>
          </div>
        </div>

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
