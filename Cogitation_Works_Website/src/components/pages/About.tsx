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

const client = [
  {
    title: "Projects Delivered",
    value: "50+",
    description: "+15% this year",
    icon: <IoMdTrendingUp />,
    color: "text-green-600",
  },
  {
    title: "Client Satisfaction",
    value: "98%",
    description: "Retention rate",
    icon: <FaRegCheckCircle />,
    color: "text-green-600",
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
  return (
    <div className="mt-[6%]">
      <div className="h-[70vh] px-[10%] grid grid-cols-2 gap-8">
        <div className="col-span-1 place-items-center">
          <img
            className="size-125 rounded-xl"
            src="/images/about/about-hero.png"
            alt="About Us"
          />
        </div>
        <div className="col-span-1 p-6">
          <h6 className="text-blue-500 text-sm font-bold">Who We Are</h6>
          <h1 className="text-6xl font-bold mt-4 w-[70%] flex flex-col">
            <span className="text-black">The Team Behind Your</span>
            <span className="text-blue-500">Digital</span>
            <span className="text-black">Transformation</span>
          </h1>
          <p className="text-black/60 text-lg font-normal mt-4">
            Empowering businesses with cutting-edge digital solutions and a
            human-centric approach to innovation. We don't just build software;
            we engineer growth.
          </p>
          <div className="mt-6 flex flex-row items-center gap-6">
            <button
              type="button"
              className={`cursor-pointer me-4 rounded-md bg-blue-500 px-8 py-2 text-lg border-3 border-blue-500 font-semibold text-white  transition-scale duration-200 hover:bg-blue-600 hover:scale-95`}
            >
              Meet the Team
            </button>
            <button
              type="button"
              className={`cursor-pointer rounded-md px-8 py-2 text-lg border-3 bg-transparent border-blue-500 font-semibold text-blue-500 transition-scale duration-200 hover:bg-black hover:text-white hover:border-black `}
            >
              Our Vision
            </button>
          </div>
        </div>
      </div>
      <div className="mt-[6%] bg-blue-300/20 py-8 px-[10%] flex flex-row items-center justify-evenly">
        {client.map((item) => (
          <div
            key={item.title}
            className="flex flex-col justify-center min-w-[300px] p-6 bg-white rounded-lg shadow-md"
          >
            <h4 className="text-md font-medium text-slate-500">{item.title}</h4>
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
      <div className="mt-[6%] px-[10%]">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold">Our Story</h1>
          <p className="mt-4 text-slate-500/90 font-medium text-md w-[70%] mt-10">
            Cogitation Works started its journey with a dual-base strategy in{" "}
            <span className="text-slate-700/90 font-bold">India and Dubai</span>
            . This unique geographical presence allows us to leverage
            world-class engineering talent while staying at the heart of global
            commercial innovation. Founded with a vision to bridge the gap
            between complex technology and real-world business challenges,
          </p>
          <p className="mt-4 text-slate-500/90 font-medium text-md w-[70%]">
            We are driven by a singular mission: to solve real problems through
            thoughtful engineering and creative design. We don't believe in
            "tech for tech's sake." Every line of code we write and every
            interface we design is measured against the value it brings to the
            end-user and the business.
          </p>
        </div>
        <div className="flex flex-row justify-center items-center gap-10 mt-15">
          <div className="">
            <img
              className="w-[400px] h-auto rounded-lg"
              src="/images/about/dubai.png"
              alt="Our Story"
            />
          </div>
          <div className="">
            <img
              className="w-[400px] h-auto rounded-lg"
              src="/images/about/vellore.png"
              alt="Our Story"
            />
          </div>
        </div>
      </div>
      <div className="mt-[8%] px-[10%]">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold">Missions & Values</h1>
          <span className="h-[5px] bg-blue-500 w-[100px] mt-4"></span>
        </div>
        <div className="mt-10 flex flex-row justify-center gap-10">
          {missions.map((mission) => (
            <div
              key={mission.title}
              className="flex flex-col items-start justify-start gap-4 p-6 bg-white rounded-lg shadow-md max-w-[350px]"
            >
              <div className="text-3xl text-blue-500">{mission.icon}</div>
              <h3 className="text-xl font-bold">{mission.title}</h3>
              <p className="text-slate-500 text-sm">{mission.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[8%] px-[10%]">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold">Industries We Empower</h1>
        </div>
        <div className="mt-10 grid grid-cols-4 gap-10 px-[10%]">
          {industries.map((industry) => (
            <div
              key={industry.title}
              className="flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-lg"
              style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
            >
              <div className="text-4xl text-blue-500">{industry.icon}</div>
              <h3 className="text-lg font-bold">{industry.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[110px] call-section flex flex-row justify-center items-center gap-12">
        <div className="h-[350px] w-[65%] bg-blue-500 flex flex-col items-center justify-center rounded-[35px] shadow-lg">
          <h1 className="text-5xl font-extrabold mt-4 text-center text-white">
            Ready to start a conversation ?
          </h1>
          <p className="mt-6 text-white/80 font-normal text-lg w-[60%] text-center">
            Let's discuss how our team can help you navigate your digital
            transformation journey.
          </p>
          <div className="mt-8 flex flex-row items-center gap-6">
            <button
              type="button"
              className={`cursor-pointer me-4 rounded-md bg-white px-10 py-3 text-lg border-3 border-white/50 font-semibold text-blue-500  transition-scale duration-200 hover:bg-white/90 hover:scale-95`}
            >
              Schedule a Call
            </button>
            <button
              type="button"
              className={`cursor-pointer rounded-md px-10 py-3 text-lg border-3 bg-transparent border-white/40 font-semibold text-white transition-scale duration-200 hover:bg-black hover:border-black `}
            >
              Book Free Consultation
            </button>
          </div>
        </div>
      </div>
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
