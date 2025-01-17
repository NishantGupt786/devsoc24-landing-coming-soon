import Image from "next/image";
import { useState, useEffect, SetStateAction } from "react";
import logo from "@/assets/images/logo.svg";
import glitch from "@/assets/images/startglitch.svg";
import title from "@/assets/images/title.svg";
import title2 from "@/assets/images/glitchtitle1.svg";
import title3 from "@/assets/images/glitchtitle2.svg";
import title4 from "@/assets/images/glitchtitle3.svg";
import dotgrid from "@/assets/images/dot_grid.svg";
import face from "@/assets/images/compface.svg";
import type {
  StaticImageData,
  StaticImport,
} from "next/dist/shared/lib/get-img-props";
import NavButton from "../NavButton";
import Button from "../Button";
import Screen from "./Screen";
import { PowerGlitch } from "powerglitch";
import devsoc2k24 from "@/assets/images/DEVSOC24.svg";
import { useTransform, motion, useScroll } from "framer-motion";
import timeline from "@/assets/images/timelinebox.svg";
import { useLenis } from "@studio-freight/react-lenis";
import { IoMdClose } from "react-icons/io";
import Monitor from "../Monitor";

const timelineTexts = [
  "Coming Soon!",
  "Coming Soon!",
  "Coming Soon!",
  "Coming Soon!",
  "Coming Soon!",
  "Coming Soon!",
  "Coming Soon!",
  "Coming Soon!",
];

function Main() {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -2000]);
  const [className, setClassName] = useState("overlaymain");
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const titles = [title, title2, title3, title4];
  const [showBoxes, setShowBoxes] = useState(false);
  const [hoveredBoxIndex, setHoveredBoxIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const intervals = [2000, 400, 600, 400];
    const timer = setTimeout(() => {
      setClassName("min-w-screen overlay_hero bg-span z-50");
    }, 400);

    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, intervals[currentTitleIndex]);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [currentTitleIndex, titles.length]);

  // useEffect(() => {
  //   PowerGlitch.glitch(".glitcheffect");
  //   PowerGlitch.glitch(".box");
  // }, []);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight = 1080;
      const opacity = 1 - 7 * (scrollPosition / pageHeight);
      const newOpacity = Math.min(Math.max(opacity, 0), 1);
      setScrollOpacity(newOpacity);

      const timelineSection = document.getElementById("timeline-section");
      if (timelineSection) {
        const timelinePosition = timelineSection.getBoundingClientRect().top;
        if (timelinePosition < window.innerHeight) {
          setShowBoxes(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    PowerGlitch.glitch(".glitcheffect");
    PowerGlitch.glitch(".box");

    const handleScroll = () => {
      const timelineSection = document.getElementById("timeline-section");
      if (timelineSection) {
        const timelinePosition = timelineSection.getBoundingClientRect().top;
        if (timelinePosition < window.innerHeight) {
          setShowBoxes(true);
          window.removeEventListener("scroll", handleScroll);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleBoxHover = (index: SetStateAction<number>) => {
    setHoveredBoxIndex(index);
    // console.log("");
  };

  const lenis = useLenis(({ scroll }) => {
    // console.log(scroll);
  });

  return (
    <>
      {showModal ? (
        <>
          <div className="fixed z-[100] flex h-screen w-screen items-center justify-center bg-black/60">
            <div className="relative flex h-fit w-fit flex-col items-center justify-between bg-white p-5">
              <div
                className="absolute right-0 top-0 flex min-h-[25px] min-w-[25px] items-center justify-center bg-black/80 hover:bg-black/60"
                onClick={() => toggleModal()}
              >
                <IoMdClose color="white" />
              </div>
              <div>
                <p className="font-disket text-lg">
                  Discord Link Might not work correctly on VIT WIFI.
                </p>
                <p className="font-disket text-lg">
                  Proceed if you are not on VIT WIFI
                </p>
              </div>
              <div className="mt-5">
                <Button
                  link="https://discord.gg/AUHFPXEhjC"
                  data="Join Discord"
                  portal={false}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <motion.div style={{ y: -y }} className="">
        <div style={{ opacity: scrollOpacity }}>
          <div
            className={`${className} font-disket relative flex min-h-screen flex-col items-center justify-center overflow-hidden`}
          >
            <Image src={glitch as StaticImageData} alt="glitch" fill />
            <Image
              src={logo as StaticImport}
              alt="logo"
              width={800}
              className="absolute bottom-0"
            />
          </div>

          <div className="absolute top-6 z-50 m-0 w-full p-0 ">
            <div>
              <div className="flex items-center justify-center ">
                <div className="relative hidden w-[33%] items-center justify-evenly lg:flex">
                  <div
                    onClick={() => {
                      lenis?.scrollTo("#about", { lerp: 0.1, duration: 0.5 });
                    }}
                  >
                    <Image
                      src={dotgrid as HTMLImageElement}
                      alt="dotgrid"
                      height={100}
                      width={100}
                      className="absolute bottom-0 left-[17%] top-[40%] h-auto w-[50px] opacity-70 md:h-min md:w-min"
                    />
                    <NavButton link="/" name="About" />
                  </div>
                  <div>
                    <Image
                      src={dotgrid as HTMLImageElement}
                      alt="dotgrid"
                      height={100}
                      width={100}
                      className="absolute right-[1%] h-auto w-[50px] opacity-70 md:h-min md:w-min"
                    />
                    <div onClick={() => toggleModal()}>
                      <NavButton link="/" name="Discord" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:block ">
                  <div className="flex h-fit w-fit flex-col items-center gap-4 ">
                    <Image
                      src={titles[currentTitleIndex] as string}
                      alt="title"
                    />
                  </div>
                  <div className="mx-auto mt-6 flex justify-evenly lg:hidden">
                    <div
                      className="hidden lg:block"
                      onClick={() => {
                        lenis?.scrollTo("#about", { lerp: 0.1, duration: 0.5 });
                      }}
                    >
                      <NavButton link="/" name="About" />
                    </div>

                    <div className="lg:hidden">
                      <NavButton link="https://portal.devsoc.codechefvit.com/" name="Register" />
                    </div>
                    <div onClick={() => toggleModal()}>
                      <NavButton link="/" name="Discord" />
                    </div>
                  </div>
                </div>

                <div className="hidden w-[33%] justify-center lg:flex">
                  <div>
                    <Image
                      src={dotgrid as HTMLImageElement}
                      alt="dotgrid"
                      height={100}
                      width={100}
                      className="absolute bottom-0 left-[65%] top-[2%] h-auto w-[50px] opacity-70 md:h-min md:w-min"
                    />

                    <Button
                      // link="https://portal.devsoc.codechefvit.com/"
                      data="Coming Soon..."
                      portal={true}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2 flex flex-col items-center ">
                {/* <p>Co-hosted by:</p>
                <Image
                  src="/assets/sponsors/contentstack.svg"
                  alt="contentstack"
                  height={0}
                  width={0}
                  className="h-[30px] w-auto"
                /> */}
              </div>
            </div>
            <div className="flex h-screen justify-center overflow-hidden lg:justify-between 2xl:mt-12">
              <motion.div
                className="hidden lg:block"
                style={{ willChange: "transform" }}
                animate={{
                  y: [
                    0,
                    300, // Move 300 units vertically downwards
                    0,
                  ],
                  opacity: [0, 0.8, 0],
                  transition: {
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                <Image
                  src={face as HTMLImageElement}
                  alt="computer face"
                  width={300}
                  className="glitcheffect"
                />
              </motion.div>
              {/* <div className="absolute z-40 my-12 flex w-screen items-center justify-center sm:my-0"> */}
              <div className="z-40 my-12 sm:my-0">
                <Screen text="Hack Time" />
                {/* <Monitor /> */}
              </div>
              <motion.div
                className="hidden lg:block"
                style={{ willChange: "transform" }}
                animate={{
                  y: [0, 300, 0],
                  opacity: [0.8, 0, 0.8],
                  transition: {
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                <div className="flip">
                  <Image
                    src={face as HTMLImageElement}
                    alt="computer face"
                    width={300}
                    className="glitcheffect"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div className="relative" id="about">
        <div className="flex h-fit items-center justify-center bg-[#020202]">
          <div className="font-disket min-w-screen overflow-hidden bg-[#020202]">
            <motion.span style={{ y: y }} className="relative block">
              <Image
                className="absolute left-60 top-[1100px]"
                src={dotgrid as HTMLImageElement}
                alt="dotgrid"
                height={100}
                width={100}
              />
            </motion.span>
            <motion.span style={{ y: y }} className="relative block">
              <Image
                className="absolute left-[1160px] top-[1300px]"
                src={dotgrid as HTMLImageElement}
                alt="dotgrid"
                height={100}
                width={100}
              />
            </motion.span>
            <div className="h-fit w-full flex-wrap overflow-hidden">
              <div className="mt-48 flex w-full justify-center max-sm:mt-10">
                <Image
                  className="mx-20"
                  src={devsoc2k24 as HTMLImageElement}
                  alt="devsoc"
                  quality={100}
                />
              </div>
              <div className="flex w-full justify-center">
                <div className="mx-10 mt-10  h-fit  text-center leading-relaxed text-[#bbbbbb] max-sm:text-justify md:text-[22px] lg:w-[70vw]">
                  DEVSOC, THE FLAGSHIP ANNUAL EVENT BY CODECHEF-VIT, AIMS TO
                  EMPOWER YOUNG MINDS BY FOSTERING COLLABORATION BETWEEN TECH
                  ENTHUSIASTS AND INNOVATORS. IN ITS SIXTH ITERATION, THIS
                  HACKATHON IS DESIGNED AS A SPRINT-LIKE EVENT, ENCOURAGING
                  PARTICIPANTS TO UNLEASH THEIR CREATIVITY AND TEAMWORK TO SOLVE
                  CHALLENGES. SPANNING THREE DAYS, RUNNING FOR 48 HOURS
                  STRAIGHT, DEVSOC WILL TAKE PLACE FROM MARCH 17TH TO 19TH,
                  2024, AT THE ANNA AUDITORIUM, VELLORE INSTITUTE OF TECHNOLOGY,
                  VELLORE. AS A FREE AND OPEN SOURCE SOFTWARE (FOSS) EVENT,
                  DEVSOC ADDS AN EXTRA DIMENSION TO ITS ETHOS OF COLLABORATION
                  AND INNOVATION.
                </div>
              </div>
              <div
                className="mt-14 flex w-full justify-center max-sm:mt-3"
                onClick={() => {
                  lenis?.scrollTo(3800, { lerp: 0.1, duration: 1 });
                }}
              >
                <Button data="Learn More" portal={false} />
              </div>
              <div
                className="container mb-32 flex h-fit flex-wrap items-center justify-center gap-10 text-center max-xl:pt-16 max-md:pt-4 max-sm:pt-32 max-[415px]:pt-4 xl:pt-32"
                id="timeline-section"
              >
                {/* {showBoxes &&
                  Array.from({ length: 8 }).map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className={`glitcheffect relative flex flex-col justify-start`}
                      onMouseEnter={() => handleBoxHover(index)}
                      onMouseLeave={() => setHoveredBoxIndex(-1)}
                    >
                      <Image
                        src={timeline as HTMLImageElement}
                        alt="dsd"
                        className="glitcheffect size-40 max-sm:size-28"
                      />
                      <div className="absolute left-0 top-0 flex h-full  w-full items-center justify-center text-[#bbbbbb]">
                        <p className="pb-4">{timelineTexts[index]}</p>
                      </div>
                    </motion.div>
                  ))} */}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Main;
