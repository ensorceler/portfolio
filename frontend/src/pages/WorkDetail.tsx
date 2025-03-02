import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb.tsx";
import {
  ExternalLinkIcon,
  Expand,
  X,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Loader2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import useSWR from "swr";

interface WorkDetails {
  title: string;
  description: string;
  stack: string;
  period?: string;
  website?: string;
  platform?: string;
  blogPost?: {
    title: string;
    link: string;
  };
  tagline?: string;
  images?: string[];
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (data?.status === 200) {
    //console.log("data");
    console.log("work details =>", data);
    return data?.data;
  } else {
    throw new Error("500");
  }
};

export default function WorkDetail() {
  // Object state for work details (can be fetched from an API later)
  const location = useLocation();

  const {
    data: workDetailsData,
    error,
    isLoading,
  } = useSWR(`/api/works/${location?.state?.workDetailId}`, fetcher);

  const workDetailsDataX: WorkDetails = {
    title: "Inkdrop",
    period: "2016 - Present",
    description:
      "A Markdown note-taking app with 100+ plugins, cross-platform and encrypted data sync support. The life-time revenue is more than $1M.",
    website: "https://www.inkdrop.app/",
    platform: "Windows/macOS/Linux/iOS/Android",
    stack: "Node.js, Electron, React Native",
    /*
        blogPost: {
            title: "How I've Attracted The First 500 Paid Users For My SaaS That Costs $5/mo",
            link: "https://blog.inkdrop.app/attracting-first-500-paid-users",
        },
        *
         */
    tagline: "Organizing your Markdown notes made simple",
    // Multiple images for the slider
    images: [
      "https://placehold.co/800x400",
      "https://placehold.co/800x400/333/white?text=Feature+Screenshot",
      "https://placehold.co/800x400/222/white?text=Mobile+Version",
    ],
  };

  const [workDetailState, setWorkDetailState] = useState<WorkDetails>();
  //setWorkDetailState()
  // State for image slider and fullscreen mode
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Refs for the slider
  const sliderRef = useRef(null);
  const modalRef = useRef(null);
  const detailsRef = useRef(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Functions to handle image navigation
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === workDetailsData.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? workDetailsData.images.length - 1 : prevIndex - 1
    );
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Toggle detailed description visibility
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Close fullscreen mode
  const closeFullscreen = (e: any) => {
    if (e) {
      e.stopPropagation();
    }
    setIsFullscreen(false);
  };

  // Handle touch events for swiping
  const onTouchStart = (e: any) => {
    //console.log("onTouchStart", e)
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => {
    //console.log("onTouchMove", e);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: any) => {
    //console.log("onTouchEnd", e);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  const fetchWorkDetail = async () => {
    const workDetailId = location?.state?.workDetailId || "";
    const res = await fetch(`/api/works/${workDetailId}`);
    const data = await res.json();
    if (data?.status === 200) {
      setWorkDetailState(data?.data);
    }
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (isFullscreen) {
        if (e.key === "Escape") {
          closeFullscreen(e);
        } else if (e.key === "ArrowRight") {
          nextImage();
        } else if (e.key === "ArrowLeft") {
          prevImage();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

  // Prevent body scroll when fullscreen is active
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  // Smooth scroll to details section when expanded
  useEffect(() => {
    if (showDetails && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showDetails]);

  if (isLoading) {
    return (
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
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="min-h-screen w-full h-full"
      >
        <div className="border border-neutral-800 dark:border-amber-900/30 rounded-md p-6 bg-neutral-900/20 dark:bg-neutral-900/20 backdrop-blur-sm flex flex-col items-center">
          <AlertCircle className="w-10 h-10 text-amber-600 mb-4" />
          <h2 className="font-manuscript text-lg font-medium dark:text-heading mb-2">
            Failed to load work details
          </h2>
          <p className="text-sm font-light dark:text-neutral-400 mb-4 text-center">
            We couldn't retrieve the information for this project. Please try
            again later.
          </p>
          <NavLink
            to="/works"
            className="px-4 py-2 bg-neutral-800 dark:bg-amber-900/30 hover:bg-neutral-700 dark:hover:bg-amber-900/50 text-neutral-200 dark:text-amber-50/90 rounded-md transition-colors duration-200 text-sm font-medieval"
          >
            Back to Works
          </NavLink>
        </div>
      </motion.div>
    );
  }

  // Use data from API or fallback if necessary
  //const displayData = workDetailsData || fallbackWorkDetails;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="min-h-screen w-full h-full"
    >
      {/* Header Section with Medieval Breadcrumbs */}
      <div className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="text-lg font-medieval dark:text-amber-50/80  hover:dark:text-amber-50"
              >
                <NavLink to={"/works"}>Works</NavLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="dark:text-amber-100" />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <h2 className="font-manuscript text-lg font-medium dark:text-heading">
                  {workDetailsData?.title}
                  <span className="text-xs ml-2 py-1 px-2 bg-neutral-800 dark:bg-amber-900/20 text-neutral-400 dark:text-amber-50/70 rounded-sm font-medieval">
                    {workDetailsData?.period}
                  </span>
                </h2>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Main Content Section with Dragon Theme */}
      <div className=" border border-neutral-800 dark:border-neutral-800 rounded-md p-3 bg-neutral-900/20 dark:bg-neutral-900/20 backdrop-blur-sm">
        {/* Project Image Slider */}
        <div className="mb-6 overflow-hidden rounded-md relative">
          {/* Image container */}
          <div
            className="relative"
            ref={sliderRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={workDetailsData?.images[currentImageIndex]}
              alt={`${workDetailsData?.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {/* Image counter - positioned in the bottom right corner */}
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medieval">
              {currentImageIndex + 1} / {workDetailsData?.images?.length}
            </div>

            {/* Expand button */}
            <button
              onClick={toggleFullscreen}
              className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 p-2 rounded text-white transition-colors duration-200"
              aria-label="Expand image"
            >
              <Expand className="w-3 h-3" />
            </button>

            {/* Navigation buttons for slider */}
            {workDetailsData.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 p-2 rounded-full text-white transition-colors duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 p-2 rounded-full text-white transition-colors duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tagline */}
        <div className="mb-6">
          <h3 className="text-base font-dragon dark:text-neutral-200">
            {workDetailsData.tagline}
          </h3>
        </div>

        {/* Description Section */}
        <div className="mb-6">
          <p className="text-sm font-light dark:text-neutral-400">
            {workDetailsData.description}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          {/* Website Link */}
          <div className="flex items-center flex-wrap text-sm">
            <span className="bg-neutral-800 text-neutral-300 rounded-md px-3 py-1 text-xs font-manuscript">
              WEBSITE
            </span>
            <a
              href={workDetailsData?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center ml-3 text-neutral-400 hover:text-neutral-200 transition-colors duration-200"
            >
              <span className="underline">{workDetailsData?.website}</span>
              <ExternalLinkIcon className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* Platform Section */}
          <div className="flex items-center flex-wrap text-sm">
            <span className="bg-neutral-800 text-neutral-300 px-3 py-1 font-manuscript text-xs">
              PLATFORM
            </span>
            <p className="dark:text-neutral-400 ml-3">
              {workDetailsData?.platform}
            </p>
          </div>

          {/* Tech Stack Section */}
          <div className="flex items-center flex-wrap text-sm">
            <span className="bg-neutral-800 text-neutral-300 px-3 py-1 font-manuscript text-xs">
              TECH STACK
            </span>
            <p className="dark:text-neutral-400 ml-3">
              {workDetailsData?.stack}
            </p>
          </div>

          {/* Blog Post Section */}
          <>
            {workDetailsData?.blogPost && (
              <div className="flex items-center flex-wrap text-sm">
                <span className="bg-neutral-800 text-neutral-300 px-3 py-1 font-manuscript text-xs">
                  BLOG POST
                </span>
                <a
                  href={workDetailsData?.blogPost?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center ml-3 text-neutral-400 hover:text-neutral-200 transition-colors duration-200"
                >
                  <span className="underline">
                    {workDetailsData?.blogPost?.title}
                  </span>
                  <ExternalLinkIcon className="w-4 h-4 ml-1" />
                </a>
              </div>
            )}
          </>
        </div>

        {/* Expandable Detailed Description Section */}
        {(workDetailsData?.detailedDescription ||
          workDetailsData?.keyContributions) && (
          <div
            className="mt-8 border-t border-neutral-800 pt-4"
            ref={detailsRef}
          >
            <button
              onClick={toggleDetails}
              className="w-full flex items-center justify-between py-2 px-1 hover:bg-neutral-800/20 rounded-md transition-colors duration-200 mb-4"
            >
              <span className="font-manuscript text-base dark:text-amber-50/90">
                Project Details & Contributions
              </span>
              {showDetails ? (
                <ChevronUp className="w-5 h-5 dark:text-amber-50/70" />
              ) : (
                <ChevronDown className="w-5 h-5 dark:text-amber-50/70" />
              )}
            </button>

            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="pb-4"
              >
                {workDetailsData?.detailedDescription && (
                  <div className="mb-6">
                    <h4 className="font-dragon text-sm dark:text-amber-50/80 mb-2">
                      Project Overview
                    </h4>
                    <p className="text-sm font-light dark:text-neutral-400 leading-relaxed">
                      {workDetailsData.detailedDescription}
                    </p>
                  </div>
                )}

                {workDetailsData?.keyContributions &&
                  workDetailsData.keyContributions.length > 0 && (
                    <div>
                      <h4 className="font-dragon text-sm dark:text-amber-50/80 mb-3">
                        Key Contributions
                      </h4>
                      <ul className="space-y-2">
                        {workDetailsData.keyContributions.map(
                          (contribution, index) => (
                            <li
                              key={index}
                              className="pl-4 border-l-2 border-amber-900/30 text-sm font-light dark:text-neutral-400"
                            >
                              {contribution}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </motion.div>
            )}
          </div>
        )}
      </div>
      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 bg-black"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Close button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-black/90 p-2 rounded-full text-white transition-colors duration-200"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/70 text-white px-3 py-1 rounded text-sm font-medieval">
            {currentImageIndex + 1} / {workDetailsData.images.length}
          </div>

          {/* Image container */}
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={workDetailsData.images[currentImageIndex]}
              alt={`${workDetailsData.title} - Image ${
                currentImageIndex + 1
              } (fullscreen)`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Navigation buttons for fullscreen */}
          {workDetailsData.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 p-3 rounded-full text-white transition-colors duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 p-3 rounded-full text-white transition-colors duration-200"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
}
