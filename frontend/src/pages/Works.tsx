//import {Image} from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useSWR from "swr";

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
    console.log("data", data);
    return data?.data;
  } else {
    throw new Error("500");
  }
};

export default function WorksPage() {
  //const [workState, setWorkState] = useState<Work[]>([]);

  const { data: workData, error, isLoading } = useSWR(`/api/works`, fetcher);

  //useEffect(() => {}, []);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6">
          {workData &&
            workData?.map(
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
                          src={"https://placehold.co/600x400"}
                          alt={work.title}
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
      </section>

      <section className="mt-16 max-w-xl ml-auto mr-auto">
        <h2 className="text-xl font-medieval font-medium mb-8 underline underline-offset-4 decoration-4  dark:text-heading">
          Projects
        </h2>
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
                          src={"https://placehold.co/600x400"}
                          alt={collab.title}
                          //style={{objectFit: 'cover'}}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold font-manuscript text-center mb-2 dark:text-title">
                          {collab.title}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-gray-400 text-center">
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
