import React, { useEffect, useState } from "react";
import ProgressBar from "../../ProgressBar";
import {
  useCloseStore,
  useMobileTerminalStore,
  useSelectedStore,
  useTerminalStore,
} from "@/store/store";

//Commands
const help = [
  '<span id="command">about</span>',
  '<span id="command">sponsors</span>',
  '<span id="command">prizepool</span>',
  '<span id="command">timeline</span>',
  '<span id="command">tracks</span>',
  '<span id="command">clear: clear the terminal</span>',
  '<span id="command">roles: get role in codechefvit</span>',
  '<span id="command">ls: see directories</span>',
  '<span id="command">cd <directory>: to open the directory</span>',
  '<span id="command">exit: to exit terminal</span>',

  "<br>",
];

const initial = [
  '<span class="" style="margin-bottom:10px;">$User id set to 8y14e9f8</span>',
  '<span class="" style="margin-bottom:10px;">User validated and online...</span>',
  '<span class="" style="margin-bottom:10px;">[[init]]</span>',
  '<span class="" style="margin-bottom:10px;">Retrieving command data...</span>',
  '<span class="" style="margin-bottom:10px;">[complete]</span>',
  '<span class="" style="margin-bottom:10px;">User ip found and indexed:</span>',
  '<div id="dottedLine""></div>',
  '<p class="ascii-art">&nbsp;*******&nbsp;&nbsp;&nbsp;********&nbsp;**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**&nbsp;&nbsp;********&nbsp;&nbsp;&nbsp;*******&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;******&nbsp;</p>',
  '<p class="ascii-art">/**////**&nbsp;/**/////&nbsp;/**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/**&nbsp;**//////&nbsp;&nbsp;&nbsp;**/////**&nbsp;&nbsp;&nbsp;**////**</p>',
  '<p class="ascii-art">/**&nbsp;&nbsp;&nbsp;&nbsp;/**/**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/**/**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//**&nbsp;**&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;</p>',
  '<p class="ascii-art">/**&nbsp;&nbsp;&nbsp;&nbsp;/**/*******&nbsp;//**&nbsp;&nbsp;&nbsp;&nbsp;**&nbsp;/*********/**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/**/**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>',
  '<p class="ascii-art">/**&nbsp;&nbsp;&nbsp;&nbsp;/**/**////&nbsp;&nbsp;&nbsp;//**&nbsp;&nbsp;**&nbsp;&nbsp;////////**/**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/**/**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>',
  '<p class="ascii-art">/**&nbsp;&nbsp;&nbsp;&nbsp;**&nbsp;/**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/**//**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**&nbsp;//**&nbsp;&nbsp;&nbsp;&nbsp;**</p>',
  '<p class="ascii-art">/*******&nbsp;&nbsp;/********&nbsp;&nbsp;&nbsp;//**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;********&nbsp;&nbsp;//*******&nbsp;&nbsp;&nbsp;//******&nbsp;</p>',
  '<p class="ascii-art">///////&nbsp;&nbsp;&nbsp;////////&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;////////&nbsp;&nbsp;&nbsp;&nbsp;///////&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//////&nbsp;&nbsp;</p>',
  `<div id="dottedLine"></div>`,
  '<span class="" style="margin-bottom:10px;">[found] == 1 online & accessible</span>',
  '<span class="" style="margin-bottom:10px;">[anomalies] == 3 detected</span>',
  // '<span class="" style="margin-bottom:10px;">Approximated commands reloaded with </span>',
  // '<span class="" style="margin-bottom:10px;">enhanced network analysis and indexed ip.</span>',
  // '<span class="" style="margin-bottom:10px;">Ready for realtime monitoring</span>',
  // '<span class="" style="margin-bottom:10px;">Loading welcome...</span>',
  // '<span class="" style="margin-bottom:10px;">[complete]</span>',
  '<span class="" style="margin-bottom:10px;">To start with, type <b>help</b> to get all commands</span>',
  `<div id="dottedLine"></div>`,
];
const about = [
  '<span id="command">DEVSOC, the flagship annual event by CodeChef-VIT, aims to empower young minds by fostering collaboration between tech enthusiasts and innovators. In its fourth iteration, this hackathon is designed as a sprint-like event, encouraging participants to unleash their creativity and teamwork to solve challenges. DEVSOC&apos;24 spans three days, running for 48 hours straight, at Anna Auditorium, Vellore Institute of Technology, Vellore. As a free and open-source software (FOSS) event, DEVSOC adds an extra dimension to its ethos of collaboration and innovation.</span><br>',
];

const faqs = [
  '<span id="command">hackathon cost</span>',
  '<span id="command">application process</span>',
  '<span id="command">inexperienced</span>',
  '<span id="command">team size</span>',
  '<span id="command">type `cd faqs` for more details</span>',
  `<br>`,
];

const sponsors = [
  '<span id="command">Title Sponsor: Contentstack</span><br>',
  '<span id="command">Security Sponsor: Armur AI</span><br>',
  '<span id="command">In-Kind Sponsor: Hall of Cricket</span><br>',
  '<span id="command">In-Kind Sponsor: QuillBot</span><br>',
  '<span id="command"> In-Kind Sponsor: Scribbr</span><br>',
];

const timeline = [
  '<span id="command">17th to 19th March</span><br><span id="command"></span><br>',
  '<span id="command">type `cd sponsors` for more details</span><br><span id="command"></span><br>',
];

const tracks = [
  '<ol id="list">',
  '<li id="list">Interactive Engagement (Gamified Solutions)</li>',
  '<li id="list">Eco-Innovations (Sustainable Technology)</li>',
  '<li id="list">Community Building</li>',
  '<li id="list">Future of Work</li>',
  '<li id="list">Ethical Technology</li>',
  '<li id="list">Open Innovation</li>',
  "</ol>,",
  //'<span id="command">Coming Soon</span><br>',
  "<br>",
];

const prizepool = [
  '<span id="command">Printing the Moneyyy!!</span>',
  '<span id="command">More details coming soon...</span>',
  "<br>",
];
const ls = [
  '<span id="command">about</span>',
  '<span id="command">timeline</span>',
  '<span id="command">tracks</span>',
  '<span id="command">prizepool</span>',
  '<span id="command">sponsors</span>',
  '<span id="command">portal</span>',
  '<span id="command">faqs</span>',
  "<br>",
];

const Terminal = () => {
  const { selectedComponent, setSelectedComponent } = useSelectedStore();
  const { setActiveCard } = useCloseStore();
  const { size } = useMobileTerminalStore();
  const { showTerminal, setShowTerminal } = useTerminalStore();

  const toggleTerminal = () => {
    setShowTerminal(!showTerminal);
  };

  // Use States
  const [redProgress, setRedProgress] = useState(0);
  const [greenProgress, setGreenProgress] = useState(0);
  const [blueProgress, setBlueProgress] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  // Use Effect for ProgressBar
  useEffect(() => {
    const interval = setInterval(() => {
      if (redProgress < 40) {
        setRedProgress(redProgress + 0.5);
      } else if (greenProgress < 40) {
        setGreenProgress(greenProgress + 1);
      } else if (blueProgress < 20) {
        setBlueProgress(blueProgress + 1);
      } else {
        setRedProgress(0);
        setGreenProgress(0);
        setBlueProgress(0);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [redProgress, greenProgress, blueProgress]);

  const updateTime = () => {
    setInterval(() => {
      const currentTime = new Date();
      const date = `${currentTime.getDate()}-${currentTime.getMonth() + 1}-${currentTime.getFullYear()}`;
      const time = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
      setDate(date);
      setTime(time);
    }, 1000);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setInputValue(e.currentTarget.value);
      e.currentTarget.value = "";

      // Scroll to the bottom of the content box
      const contentBox = document.getElementById("contentBox");
      if (contentBox) {
        contentBox.scrollTop = contentBox.scrollHeight;
      }
    }
  };

  // UseEffect for processing inputValue
  useEffect(() => {
    const element = document.getElementById("userInput");
    const contentBox = document.getElementById("contentBox");
    if (inputValue !== "") {
      let commandOutput = ""; // Variable to hold the output for the typed command
      switch (inputValue) {
        case "initial":
          commandOutput = initial.join("<br>") + "<br>";
          break;
        case "help":
          commandOutput = help.join("<br>");
          break;
        case "about":
          commandOutput = about.join("<br>") + "<br>";
          break;
        case "faqs":
          commandOutput = faqs.join("<br>") + "<br>";
          break;
        case "timeline":
          commandOutput = timeline.join("<br>") + "<br>";
          break;
        case "sponsors":
          commandOutput = sponsors.join("<br>") + "<br>";
          break;
        case "tracks":
          commandOutput = tracks.join("<br>");
          break;
        case "prizepool":
          commandOutput = prizepool.join("<br>");
          break;
        case "portal":
          commandOutput = "<br>" + "<div>Coming Soon</div>";
          break;
        case "cd about":
          if (selectedComponent != "DEVSOC 2024") {
            commandOutput = "<br>" + "<div>no such file or directory</div>";
          } else {
            setSelectedComponent("About");
            setActiveCard(["DEVSOC 2024", "About"]);
          }
          break;
        case "cd timeline":
          if (selectedComponent != "DEVSOC 2024") {
            commandOutput = "<br>" + "<div>no such file or directory</div>";
          } else {
            setSelectedComponent("Timeline");
            setActiveCard(["DEVSOC 2024", "Timeline"]);
          }
          break;
        case "cd prizepool":
          if (selectedComponent != "DEVSOC 2024") {
            commandOutput = "<br>" + "<div>no such file or directory</div>";
          } else {
            setSelectedComponent("Prizepool");
            setActiveCard(["DEVSOC 2024", "Prizepool"]);
          }
          break;
        case "cd sponsors":
          if (selectedComponent != "DEVSOC 2024") {
            commandOutput = "<br>" + "<div>no such file or directory</div>";
          } else {
            setSelectedComponent("Sponsors");
            setActiveCard(["DEVSOC 2024", "Sponsors"]);
          }
          break;
        case "cd portal":
          if (selectedComponent != "DEVSOC 2024") {
            commandOutput = "<br>" + "<div>no such file or directory</div>";
          } else {
            setSelectedComponent("Portal");
            setActiveCard(["DEVSOC 2024", "Portal"]);
          }
          break;
        case "cd faqs":
          if (selectedComponent != "DEVSOC 2024") {
            commandOutput = "<br>" + "<div>no such file or directory</div>";
          } else {
            setSelectedComponent("FAQs");
            setActiveCard(["DEVSOC 2024", "FAQs"]);
          }
          break;
        case "cd tracks":
          if (selectedComponent != "DEVSOC 2024") {
            commandOutput = "<br>" + "<div>no such file or directory</div>";
          } else {
            setSelectedComponent("Tracks");
            setActiveCard(["DEVSOC 2024", "Tracks"]);
          }
          break;
        case "cd ..":
          if (selectedComponent === "DEVSOC 2024") {
            commandOutput = "<div>In root directory</div>";
          } else {
            setSelectedComponent("DEVSOC 2024");
            setActiveCard(["DEVSOC 2024"]);
          }
          break;
        case "ls":
          if (selectedComponent != "DEVSOC 2024") {
            commandOutput = "<div><br></div>";
          } else {
            commandOutput = ls.join("<br>") + "<br>";
          }
          break;
        case "roles":
          setTimeout(() => {
            window.open(
              "https://www.youtube.com/watch?v=xvFZjo5PgG0",
              "_blank",
              "noreferrer,noopener",
            );
          }, 500);
          break;
        case "clear":
          setOutputValue("");
          setInputValue("");
          return;
        case "exit":
          setOutputValue("");
          setInputValue("");
          toggleTerminal();

          return;
        default:
          commandOutput = "<div>Command not found</div><br>";
          break;
      }
      setOutputValue(`${outputValue}<br>${inputValue}<br><br>${commandOutput}`);
      setInputValue("");
    }
    contentBox!.scrollTop = contentBox!.scrollHeight;
    element?.scrollIntoView({});
  }, [inputValue, outputValue]);

  //   Trigger Initial Render
  useEffect(() => {
    updateTime();
    setInputValue("initial");
  }, []);

  return (
    <div
      // className={`h-[91.5vh] min-w-[95vw] overflow-y-auto overflow-x-hidden bg-[#757575] px-2 md:min-w-[20vw]`}
      className={`lg:h-[92vh]  ${size ? "h-[50vh]" : "h-[30vh]"} min-w-[95vw]  overflow-y-auto overflow-x-hidden bg-[#757575] px-2 font-diatype md:min-w-[20vw]`}
      onClick={() => document.getElementById("userInput")?.focus()}
    >
      <div className="mt-2 flex flex-col gap-2">
        <div>[Network&nbsp;&nbsp;&nbsp;] DotMid://127.0.0.1</div>
        <div>[ID&nbsp;&nbsp;&nbsp;] #ag58aycs</div>
        <div>NEXT XRØ UPGRADE: 100%</div>
        <div>
          [DATE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;] ${date} ${time}
        </div>
        {/* <div>DotMid ALERT LEVEL: 0%</div> */}
        <div className="w-full border-b-[2.5px] border-dashed border-black" />
      </div>
      <div className="my-4">
        <p className="mb-2">Loading Brain</p>
        <ProgressBar
          redProgress={redProgress}
          greenProgress={greenProgress}
          blueProgress={blueProgress}
        />
      </div>
      <div className="mb-4 w-full border-b-[2.5px] border-dashed border-black " />
      <div
        id="contentBox"
        className={`w-full`}
        dangerouslySetInnerHTML={{ __html: outputValue }}
      ></div>
      <div className="flex items-center gap-1 overflow-y-auto">
        <p className="flex-shrink-0">
          devsoc@2024
          {selectedComponent === "DEVSOC 2024"
            ? ""
            : "/" + selectedComponent?.toString().toLowerCase()}{" "}
          ~ %
        </p>
        <input
          type="text"
          id="userInput"
          className="custom-cursor outline- h-5 w-full border-0 border-transparent bg-transparent outline-none"
          onKeyDown={handleEnter}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default Terminal;
