import Image from 'next/image'

export default function WhoAreWe() {
    return (
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
    )
}