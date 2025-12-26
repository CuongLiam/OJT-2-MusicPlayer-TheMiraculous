import Banner from "../../assets/image/homepage-banner.png";

export default function HomeBanner() {
  return (
    <section className="relative w-full bg-[#14182A] overflow-hidden pl-40">
      <div className="relative w-full max-w-340 mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-start min-h-100 lg:min-h-134.75">
          <div className="w-full lg:w-auto shrink-0 flex items-center justify-center lg:justify-start">
            <img
              src={Banner}
              alt="Singer with microphone"
              className="w-auto h-75 md:h-100 lg:h-134.75 object-contain"
              width={511}
              height={539}
            />
          </div>

          <div className="w-full lg:flex-1 flex items-center justify-center lg:justify-start px-6 md:px-8 lg:px-0 py-8 lg:py-0 lg:-ml-8">
            <div className="max-w-xl text-center lg:text-left">
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 lg:mb-3">
                This Month's
              </h1>
              <h2 className="whitespace-nowrap text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#3BC8E7] mb-4 lg:mb-6">
                Record Breaking Albums !
              </h2>

              <p className="text-sm md:text-base text-[#777777] mb-2 leading-relaxed">
                Dream your moments, Until I Met You, Gimme Some Courage, Dark Alley, One More Of A Stranger, Endless
              </p>
              <p className="text-[15px] text-[#777777] mb-6 lg:mb-8 leading-relaxed">
                Things, The Heartbeat Stops, Walking Promises, Desired Games and many more..
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-3 bg-[#3BC8E7] hover:bg-[#2fb5d4] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                  Listen Now
                </button>
                <button className="px-8 py-3 bg-[#3BC8E7] hover:bg-[#2fb5d4] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                  Add To Queue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
