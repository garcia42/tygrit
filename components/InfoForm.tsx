import { useState } from "react";

interface InfoFormPropTypes {
    setSuccessToast: (s: string) => void,
    setFailToast: (s: string) => void,
}

export const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL ? 'https://' + process.env.NEXT_PUBLIC_VERCEL_URL : "http://localhost:3000";

function recordEmail(email: string, name: string, address: string, phone: string) {
  phone = phone.replace('-', '')
  phone = phone.replace('(', '')
  phone = phone.replace(')', '')
  return fetch('https://api.sendinblue.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': process.env.NEXT_PUBLIC_SEND_BLUE as string,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      updateEnabled: true,
      "listIds": [
        2,
      ],
      
      attributes: { FIRSTNAME: name, LASTNAME: address, sms: "+91" + phone },
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
        email: "jesus.garcia@tygritinvesting.com",
        name: "Jesus at Tygrit Investing"
      },
      to: [
        {
          email,
        }
      ],
      replyTo: {
        email: "jesus.garcia@tygritinvesting.com"
      },
      templateId: 2,
    })
  });
}

export default function InfoForm({setSuccessToast, setFailToast}: InfoFormPropTypes) {
    let [email, setEmail] = useState<string>('');
    let [name, setName] = useState<string>('');
    let [phone, setPhone] = useState<string>('');
    let [address, setAddress] = useState<string>('');
    let [isInPark, setInPark] = useState<boolean>(false);
  
    const onChangeRadio = (event: any) => {
      console.log(event.target.value);
      event.target.value === "private" ? setInPark(false) : setInPark(true)
    }

    async function submitEmail(e: React.SyntheticEvent, email: string) {
        e.preventDefault();

        if (!email) {
            setFailToast("Please enter an email");
            return;
        }
        
        return await recordEmail(email, name, address, phone)
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
            .then((resp: any) => (resp as Response).json()).then((data: any) => {
                if (!data.code) {
                    setSuccessToast("Success");
                    (window as any).gtag('event', 'conversion', {"send_to": process.env.NEXT_PUBLIC_GOOGLE_ADS_CONV});
                    (window as any).gtag('event', 'sign_up', {"send_to": process.env.NEXT_PUBLIC_GA});
                } else {
                    setFailToast(data.message);
                    throw new Error('Something went wrong sending email');
                }
            }, (e: any) => {
                console.log(e);
            });
        }
  
    return (
      <div className="m-4 bg-gray-200 p-4 shadow-xl">
        <p className="text-xl font-semibold">Get Your Cash Offer</p>
        <p className="">Fill out the information below to get started or call (425) 243-7573</p>
        <form className="mt-2" onSubmit={(e) => submitEmail(e, email)}>
          <div className="my-1">
            <p>Your name<span className="text-red-400">*</span></p>
            <input required={true} className="border border-gray-500 p-2 flex w-full rounded-lg" type="address" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"></input>
          </div>
          <div className="my-1">
            <p>Property Address<span className="text-red-400">*</span></p>
            <input required={true} className="border border-gray-500 p-2 flex w-full rounded-lg" type="address" name="email" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address"></input>
          </div>
          {/* <div className="my-1">
            <p>My home is...<span className="text-red-400">*</span></p>
            <ul className=" flex">
              <li className=" inline text-center items-center relative flex-1">
                <input type="radio" id="lot" className="mr-1 border border-gray-500 rounded-lg" value="private" name="email" checked={!isInPark} onChange={(e) => onChangeRadio(e)}></input> On a private lot
              </li>
              <li className=" inline relative flex-1">
                <input type="radio" id="park" className="mr-1 border border-gray-500 rounded-lg" value="inPark" name="email" checked={!isInPark} onChange={(e) => onChangeRadio(e)}></input> In a park
              </li>
            </ul>
          </div> */}
          <div className="my-1">
            <p>Phone<span className="text-red-400">*</span></p>
            <input required={true} className="border border-gray-500 p-2 flex w-full rounded-lg" name="email" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number"></input>
          </div>
          <div className="my-1">
            <p>Email<span className="text-red-400">*</span></p>
            <input required={true} className="border border-gray-500 p-2 flex w-full rounded-lg" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address"></input>
          </div>
          <div className="flex mt-2">
            <button className="text-white bg-red-600 p-2 mx-auto w-6/12 rounded-lg">Get my Cash Offer</button>
          </div>
        </form>
      </div>
    )
  }