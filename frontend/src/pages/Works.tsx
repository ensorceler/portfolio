//import {Image} from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Loader2 } from "lucide-react";

interface Work {
  id: string;
  title: string;
  image: string;
  description: string;
  type?: string;
  workDetailId?: string;
  //workDetailId:string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (data?.status === 200) {
    //console.log("data");
    //console.log("data", data);
    return data?.data;
  } else {
    throw new Error("500");
  }
};

export default function WorksPage() {
  //const [workState, setWorkState] = useState<Work[]>([]);

  const { data: workData, error, isLoading } = useSWR(`/api/works`, fetcher);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }} // Start off-screen above
      animate={{ y: 0, opacity: 1 }} // Slide in to the normal position
      transition={{ duration: 1.2, ease: "easeInOut" }} // Animation duration and easing
      className="w-full h-full"
    >
      <section>
        <div className="flex items-end gap-2 mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            height="24"
            width="24"
          >
            <g className="" transform="translate(0,0)">
              <path
                d="M413.375 69.906L336.937 191.47l-8.25-32.69-30.218 88.97 62.655-29.375.22 29.438 127.03-50.938-70.813-1.97 47.782-68.686-73.47 39.25 21.5-95.564zM210.22 102.094l-32 14.406 16.874 55.656-177.813 80.03 12.564 27.876L207.656 200l30.406 49.47 49.313-22.19-21.344-70.343-55.81-54.843zM197.593 266.78v20.345h-88.906c15.994 38.807 51.225 65.43 88.906 74.28v32.97h58.562c-12.118 30.528-33.505 55.684-58.47 77.594H172.22v18.686H456.56V471.97h-27.406c-28.734-21.895-50.055-47.018-61.625-77.595h63.658v-29.188c19.748-6.995 39.5-19.51 59.25-36.687-19.812-17.523-39.23-27.25-59.25-31.938v-29.78H197.594z"
                fill="#FEF3C6E5"
              ></path>
            </g>
          </svg>
          <h2 className="text-xl font-medium underline underline-offset-4 decoration-4 font-medieval dark:text-heading">
            Works
          </h2>
        </div>
        {workData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6">
            {workData?.map(
              (work) =>
                work?.type === "work" && (
                  <div key={work.id} className="rounded-lg overflow-hidden">
                    <Link
                      to={`/works/${work.id}`}
                      state={{ workDetailId: work?.workDetailId ?? null }}
                      className="block"
                    >
                      <div className="relative w-full h-48 rounded-lg">
                        <img
                          src={work?.image}
                          // alt={"https.co/800x400"}
                          alt={`https://placehold.co/800x400/333/white?text=${work?.title}`}
                          className="rounded-lg object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-center mb-2 font-manuscript dark:text-title">
                          {work.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-neutral-400 text-left md:text-center">
                          {work.description}
                        </p>
                      </div>
                    </Link>
                  </div>
                )
            )}
          </div>
        )}
        {isLoading && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="min-h-screen w-full h-full flex flex-col items-center justify-center"
          >
            <Loader2 className="w-10 h-10 text-neutral-400 animate-spin mb-4" />
            <p className="text-sm font-medieval dark:text-neutral-400">
              Loading work details...
            </p>
          </motion.div>
        )}
      </section>

      <section className="mt-16 max-w-xl ml-auto mr-auto">
        <div className="flex items-end gap-2 mb-8">
          <svg
            fill="#FEF3C6E5"
            viewBox="0 -336 1557 1557"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier"></g>
            <g id="SVGRepo_tracerCarrier"></g>
            <g id="SVGRepo_iconCarrier">
              <title>Asset 1</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path d="M158,885V812H0v73Zm1099,0V812H300v73Zm300,0V812H1399v73ZM1240,394a238.81563,238.81563,0,0,1,14.5,24q7.5,14,8.5,21,2.00005,12-5.5,32T1240,498q-51.99995,30-147,28T935,498q-26-11-45.5-37.5T870,393q0-64,51-130L779,0,636,263l13,19q13,18,25.5,50.5T687,393q0,41-19.5,67.5T622,498q-63,26-158,28T317,498q-10-7-18-27t-6-32q3-15,31-56L239,239,199,391,300,763h957l101-372-40-152-85,144Z"></path>{" "}
                </g>
              </g>
            </g>
          </svg>
          <h2 className="text-xl font-medieval font-medium  underline underline-offset-4 decoration-4  dark:text-heading">
            Projects
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workData &&
            workData?.map(
              (collab) =>
                collab.type === "project" && (
                  <div key={collab.id} className="rounded-lg overflow-hidden ">
                    <Link
                      to={`/works/${collab.id}`}
                      className="block"
                      state={{ workDetailId: collab?.workDetailId ?? null }}
                    >
                      <div className="relative w-full h-40 overflow-hidden">
                        <img
                          src={collab?.image}
                          // alt={"https.co/800x400"}
                          alt={`https://placehold.co/800x400/333/white?text=project`}
                          //style={{objectFit: 'cover'}}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold font-manuscript text-center mb-2 dark:text-title">
                          {collab.title}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-left">
                          {collab.description}
                        </p>
                      </div>
                    </Link>
                  </div>
                )
            )}
        </div>
      </section>
    </motion.div>
  );
}
