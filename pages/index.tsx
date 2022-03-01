import 'tailwindcss/tailwind.css'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import { useState } from "react"
import Toasts from "../components/Toasts"
import ReadySlider from "../components/ReadySlider"

export const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL ? 'https://' + process.env.NEXT_PUBLIC_VERCEL_URL : "http://localhost:3000";

function recordEmail(email: string) {
  return fetch('https://api.sendinblue.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': process.env.NEXT_PUBLIC_SEND_BLUE as string,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      "updateEnabled": false,
      "listIds": [
        2,
      ],
    }),
  })
}

function sendConfirmationEmail(email: string) {
  return fetch('https://api.sendinblue.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.NEXT_PUBLIC_SEND_BLUE as string,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sender: {
        email: "jesus.garcia@asyncchesscoach.com",
        name: "AsyncChessCoach"
      },
      to: [
        {
          email,
        }
      ],
      replyTo: {
        email: "jesus.garcia@asyncchesscoach.com"
      },
      templateId: 2,
    })
  });
}

const cardStyle = {
  "marginTop": "1rem",
  "padding": "1.5rem",
  "textAlign": "left",
  "color": "inherit",
  "textDecoration": "none",
  "border": "1px solid #eaeaea",
  "borderRadius": "10px",
  "transition": "color 0.15s ease, border-color 0.15s ease",
} as any;

typeof window !== 'undefined' && localStorage.setItem('seenReadySlider', '');

const Home: NextPage = () => {

  let [email, setEmail] = useState<string>('');
  let [successToast, setSuccessToast] = useState<string>("");
  let [failToast, setFailToast] = useState<string>("");

  let [showSlider, setShowSlider] = useState<boolean>(typeof window !== 'undefined' && !localStorage.getItem('seenReadySlider'));
  if (typeof window !== 'undefined' && showSlider) {
    document.body.style.overflow = 'hidden';
  }

  async function submitEmail(e: React.SyntheticEvent, email: string) {
    e.preventDefault();

    if (!email) {
      setFailToast("Please enter an email");
      return;
    }
  
    return await recordEmail(email)
      .then((resp) => resp.json()).then(data => {
        if (!data.code) {
          return sendConfirmationEmail(email)
        } else {
          setFailToast(data.message);
          throw new Error('Something went wrong confirming email');
        }
      }, (e) => {
        console.log(e);
      })
      .then(resp => (resp as Response).json()).then(data => {
        if (!data.code) {
          setSuccessToast("Success");
          (window as any).gtag('event', 'conversion', {"send_to": process.env.NEXT_PUBLIC_GOOGLE_ADS_CONV});
          (window as any).gtag('event', 'sign_up', {"send_to": process.env.NEXT_PUBLIC_GA});
        } else {
          setFailToast(data.message);
          throw new Error('Something went wrong sending email');
        }
      }, (e) => {
        console.log(e);
      });
  }

  return (
    <div className="mx-4 sm:mx-16 lg:mx-24">
      <Head>
        <title>Async Chess Coach</title>
        <meta name="description" content="Games reviewed in the background" />
        <link rel="icon" href="/chess-strategy.png" />
      </Head>

      <div className="flex my-3">
          <Link href={"/"}>
            <a className="font-bold flex">
              <Image width={30} height={30} alt="logo" src={"/chess-strategy.png"}/>
              <div className="self-center">Async Chess Coach</div>
            </a>
          </Link>
      </div>

      <main className="justify-center align-center mt-14 md:mt-24">

        <div className="mx-auto md:flex justify-center">
          <div className="text-left self-center mb-4 md:mr-16 max-w-lg">

            <h1 className="font-semibold text-4xl md:text-5xl my-2">
              Get your chess games analyzed by masters
            </h1>

            <h5 className="text-lg md:text-xl">
              Tailored feedback for your games
            </h5>

            <div className="bg-opacity-50 mt-4 text-lg md:text-xl">
              <p>Sign up to be notified of the beta release</p>
              <form className=" bg-opacity-50 bg-black inline-flex" onSubmit={(e) => submitEmail(e, email)}>
                <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-4 border border-gray-500 pl-1" placeholder="email address"></input>
                <button className="flex-1 text-white bg-red-600 p-2">Sign Up</button>
              </form>
            </div>
          </div>

          <div className="hidden md:flex justify-between">
            <Image className="rounded-xl mx-3" alt="chess piece" width={300} height={250} src="https://images.unsplash.com/photo-1538221566857-f20f826391c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"/>
          </div>
        </div>
        
        <div className="items-center text-center mt-6">
          <div>Integrated with:</div>
          <div className="font-semibold">
            lichess &#8226; chess.com
          </div>
        </div>

        <div className="flex align-center justify-center flex-wrap mt-6">
          <div style={cardStyle} className="hover:!text-blue-400 hover:!border-blue-400 md:max-w-xs">
            <div className="flex items-center">
              <h2 className="!mr-4">Hands Free</h2>
              <div className="block">
                <Image alt="clock" height={30} width={30} src={"/sync.png"}/>
              </div>
            </div>
            <p>Your games automatically sync with Async Coach, no need to upload anything</p>
          </div>

          <div style={cardStyle} className="hover:!text-blue-400 hover:!border-blue-400 md:max-w-xs md:mx-4">
            <div className="flex items-center">
              <h2 className="!mr-4">Personalized</h2>
                <div className="block">
                  <Image alt="personalized" height={40} width={40} src={"/exchange.png"}/>
                </div>
            </div>
            <p>Let masters look at your play and pin point exactly what you need to play better chess</p>
          </div>

          <div style={cardStyle} className="hover:!text-blue-400 hover:!border-blue-400 md:max-w-xs">
            <div className="flex items-center">
              <h2 className="!mr-4">Save Time</h2>
              <div className="block">
                <Image alt="clock" height={40} width={40} src={"/clock.png"}/>
              </div>
            </div>
            <p>Request individual games to be reviewed and get feedback by the next day</p>
          </div>
        </div>

        <div className="justify-center mt-10 items-center md:flex mx-auto">
          <Image alt="Chess Review" width={400} height={400} src={"/chessBoard.png"}/>
          <div className="md:w-1/3 ml-2 p-2 bg-slate-200 rounded-xl">
            <div className="mb-2">Against these stonewall structures make sure to lock down the center and finish developing before attacking on the flank.</div>
            <div className="flex items-center">
              <Image className="rounded-full" alt="master" width={30} height={30} src={"/chad.jpeg"}/>
              <p className="ml-1">FM Chadley Gigaton (2469)</p>
            </div>
          </div>
        </div>

        <div className="bg-opacity-50 mt-10 text-lg md:text-xl justify-center text-center">
          <p>Sign up to be notified of the beta release</p>
          <form className=" bg-opacity-50 bg-black inline-flex" onSubmit={(e) => submitEmail(e, email)}>
            <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-4 border border-gray-500 pl-1" placeholder="email address"></input>
            <button className="flex-1 text-white bg-red-600 p-2">Sign Up</button>
          </form>
        </div>
      </main>
      <footer className="flex flex-1 py-4 mt-8 border-t justify-center items-center">
        <div className="block">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className=" h-4 ml-2">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
        <div className="block">
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

      {showSlider && <ReadySlider setShowSlider={setShowSlider}/>}
    </div>
  )
}

export default Home
