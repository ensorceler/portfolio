import {useEffect, useRef, useState} from "react";
import {SunIcon} from "lucide-react";


export default function ThemeToggle() {

    //const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const mountRef = useRef<boolean>(null);
    const changeTheme = (theme: "dark" | "light") => {
        //localStorage.setItem("theme", theme);
        //setTheme(theme);
    }
    useEffect(() => {
        //console.log('theme changed =>', theme);
        if (mountRef.current === null) {
            localStorage.theme = "dark";
            mountRef.current = true;
        }
        document.documentElement.classList.toggle(
            "dark",
            localStorage.theme === "dark"
        );
    }, [theme]);


    return (
        <>
            {
                /*

                <button
                    aria-label="Toggle Dark Mode"
                    type="button"
                    className="w-9 h-9 bg-violet-500 hover:bg-violet-600 rounded-lg dark:bg-orange-200 dark:hover:bg-orange-300 flex items-center justify-center  transition-all cursor-pointer"
                    onClick={() => changeTheme(theme === "dark" ? "light" : "dark")}
                >
                    {theme === 'light' ? (
                        <svg viewBox="0 0 24 24" height="20" width="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                fill="#fff"></path>
                        </svg>
                    ) : (
                        <SunIcon size={18} className="text-black"/>
                    )}
                </button>

                 */
            }

        </>
    );


}