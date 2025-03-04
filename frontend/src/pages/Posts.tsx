import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

const postsSample = [
  {
    id: "lorem-1",
    title: "Lorem Ipsum Dolor",
    date: "January 4, 2024",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    slug: "lorem-1",
  },
  {
    id: "lorem-2",
    title: "Sed Ut Perspiciatis",
    date: "December 11, 2023",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    slug: "lorem-2",
  },
  {
    id: "lorem-3",
    title: "Nemo Enim Ipsam",
    date: "July 7, 2021",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut.",
    slug: "lorem-3",
  },
  {
    id: "lorem-4",
    title: "Magni Dolores",
    date: "February 23, 2021",
    description: "Magni dolores eos qui ratione voluptatem sequi nesciunt.",
    slug: "lorem-4",
  },
  {
    id: "lorem-5",
    title: "Neque Porro Quisquam",
    date: "July 13, 2020",
    description:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    slug: "lorem-5",
  },
  {
    id: "lorem-6",
    title: "Consectetur Adipiscing",
    date: "January 11, 2020",
    description:
      "Consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    slug: "lorem-6",
  },
];

export default function PostsPage() {
  const [posts, setPosts] = useState(postsSample);

  const generatePost = () => {
    return {
      id: faker.string.uuid(),
      title: faker.lorem.words({ min: 5, max: 7 }),
      date: faker.date.past().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      description: faker.lorem.paragraphs(1),
      slug: faker.lorem.slug(),
    };
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    //const posts = Array.from({ length: 6 }, generatePost);
    //setPosts((p) => posts);
  }, []);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }} // Start off-screen above
      animate={{ y: 0, opacity: 1 }} // Slide in to the normal position
      transition={{ duration: 1.2, ease: "easeInOut" }} // Animation duration and easing
      className="w-full h-full"
    >
      <div className="flex gap-2 items-end h-max mb-8">
        <svg
          viewBox="0 0 512 512"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier"></g>
          <g id="SVGRepo_tracerCarrier"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill="#FEF3C6E5"
              d="M311.9 47.95c-17.6 0-34.6.7-50.7 2.43L244.6 93.5l-4.9-40.04c-2.5.46-5 .94-7.5 1.47-9.1 1.94-15.1 7.22-20.3 14.87-5.2 7.65-8.9 17.5-12.1 26.6C191 121.5 184 148 178.4 175c6 5.1 12 10.3 17.9 15.4l30.7-17.6 33.8 26.1 51.9-19.7 61 24.5-6.8 16.7-54.4-21.8-54.7 20.7-32.2-24.9-14.9 8.5c19.6 17.3 38.6 34.4 56.5 51.2l14-6.4 33.9 16.1 31.2-13.1 24.2 23.3-12.4 13-15.8-15.1-27.6 11.7-33-15.8c6.9 6.7 13.6 13.2 20.1 19.7l1.7 1.8 19.5 76.3-7.8-5.7-53 .4-38.1-17.8-42.4 14.6-5.8-17 49.2-17 41.1 19.2 24.7-.2-70.7-51.7c-19.7 4.6-39.4 2.8-58.1-3.7-4.2 44.4-5.9 85.7-7 118.7-.4 10.7 2.7 23 7.5 32.5 4.9 9.5 11.7 15.4 15 16.1 5.2 1.2 19 3.2 37.7 5.1l12.4-39 19.1 41.7c16.7 1.2 35 2 53.5 2.2 28.2.3 57.1-.9 82-4.7 15.8-2.3 29.6-6 40.7-10.4-11.8-5.1-21.6-10.6-29.1-16.6-11.1-8.9-18.2-19.3-17.3-30.9v.2c5.4-96.4 10.8-188.8 30.3-286l.1-.4.1-.4c5.3-17.9 17.9-39.86 36.1-55.83-13.9-2.06-28.6-4-43.7-5.66l-22.3 25.3-2.2-27.7c-19-1.64-38.4-2.71-57.4-2.92h-5.7zm148.5 20.44c-4.7 3.69-9.2 8.03-13.3 12.73 12.1 8.18 21.4 23.38 21.8 36.98.3 7.8-1.9 14.9-7.7 21.4-5.8 6.4-15.6 12.4-31.6 15.8l3.8 17.6c18.6-4 32.3-11.5 41.2-21.4 9-9.9 12.7-22.2 12.3-34-.6-19.3-11.1-37.59-26.5-49.11zM25.44 71.91c-.24 1.61-.38 3.43-.38 5.62.1 7.69 2.03 18.17 5.83 30.17 3.41 10.7 8.27 22.5 14.35 34.8 10.63-5.3 20.59-11 28.41-18.1-4.42 12.5-10.15 24.7-18.6 36.5 4.14 7.2 8.63 14.4 13.45 21.5 10.64-5.3 20.72-13 29.52-26.1-3.3 16-8.47 30.6-18.27 41.8 6.53 8.5 13.5 16.8 20.75 24.5 8.7-9.3 15.6-21 20.7-34.9 3.8 18.5 2.6 35.3-5.7 49.4 8 7.2 16.3 13.7 24.8 19.1 6.1-14 8.9-30.6 8.5-49.7 9.2 23.7 11.3 42.9 9.6 59.5 20.2 9.2 40.8 12 61.3 6.1l4.2-1.3 69.3 50.6-5.9-22.8c-73-72.8-175.4-156.7-261.86-226.69zM312.8 123.9l33.2 13.8 31.3-9.9 5.4 17.2-37.5 11.9-33.6-14-28.8 8.1-4.8-17.4zm107.3 236.2c-.7 0-1.3.1-2 .1-3.5.1-7.2.5-11.1 1.3l3.4 17.6c12.2-2.3 20-.4 24.5 2.5 4.4 2.9 6.3 6.8 6.4 12.5.1 9.3-7 23-23.3 32.5 5.4 2.9 11.9 5.9 19.3 8.7 14.4-11.6 22.1-26.8 22-41.4-.1-10.7-5.2-21.2-14.6-27.4-6.7-4.3-15-6.5-24.6-6.4z"
            ></path>
          </g>
        </svg>
        <h2
          className="text-xl font-bold font-medieval underline underline-offset-4 decoration-4
                dark:text-heading"
        >
          My Posts
        </h2>
      </div>
      <div>
        {posts.map((post) => (
          <div key={post.id} className="mb-4">
            <>
              <div className="py-2">
                <a className="text-lg font-manuscript cursor-pointer md:text-xl font-semibold dark:text-title">
                  {post.title}
                </a>
                <p className="text-xs text-neutral-400 dark:text-neutral-600">
                  {post.date}
                </p>
                <p className="text-xs md:text-sm mt-1 dark:text-neutral-400">
                  {post.description}
                </p>
              </div>
            </>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
