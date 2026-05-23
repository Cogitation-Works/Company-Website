import { IoMdTrendingUp } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { LuEye } from "react-icons/lu";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { CiBank } from "react-icons/ci";
import { BiFirstAid } from "react-icons/bi";
import { SlBag } from "react-icons/sl";
import { GiRobotGrab } from "react-icons/gi";
import { RiGraduationCapLine } from "react-icons/ri";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { BsGlobeAmericas } from "react-icons/bs";
import Reveal from "../Reveal";
import Parallax from "../Parallax";

const client = [
  {
    title: "Projects Delivered",
    value: "50+",
    description: "+15% this year",
    icon: <IoMdTrendingUp />,
    color: "text-blue-600",
  },
  {
    title: "Client Satisfaction",
    value: "98%",
    description: "Retention rate",
    icon: <FaRegCheckCircle />,
    color: "text-sky-600",
  },
  {
    title: "Global Hubs",
    value: "2",
    description: "India & Dubai",
    icon: <MdOutlineLocationOn />,
    color: "text-blue-500",
  },
];

const missions = [
  {
    title: "Business Impact",
    description:
      "We prioritize outcomes over outputs. Our success is measured by the growth and efficiency we create for our partners.",
    icon: <HiOutlineRocketLaunch />,
  },
  {
    title: "Radical Transparency",
    description:
      "Honest communication is our baseline. From roadmaps to budgets, we believe in keeping clients fully informed at every stage.",
    icon: <LuEye />,
  },
  {
    title: "Continuous Learning",
    description:
      "The digital landscape shifts daily. We invest heavily in R&D to ensure our clients always benefit from the latest innovations.",
    icon: <HiOutlineBookOpen />,
  },
];

const industries = [
  {
    title: "FinTech",
    icon: <CiBank />,
  },
  {
    title: "HealthTech",
    icon: <BiFirstAid />,
  },
  {
    title: "E-commerce",
    icon: <SlBag />,
  },
  {
    title: "Logistics",
    icon: <GiRobotGrab />,
  },
  {
    title: "EdTech",
    icon: <RiGraduationCapLine />,
  },
  {
    title: "PropTech",
    icon: <LiaHandsHelpingSolid />,
  },
  {
    title: "Energy",
    icon: <AiOutlineThunderbolt />,
  },
  {
    title: "SaaS",
    icon: <BsGlobeAmericas />,
  },
];

const About = () => {
  const withBase = (path: string) =>
    `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
  return (
    <div className="page-shell mt-[6%]">
      <Reveal className="lg:h-[70vh] lg:px-[10%] px-[6%] grid grid-cols-2 gap-8" variant="zoom">
        <div className="lg:col-span-1 hidden lg:block place-items-center">
          <Parallax distance={36} direction="down">
          <img
            className="motion-image size-125 rounded-xl"
            src={withBase("/images/about/about-hero.png")}
            alt="About Us"
            loading="lazy"
            decoding="async"
          />
          </Parallax>
        </div>
        <div className="lg:col-span-1 col-span-2 p-6">
          <h6 className="text-blue-500 md:text-xl text-lg font-extrabold">
            Who We Are
          </h6>
          <h1 className="md:text-6xl text-4xl font-bold mt-4 w-[70%] flex flex-col">
            <span className="text-black">The Team Behind Your</span>
            <span className="text-blue-500">Digital</span>
            <span className="text-black">Transformation</span>
          </h1>
          <p className="text-black/60 md:text-lg text-base font-normal mt-4">
            Empowering businesses with cutting-edge digital solutions and a
            human-centric approach to innovation. We don't just build software;
            we engineer growth.
          </p>
          <div className="mt-6 flex md:flex-row flex-col md:items-center md:justify-start justify-center md:gap-6 gap-4">
            <a
              href="https://calendar.app.google/7gB3fnhRjGCBUptQ6"
              target="_blank"
              rel="noopener noreferrer"
              className="button-glow cursor-pointer md:me-4 rounded-md bg-blue-500 px-8 py-2 text-sm md:text-lg border-3 border-blue-500 font-semibold text-white  transition-scale duration-200 hover:bg-blue-600 hover:scale-95 inline-block text-center"
            >
              Meet the Team
            </a>
            <button
              type="button"
              onClick={() => {
                const element = document.getElementById("Missions");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="button-outline-motion cursor-pointer rounded-md px-8 py-2 text-sm md:text-lg border-3 bg-transparent border-blue-500 font-semibold text-blue-500 transition-scale duration-200 hover:bg-black hover:text-white hover:border-black "
            >
              Our Vision
            </button>
          </div>
        </div>
      </Reveal>
      <Reveal className="impact-strip-wrap mt-[6%] py-8 overflow-hidden lg:overflow-visible">
        <div className="impact-strip scroll-track-sm flex flex-row gap-8 lg:gap-10 w-max hover:[animation-play-state:paused] lg:w-full lg:justify-center">
          {[...client, ...client].map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className={`impact-metric shrink-0 ${i >= client.length ? "lg:hidden" : ""}`}
            >
              <h4 className="text-base font-medium text-slate-500">
                {item.title}
              </h4>
              <h2 className="text-3xl font-black mt-2">{item.value}</h2>
              <div className="flex flex-row items-center mt-2">
                <div className={`text-2xl ${item.color} me-2`}>{item.icon}</div>
                <span className={`text-sm ${item.color}`}>
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal className="lg:mt-[6%] md:mt-[10%] mt-[15%] lg:px-[10%] px-[6%]">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="md:text-4xl text-3xl font-bold">Our Story</h1>
          <div className="text-slate-500/90 indent-10 md:indent:0 font-medium md:text-base text-justify md:text-center text-sm lg:w-[70%] md:w-[90%] w-[95%] lg:mt-8 mt-6">
            <p className="">
              Cogitation Works started its journey with a dual-base strategy in{" "}
              <span className="text-slate-700/90 font-bold">
                India and Dubai
              </span>
              . This unique geographical presence allows us to leverage
              world-class engineering talent while staying at the heart of
              global commercial innovation. Founded with a vision to bridge the
              gap between complex technology and real-world business challenges,
            </p>
            <p className="mt-4 ">
              We are driven by a singular mission: to solve real problems
              through thoughtful engineering and creative design. We don't
              believe in "tech for tech's sake." Every line of code we write and
              every interface we design is measured against the value it brings
              to the end-user and the business.
            </p>
          </div>
        </div>
        <div className="md:flex flex-row justify-center items-center hidden gap-10 mt-15">
          <div className="">
            <Parallax distance={24}>
            <img
              className="motion-image w-[400px] h-auto rounded-lg"
              src={withBase("/images/about/dubai.png")}
              alt="Our Story"
              loading="lazy"
              decoding="async"
            />
            </Parallax>
          </div>
          <div className="">
            <Parallax distance={24} direction="down">
            <img
              className="motion-image w-[400px] h-auto rounded-lg"
              src={withBase("/images/about/vellore.png")}
              alt="Our Story"
              loading="lazy"
              decoding="async"
            />
            </Parallax>
          </div>
        </div>
        <div className="flex flex-col md:hidden mt-15 px-5">
          <div className="motion-card flex flex-col items-center rounded-lg overflow-hidden shadow-md">
            <img
              className="motion-image h-[300px] w-full object-cover"
              src={withBase("/images/about/dubai-hub.png")}
              alt="Our Story"
              loading="lazy"
              decoding="async"
            />
            <h6 className="text-lg py-3 font-bold text-black/85 bg-white w-full text-center">
              Dubai Hub
            </h6>
          </div>
          <div className="motion-card flex flex-col items-center rounded-lg overflow-hidden shadow-md mt-10">
            <img
              className="motion-image h-[300px] w-full object-cover"
              src={withBase("/images/about/vellore-hub.jpg")}
              alt="Our Story"
              loading="lazy"
              decoding="async"
            />
            <h6 className="text-lg py-3 font-bold text-black/85 bg-white w-full text-center">
              Indian Hub
            </h6>
          </div>
        </div>
      </Reveal>
      <Reveal id="Missions" className="mission-section lg:mt-[8%] mt-[90px] px-[10%]">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="md:text-4xl text-3xl font-bold">Missions & Values</h1>
          <span className="h-[5px] bg-blue-500 w-[100px] mt-4"></span>
        </div>
        <div className="mission-track mt-10">
          {missions.map((mission) => (
            <div
              key={mission.title}
              className="mission-track-item"
            >
              <div className="motion-icon mission-track-icon">
                {mission.icon}
              </div>
              <h3 className="text-xl font-bold">{mission.title}</h3>
              <p className="text-slate-500 text-sm">{mission.description}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal className="about-industries lg:mt-[8%] mt-[90px] md:px-[10%] px-5">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="md:text-4xl text-2xl font-bold">
            Industries We Empower
          </h1>
        </div>
        <div className="industry-map mt-10">
          {industries.map((industry) => (
            <div
              key={industry.title}
              className="industry-map-node"
            >
              <div className="motion-icon industry-map-icon">
                {industry.icon}
              </div>
              <h3 className="md:text-lg text-sm font-bold">{industry.title}</h3>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal className="mt-[110px] call-section flex flex-row justify-center items-center gap-12">
        <div className="motion-card lg:h-[400px] px-6 py-8 lg:px-0 lg:py-0 lg:w-[75%] w-[90%] bg-blue-500 flex flex-col items-center justify-center rounded-[35px] shadow-lg">
          <h1 className="lg:text-5xl md:text-4xl text-3xl w-[90%] md:w-[85%] lg:w-full font-extrabold mt-4 text-center text-white">
            Ready to start a conversation ?
          </h1>
          <p className="mt-6 text-white/80 font-normal md:text-lg text-base w-[90%] md:w-[80%] lg:w-[60%] text-center">
            Let's discuss how our team can help you navigate your digital
            transformation journey.
          </p>
          <div className="mt-8 w-full flex md:flex-row flex-col items-center justify-center gap-6">
            <a
              href="https://calendar.app.google/7gB3fnhRjGCBUptQ6"
              target="_blank"
              rel="noopener noreferrer"
              className="button-glow cursor-pointer md:w-[250px] w-[80%] md:w-auto md:me-4 rounded-md bg-white md:px-4 py-2 lg:px-10 lg:py-3 md:text-lg text-sm border-3 border-white/50 font-semibold text-blue-500  transition-scale duration-200 hover:bg-white/90 hover:scale-95 inline-block text-center"
            >
              Schedule a Call
            </a>
            <a
              href="https://calendar.app.google/7gB3fnhRjGCBUptQ6"
              target="_blank"
              rel="noopener noreferrer"
              className="button-outline-motion cursor-pointer md:w-[250px] w-[80%] md:w-auto rounded-md md:px-4 py-2 lg:px-10 lg:py-3 md:text-lg text-sm border-3 bg-transparent border-white/40 font-semibold text-white transition-scale duration-200 hover:bg-black hover:border-black inline-block text-center"
            >
              Book Free Consultation
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default About;

// Projects Delivered
// Client Satisfaction
// Global Hubs
// 50+
// 98%
// 2
// +15% this year
// Retention rate
// India & Dubai
