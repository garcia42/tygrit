import 'tailwindcss/tailwind.css'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import { useState } from "react"

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

const Home: NextPage = () => {

  let [email, setEmail] = useState<string>('');
  let [successToast, setSuccessToast] = useState<boolean>(false);
  let [failToast, setFailToast] = useState<string>("");

  async function submitEmail(e: React.SyntheticEvent, email: string) {
    e.preventDefault();

    if (!email) {
      setFailToast("Please enter an email");
      return;
    }
  
    return await recordEmail(email)
      .then((resp) => resp.json()).then(data => {
        console.log(data);
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
          setSuccessToast(true)
        } else {
          setFailToast(data.message);
          throw new Error('Something went wrong sending email');
        }
      }, (e) => {
        console.log(e);
      });
  }

  return (
    <div className="mx-4 sm:mx-16 lg:mx-32">
      <Head>
        <title>Async Chess Coach</title>
        <meta name="description" content="Games reviewed in the background" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex my-3">
          <Link href={"/"}>
            <a className="font-bold">Async Chess Coach</a>
          </Link>
      </div>

      <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2">
      {successToast && <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            </div>
            <div className="ml-3 text-sm font-normal">Signed up successfully.</div>
            <button onClick={() => setSuccessToast(false)} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-collapse-toggle="toast-success" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>}
        {failToast && <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </div>
            <div className="ml-3 text-sm font-normal">Failure signing up: {failToast}</div>
            <button onClick={() => setFailToast("")} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-collapse-toggle="toast-danger" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>}
      </div>

      <main className="justify-center align-center mt-14 md:mt-24">

        <div className="mx-auto md:flex justify-center">
          <div className="text-left self-center mb-4 md:mr-16 max-w-lg">

            <h1 className="font-semibold text-4xl my-2">
              Get your chess games analyzed by experts
            </h1>

            <h5 className="text-lg">
              Tailored feedback for your games
            </h5>

            <div className=" bg-opacity-50 mt-4">
              <span>Sign up to be notified of the beta release</span>
              <form className=" bg-opacity-50 bg-black inline-flex" onSubmit={(e) => submitEmail(e, email)}>
                <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-4 border border-gray-500 pl-1" placeholder="email address"></input>
                <button className="flex-1 text-white bg-red-600 p-2">Sign Up</button>
              </form>
            </div>
          </div>

          <div className="hidden md:flex justify-between">
            <Image className="rounded-xl mx-3" alt="chess piece" width={300} height={250} src="https://images.unsplash.com/photo-1538221566857-f20f826391c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"/>
            {/* <Image className="!hidden rounded-xl" alt="chess piece" width={300} height={250} src="https://images.unsplash.com/photo-1538221566857-f20f826391c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"/> */}
          </div>
        </div>
        
        <div className="items-center text-center mt-6">
          <div>Integrated with:</div>
          <div className="font-semibold">
            lichess &#8226; chess.com
          </div>
        </div>

        <div className="flex align-center justify-center flex-wrap mt-6">
          <div style={cardStyle} className="hover:!text-blue-400 !border-blue-400 md:max-w-xs">
            <div className="flex items-center">
              <h2 className="!mr-4">Hands Free</h2>
              <div className="block">
                <Image alt="clock" height={30} width={30} src={"/sync.png"}/>
              </div>
            </div>
            <p>Your games automatically sync with Async Coach, no need to upload anything</p>
          </div>

          <div style={cardStyle} className="hover:!text-blue-400 !border-blue-400 md:max-w-xs md:mx-4">
            <div className="flex items-center">
              <h2 className="!mr-4">Personalized</h2>
                <div className="block">
                  <Image alt="personalized" height={40} width={40} src={"/exchange.png"}/>
                </div>
            </div>
            <p>Let experts look at your play and pin point exactly what you need to play better chess</p>
          </div>

          <div style={cardStyle} className="hover:!text-blue-400 !border-blue-400 md:max-w-xs">
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
        </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
