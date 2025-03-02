import {useEffect} from "react";
import {Link, NavLink} from "react-router";
import ThemeToggle from "../ui/ThemeToggle.tsx";
import NavMenu from "./NavMenu.tsx";


export default function Nav() {
    //const [isMenuOpen, setIsMenuOpen] = useState(false);
    //const [mounted,setMounted]
    useEffect(() => {
        console.log("nav is mounted");
    }, []);

    return (
        <nav
            className="fixed top-0 z-10 w-full h-14 bg-white/60 backdrop-blur-lg dark:bg-neutral-950/50 dark:backdrop-blur-lg">
            <div className="max-w-xl h-full mx-auto flex justify-between items-center py-4 px-3">
                <div className="flex flex-row gap-6 items-center">
                    <NavLink to="/" className="mr-4 flex items-center gap-2">
                        <svg fill="#f5f5f5"
                             version="1.1" id="Layer_1"
                             xmlns="http://www.w3.org/2000/svg"
                             height="24"
                             width="24"
                             viewBox="0 0 260 260">
                            <g id="SVGRepo_bgCarrier"></g>
                            <g id="SVGRepo_tracerCarrier"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M199.02,231.09c-13.25-57.48-90.49-86.23-108.58-107.12c-9.3-10.74-6.97-22.15-1.16-28.29c6.24-6.58,18.13-7.88,27-2.09 c7.76,5.05,22.86,19.06,26.25,24.23c3.39,5.16,3.35,9.43,5.17,12.9c2.07,3.9,6.75,5.98,13.53,3.95c6.28-1.87,9.75-4.35,9.75-4.35 s-6.56-0.25-9.16-3.94c0,0-9.1-19.95-12.36-28.11c10.43,2.77,17.05,5.97,21.68,8.89c0.57,4.44-1.32,12.09-1.4,12.43 c0.21-0.12,3.58-2.11,8.59-7.1c0.25,0.21,0.5,0.41,0.74,0.6c1.77,1.41-1.49,12.56-1.49,12.56s6.12-4.11,10.8-9.67 c4.05-4.79,7.46-10.87,7.46-10.87s-13.25-5.6-19.36-15.3c-6.13-9.69-0.79-20.21-0.79-20.21s-10.22-3.28-18.78-15.62 c-9-12.98-5.52-28.93-5.52-28.93c-7.32,2.94-13.74,17.5-13.74,17.5s-18.49-9.87-42.51-6.8C73.47,35.69,53.33,22.55,44.97,1.8 c0,0-6.47,28.39,18.04,46.26c-1.33,0.9-2.66,1.85-3.99,2.87c-11.96,6.81-27.15,6.41-38.85-1.79c0,0,0.62,4.26,2.9,9.38 c2.28,5.11,6.21,11.09,12.84,14.53c0.71,0.37,1.41,0.67,2.1,0.93c-1.38,2.2-2.66,4.48-3.81,6.82C27.67,91.76,14.56,97.3,2,94.02 c0,0,6.59,12.03,18.41,13.5c2.73,0.34,5.11-0.07,7.15-0.88c-0.1,4.98,0.15,9.64,0.71,14.06c-0.3,9.68-6.83,18.27-16.35,20.99h-0.01 c0,0,9.18,5.46,17.68,1.78c1.66-0.72,2.94-1.7,3.93-2.79c6.98,16.86,19.64,30.46,35.78,45.97c4.33,4.17,9.19,8.63,14.12,13.28 c48.5,2.8,85.22,24.51,116.32,57.87C200.72,250.56,201.44,241.58,199.02,231.09z M147.91,70.11l13.72,13.65l-21.9-7.9L147.91,70.11z M181.003,133.297c0,0,6.706,6.836,16.005,8.195c-0.628,3.718-1.577,5.572-1.577,5.572s15.96,12.85,35.508,4.572 c-0.902,10.276-13.643,14.81-13.643,14.81S230.983,183.407,258,173c-14.657,19.075-36.539,13.759-49.848,6.944 C196.19,173.819,180.788,155.727,181.003,133.297z"></path>
                            </g>
                        </svg>
                        <p className="text-lg font-dragon font-medium dark:text-neutral-100">Shakil</p>
                    </NavLink>
                    <Link to="/works"
                          className="text-lg hover:underline hover:underline-offset-2 hover:decoration-2  hidden md:inline font-manuscript dark:text-neutral-200">
                        works
                    </Link>
                    <Link to="/posts"
                          className="text-lg hover:underline hover:underline-offset-2 hover:decoration-2  hidden md:inline font-manuscript dark:text-neutral-200">
                        posts
                    </Link>
                    <a
                        href="https://github.com/ensorceler"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-1 text-sm hover:underline hover:underline-offset-2 hover:decoration-2 dark:text-neutral-200"
                    >
                        <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"
                             height="18" width="18"
                             fill="#fff"
                        >
                            <g id="SVGRepo_bgCarrier"></g>
                            <g id="SVGRepo_tracerCarrier"></g>
                            <g id="SVGRepo_iconCarrier"><title>github [#142]</title>
                                <desc>Created with Sketch.</desc>
                                <defs></defs>
                                <g id="Page-1" stroke="none">
                                    <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)"
                                       fill="#fff">
                                        <g id="icons" transform="translate(56.000000, 160.000000)">
                                            <path
                                                d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                                                id="github-[#142]"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <p className="font-manuscript text-lg">source</p>
                    </a>
                </div>
                <div className="flex items-center gap-1">
                    <ThemeToggle/>
                    <NavMenu/>
                </div>
            </div>
        </nav>
    );
}