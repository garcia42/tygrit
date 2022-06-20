import Image from 'next/image'

const cardStyle = {
    "padding": ".5rem",
    "textAlign": "center",
    "color": "inherit",
    "textDecoration": "none",
    "border": "1px solid #eaeaea",
    "borderRadius": "10px",
    "transition": "color 0.15s ease, border-color 0.15s ease",
  } as any;  

export default function HowItWorks() {
    return (
        <div>
            <div className="items-center text-center mt-6 mx-4">
                <div className="text-xl">How it works:</div>
                <div className="font-semibold">
                    From the first conversation to sale we can close in under 7 days
                </div>
            </div>

            <div className="flex align-center justify-center flex-wrap mt-2 mx-4">
            <div style={cardStyle} className="hover:!text-blue-400 hover:!border-blue-400 md:max-w-xs">
                <div className="flex items-center">
                    <div className="block mx-auto">
                        <Image alt="clock" height={40} width={40} src={"/sync.png"}/>
                    </div>
                </div>
                <h2 className=" font-semibold">Get a fair offer within 24 hours</h2>
                <p className="text-sm">Avoid the hassle of listing your land for sale, working with agents and waiting months to get an offer.</p>
            </div>

            <div style={cardStyle} className="hover:!text-blue-400 hover:!border-blue-400 md:max-w-xs md:mx-4 my-2 md:my-0">
                <div className="flex items-center">
                    <div className="block mx-auto">
                    <Image alt="personalized" height={40} width={40} src={"/exchange.png"}/>
                    </div>
                </div>
                <h2 className=" font-semibold">Pick the date you want to close</h2>
                <p className="text-sm">Selling your land can be stressful, have peace of mind by knowing all of your options.</p>
            </div>

            <div style={cardStyle} className="hover:!text-blue-400 hover:!border-blue-400 md:max-w-xs">
                <div className="flex items-center">
                    <div className="block mx-auto">
                        <Image alt="clock" height={40} width={40} src={"/clock.png"}/>
                    </div>
                </div>
                <h2 className=" font-semibold">Sell on your terms</h2>
                <p className="text-sm">Have the flexibility to sell on the date that you choose. We can handle moving debris</p>
            </div>
            </div>
        </div>
    )
}