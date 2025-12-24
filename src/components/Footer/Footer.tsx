import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaLinkedinIn, FaTwitter, FaGooglePlusG,} from "react-icons/fa";

import "../../assets/css/Footer.css";

import bgFooter from "../../assets/image/background-footer.png";
import gradientOverlay from "../../assets/image/gradient-overlay.png";
import logoImg from "../../assets/image/miraculous.png";
import googlePlayImg from "../../assets/image/googleplay.jpg";
import appStoreImg from "../../assets/image/appstore.jpg";
import windowsStoreImg from "../../assets/image/windowstore.jpg";

interface SocialIconProps {
  icon: React.ReactNode;
}

export default function Footer() {
  return (
    <>
      <div className="max-w-360 flex justify-center bg-[#020d1c]">
        <footer
          className="relative text-gray-300 footer-responsive"
          style={{
            backgroundImage: `url(${gradientOverlay}), url(${bgFooter})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="w-full h-full px-10 md:px-20 py-20 flex flex-col justify-center">
            <div className="flex flex-col items-center mb-14">
              <div className="mb-4">
                <img
                  src={logoImg}
                  alt="Miraculous Logo"
                  className="h-20 w-auto object-contain"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              <div>
                <h3 className="text-cyan-400 text-[18px] font-semibold uppercase tracking-wide">
                  Miraculous Music Station
                </h3>
                <div className="w-10 h-0.5 bg-cyan-400 mt-2 mb-6"></div>
                <p className="text-[15px] leading-7 text-gray-300 text-justify font-normal">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
              <div>
                <h3 className="text-cyan-400 text-[18px] font-semibold uppercase tracking-wide">
                  Download Our App
                </h3>
                <div className="w-10 h-0.5 bg-cyan-400 mt-2 mb-6"></div>
                <p className="text-[15px] text-gray-300 mb-6 font-normal leading-6">
                  Go Mobile with our app.
                  <br />
                  Listen to your favourite songs at just one click. Download Now
                  !
                </p>
                <div className="flex flex-col space-y-4">
                  <a
                    href="#"
                    className="hover:opacity-80 transition-opacity w-max"
                  >
                    <img
                      src={googlePlayImg}
                      alt="Get it on Google Play"
                      className="h-11.25 w-auto rounded"
                    />
                  </a>
                  <a
                    href="#"
                    className="hover:opacity-80 transition-opacity w-max"
                  >
                    <img
                      src={appStoreImg}
                      alt="Download on the App Store"
                      className="h-11.25 w-auto rounded"
                    />
                  </a>
                  <a
                    href="#"
                    className="hover:opacity-80 transition-opacity w-max"
                  >
                    <img
                      src={windowsStoreImg}
                      alt="Download from Windows Store"
                      className="h-11.25 w-auto rounded"
                    />
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-cyan-400 text-[18px] font-semibold uppercase tracking-wide">
                  Subscribe
                </h3>
                <div className="w-10 h-0.5 bg-cyan-400 mt-2 mb-6"></div>

                <p className="text-[15px] text-gray-300 mb-6 font-normal leading-6">
                  Subscribe to our newsletter and get latest updates and offers.
                </p>
                <form className="flex flex-col space-y-4">
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="w-full h-10 px-4 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-[15px]"
                  />
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full h-10 px-4 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-[15px]"
                  />
                  <button
                    type="button"
                    className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-2.5 px-8 rounded-full transition-colors duration-300 w-max mt-2 shadow-lg shadow-cyan-500/30 text-[15px]"
                  >
                    Sign Me Up
                  </button>
                </form>
              </div>
              <div>
                <h3 className="text-cyan-400 text-[18px] font-semibold uppercase tracking-wide">
                  Contact Us
                </h3>
                <div className="w-10 h-0.5 bg-cyan-400 mt-2 mb-6"></div>

                <ul className="space-y-6 text-[15px] font-light">
                  <li className="flex items-start gap-4">
                    <div className="w-9 h-9 shrink-0 bg-cyan-500 rounded flex items-center justify-center text-white shadow-md">
                      <FaPhoneAlt size={14} />
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Call Us :</p>
                      <p className="text-gray-300 leading-relaxed font-normal">
                        (+1) 202-555-0176, (+1) 2025-5501
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-9 h-9 shrink-0 bg-cyan-500 rounded flex items-center justify-center text-white shadow-md">
                      <FaEnvelope size={14} />
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">
                        Email Us :
                      </p>
                      <p className="text-gray-300 font-normal leading-relaxed ">
                        demo@mail.com, dummy@mail.com
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-9 h-9 shrink-0 bg-cyan-500 rounded flex items-center justify-center text-white shadow-md">
                      <FaMapMarkerAlt size={14} />
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Walk In :</p>
                      <p className="text-gray-300 font-normal leading-relaxed">
                        598 Old House Drive, London
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="mt-10 flex items-center gap-4">
                  <span className="text-white text-[15px] font-semibold">
                    Follow Us :
                  </span>
                  <div className="flex gap-2">
                    <SocialIcon icon={<FaFacebookF />} />
                    <SocialIcon icon={<FaLinkedinIn />} />
                    <SocialIcon icon={<FaTwitter />} />
                    <SocialIcon icon={<FaGooglePlusG />} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-auto pt-10 text-center">
              <p className="text-gray-400 text-[15px] font-normal">
                Copyright © 2022{" "}
                <span className="text-cyan-400 font-normal">
                  The Miraculous Music Template
                </span>{" "}
                . All Rights Reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
const SocialIcon: React.FC<SocialIconProps> = ({ icon }) => (
  <a
    href="#"
    className="w-8 h-8 bg-cyan-500 hover:bg-cyan-400 text-white flex items-center justify-center rounded shadow-sm transition-all hover:-translate-y-1"
  >
    <div className="text-sm">{icon}</div>
  </a>
);
