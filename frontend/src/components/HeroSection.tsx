import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { ChevronsRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router";
import TechStack from "./TechStack.tsx";

const HeroSection = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }} // Start off-screen above
      animate={{ y: 0, opacity: 1 }} // Slide in to the normal position
      transition={{ duration: 1.2, ease: "easeInOut" }} // Animation duration and easing
      className="w-full"
    >
      <div className="w-full flex justify-center mb-4">
        {/*
                <div className="relative -top-10 w-max max-w-sm bg-white backdrop-blur-lg rounded-md px-4 py-2 border">
                    <p className="text-xs md:text-sm">Hello, I'm an indie app developer based in India!</p>
                </div>
                     */}
      </div>
      <div className="flex flex-col gap-0">
        <div className="text-2xl font-dragon font-bold font-stretch-extra-expanded dark:text-heading">
          Shakil Ahmed
        </div>
        <p className="text-base font-runic font-light dark:text-neutral-400">
          FullStack Engineer/Developer
        </p>
      </div>
      <section className="mt-4 flex flex-col gap-3">
        <h2 className="text-xl font-bold font-medieval underline underline-offset-8 decoration-4 decoration-neutral-600 dark:text-heading">
          Intro
        </h2>
        <p className="text-base text-justify font-light dark:text-neutral-400">
          Shakil Ahmed is a full-stack software developer based in India, with
          expertise in building scalable web applications and advanced GIS-based
          mapping tools. Proficient in all kinds of full-stack technologies, he
          specializes in creating innovative geospatial solutions for
          infrastructure planning, real-time applications, and interactive 3D
          mapping. Passionate about coding and problem-solving, Shakil has a
          proven track record in leading teams and delivering high-impact
          projects.
        </p>
        <div className="w-full my-3 flex justify-center ">
          <NavLink to="/works">
            <button className="w-max bg-neutral-800 text-amber-100 border border-amber-200/20 flex flex-row items-center gap-2 px-4 py-2 rounded-md text-sm md:text-base cursor-pointer active:scale-95">
              <p
                className={"font-medieval text-lg font-stretch-extra-expanded"}
              >
                My Works
              </p>
              <ChevronsRightIcon />
            </button>
          </NavLink>
        </div>
      </section>
      <TechStack />
      <section className="flex flex-col gap-3 mb-4">
        <h2 className="text-xl font-bold font-medieval underline underline-offset-8 decoration-4 decoration-neutral-600 dark:text-heading">
          I <span className={"text-base"}> 🖤 </span>
        </h2>
        <div>
          <p className="font-light text-sm dark:text-neutral-400">
            Reading Books, Art, Music, Drawing, Anime
          </p>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-4 font-medieval underline underline-offset-8 decoration-4 decoration-neutral-600 dark:text-heading">
          On The Web
        </h2>
        <div className="grid grid-cols-1 gap-0 text-sm">
          <a
            href="https://github.com/ensorceler"
            target="_blank"
            rel="noopener noreferrer"
            className="w-max flex items-center space-x-2 p-2 hover:text-indigo-500 hover:bg-gray-200 hover:rounded-md transition-colors duration-200 dark:text-neutral-500 dark:hover:bg-neutral-800/50 dark:hover:text-amber-100"
          >
            <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            <span>@ensorceler</span>
          </a>
          <a
            href="https://twitter.com/ensorceler_27"
            target="_blank"
            rel="noopener noreferrer"
            className="w-max flex items-center space-x-2 p-2 hover:text-indigo-500 hover:bg-gray-200 hover:rounded-md transition-colors duration-200 dark:text-neutral-500 dark:hover:bg-neutral-800/50  dark:hover:text-amber-100"
          >
            <FontAwesomeIcon icon={faXTwitter} className="w-5 h-5" />
            <span>@ensorceler_27</span>
          </a>
          <a
            href="https://www.linkedin.com/in/shakil-ahmed-73275526b/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-max flex items-center space-x-2 p-2 hover:text-indigo-500 hover:bg-gray-200 hover:rounded-md transition-colors duration-200 dark:text-neutral-500 dark:hover:bg-neutral-800/50  dark:hover:text-amber-100"
          >
            <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
            <span>@Shakil_Ahmed</span>
          </a>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="w-max flex items-center space-x-2 p-2 hover:text-indigo-500 hover:bg-gray-200 hover:rounded-md transition-colors duration-200 dark:text-neutral-500 dark:hover:bg-neutral-800/50 dark:hover:text-amber-100"
          >
            <FontAwesomeIcon icon={faDiscord} className="w-5 h-5" />
            <span>@ensorceler27</span>
          </a>
          <a
            href="https://www.goodreads.com/user/show/160266198-shakil"
            target="_blank"
            rel="noopener noreferrer"
            className="w-max flex items-center space-x-2 p-2 hover:text-indigo-500 hover:bg-gray-200 hover:rounded-md transition-colors duration-200 dark:text-neutral-500 dark:hover:bg-neutral-800/50 dark:hover:text-amber-100"
          >
            <svg
              fill="#737373"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-neutral-500 hover:bg-neutral-800/50 hover:text-amber-100"
            >
              <g id="SVGRepo_bgCarrier"></g>
              <g id="SVGRepo_tracerCarrier"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M 5 5 L 5 27 L 27 27 L 27 5 L 5 5 z M 7 7 L 25 7 L 25 25 L 7 25 L 7 7 z M 15.5 9 C 13.019 9 11 11.243 11 14 C 11 16.757 13.019 19 15.5 19 C 16.921 19 18.175 18.249516 19 17.103516 L 19 18.5 C 19 20.43 17.43 22 15.5 22 C 14.109 22 12.915563 21.178 12.351562 20 L 11.275391 20 C 11.896391 21.742 13.547 23 15.5 23 C 17.981 23 20 20.981 20 18.5 L 20 10 L 19 10 L 19 10.896484 C 18.175 9.7504844 16.921 9 15.5 9 z M 15.5 10 C 17.43 10 19 11.794 19 14 C 19 16.206 17.43 18 15.5 18 C 13.57 18 12 16.206 12 14 C 12 11.794 13.57 10 15.5 10 z"></path>
              </g>
            </svg>
            <span>@shakil goodreads</span>
          </a>
        </div>
      </section>
    </motion.div>
  );
};
export default HeroSection;
