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
        <p className="text-base font-light dark:text-neutral-400">
          Shakil Ahmed is a full-stack software developer based in India, with
          expertise in building scalable web applications and advanced GIS-based
          mapping tools. Proficient in Golang, Node.js, React, and DevOps tools
          like Docker and AWS, he specializes in creating innovative geospatial
          solutions for infrastructure planning, real-time applications, and
          interactive 3D mapping. Passionate about coding and problem-solving,
          Shakil has a proven track record in leading teams and delivering
          high-impact projects.
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
            Art, Music, Drawing, Playing Piano, Reading Books, Machine Learning
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
        </div>
      </section>
    </motion.div>
  );
};
export default HeroSection;
