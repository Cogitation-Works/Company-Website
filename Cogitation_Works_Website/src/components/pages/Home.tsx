import "./styles/Home.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { PiSealCheckBold } from "react-icons/pi";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { FaCode } from "react-icons/fa6";
import { ImMobile } from "react-icons/im";
import { MdInstallDesktop } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdDraw } from "react-icons/md";
import { FaGroupArrowsRotate } from "react-icons/fa6";
import { PiCloudArrowUpBold } from "react-icons/pi";
import { GrUserSettings } from "react-icons/gr";
import { VscCircuitBoard } from "react-icons/vsc";
import { CiBank } from "react-icons/ci";
import { BiFirstAid } from "react-icons/bi";
import { SlBag } from "react-icons/sl";
import { LuFactory } from "react-icons/lu";
import { PiTruckDuotone } from "react-icons/pi";
import { RiGraduationCapLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";

const philosophy = [
  {
    icon: <HiOutlineRocketLaunch />,
    title: "50+",
    description: "Projects Delivered",
  },
  {
    icon: <PiSealCheckBold />,
    title: "98%",
    description: "Satisfaction Rate",
  },
  {
    icon: <PiBuildingOfficeBold />,
    title: "10+",
    description: "Industries Served",
  },
];

const coreServices = [
  {
    bgImg: "/images/home/software.jpg",
    title: "Custom Software",
    description:
      "Bespoke software solutions tailored precisely to your unique business logic and operational needs.",
    icon: <FaCode />,
  },
  {
    bgImg: "/images/home/mobile.jpg",
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile experiences that engage users on iOS and Android devices.",
    icon: <ImMobile />,
  },
  {
    bgImg: "/images/home/website.jpg",
    title: "Website Development",
    description:
      "High-performance web applications built with modern frameworks for scale and speed.",
    icon: <MdInstallDesktop />,
  },
  {
    bgImg: "/images/home/ecommerce.jpg",
    title: "Ecommerce",
    description:
      "Robust online storefronts with secure payment gateways and seamless checkout experiences.",
    icon: <MdOutlineShoppingCart />,
  },
  {
    bgImg: "/images/home/ux.jpg",
    title: "UI/UX",
    description:
      "User-centric design that prioritizes intuitive navigation and beautiful aesthetics.",
    icon: <MdDraw />,
  },
  {
    bgImg: "/images/home/saas.jpg",
    title: "SaaS",
    description:
      "End-to-end SaaS development from architecture to multi-tenant deployment.",
    icon: <FaGroupArrowsRotate />,
  },
  {
    bgImg: "/images/home/cloud.jpg",
    title: "Cloud",
    description:
      "Infrastructure modernization and migration to AWS, Azure, or Google Cloud.",
    icon: <PiCloudArrowUpBold />,
  },
  {
    bgImg: "/images/home/it.jpg",
    title: "IT Consulting",
    description:
      "Strategic technology roadmapping to align your IT infrastructure with business goals.",
    icon: <GrUserSettings />,
  },
  {
    bgImg: "/images/home/iot.jpg",
    title: "IOT",
    description:
      "Connecting the physical world with digital insights through smart device integration.",
    icon: <VscCircuitBoard />,
  },
];

const products = [
  {
    item: "HRMS",
    description: "Employee management, payroll, and performance tracking.",
  },
  {
    item: "Inventory",
    description: "Real-time stock tracking and automated supply chain logs.",
  },
  {
    item: "CRM",
    description: "Pipeline management and automated customer engagement.",
  },
  {
    item: "AI Automations",
    description: "Intelligent workflows to eliminate repetitive manual tasks.",
  },
];

const industries = [
  {
    icon: <CiBank />,
    title: "Banking",
  },
  { icon: <BiFirstAid />, title: "Healthcare" },
  { icon: <SlBag />, title: "Retail" },
  { icon: <LuFactory />, title: "Manufacturing" },
  { icon: <PiTruckDuotone />, title: "Logistics" },
  { icon: <RiGraduationCapLine />, title: "EdTech" },
];

const reviews = [
  {
    img: "/images/home/james.jpg",
    quote:
      "Cogitation Works transformed our legacy systems into a modern SaaS platform. Their engineering depth is unmatched.",
    name: "James Chen",
    title: "CTO, FinStream Global",
  },
  {
    img: "/images/home/sarah.jpg",
    quote:
      "The AI automation tools they built for us reduced our operational costs by 40% in the first quarter alone.",
    name: "Sarah Miller",
    title: "Operations Director, TechFlow Inc.",
  },
  {
    img: "/images/home/david.jpg",
    quote:
      "Responsive, professional, and highly skilled. They truly understand what it means to be a technology partner.",
    name: "David Oh",
    title: "Founder, RetailSync",
  },
];

const Home = () => {
  return (
    <div>
      <div
        className="md:h-[70vh] h-[60vh] w-full py-8 overflow-hidden rounded-b-[40px]"
        style={{
          backgroundImage: `url(${"/images/home/homebg.png"})`,
          backgroundSize: "110%",
          backgroundPosition: "0% 80%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col items-center">
          <h6 className="text-sm  md:mt-0 text-blue-500 bg-blue-300/20 p-3 text-center rounded-lg  md:text-md md:text-black/50 font-medium">
            Full-Spectrum IT Services & Solutions
          </h6>
          <h1 className="text-center text-5xl w-85 mt-8 lg:mt-0 md:text-6xl md:w-[60%] lg:w-full font-bold lg:text-[80px] lg:font-semibold text-black lg:py-4">
            We Craft Your Ideas Into
          </h1>
          <h1 className="text-center text-5xl w-95 font-bold md:text-6xl lg:text-[85px] md:w-[60%] lg:w-full lg:font-semibold text-blue-500">
            Powerful Digital Products
          </h1>
          <p className=" lg:w-[55%] w-[90%] md:w-[70%] lg:text-[22px] text-sm text-gray-600 py-6 lg:py-4 lg:mt-[40px] text-center">
            Cogitation Works delivers end-to-end IT services and software
            solutions that transform how businesses operate, innovate, and grow.
          </p>
          <div className="flex flex-row items-center gap-4 mt-4">
            <button
              type="button"
              className={`me-4 rounded-md bg-blue-500 px-6 py-3 text-sm lg:px-8 lg:py-4 lg:text-lg font-semibold text-white transition-colors transition-scale duration-200 hover:bg-blue-600 hover:scale-95`}
            >
              Get Started
            </button>
            <button
              type="button"
              className={`rounded-md cursor-pointer px-6 py-3 text-sm lg:px-8 lg:py-4 lg:text-lg font-semibold text-black bg-white transition-scale duration-200 hover:bg-black hover:text-white hover:scale-95`}
            >
              View Portfolio
            </button>
          </div>
        </div>
      </div>
      <div className="lg:mt-[100px] mt-2 md:mt-10 px-8 philosophy-section">
        <h3 className="text-blue-500 font-semibold text-md uppercase">
          Our Philosophy
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="lg:col-span-1 col-span-2 flex flex-col items-start">
            <h2 className="text-5xl font-bold text-black">Who We Are</h2>
            <p className="text-gray-600 mt-4 text-lg w-[90%]">
              Thinking Beyond Technology. We don't just write code; we solve
              business problems with engineering excellence.
            </p>
            <button className="mt-8 cursor-pointer flex items-center flex-row rounded-md bg-blue-500 px-6 py-3 text-white font-semibold hover:bg-blue-600">
              Start Your Project
              <span className="ml-2">
                <FaArrowRightLong />
              </span>
            </button>
          </div>
          <div className="lg:col-span-1 col-span-2 flex md:flex-row flex-col md:justify-center lg:justify-normal gap-10 mt-10 lg:mt-0">
            {philosophy.map((item) => (
              <div
                key={item.title}
                className="flex md:flex-col flex-row items-center text-center justify-content cursor-pointer px-6 py-4 rounded-lg"
                style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
              >
                <div className="md:text-4xl text-5xl text-blue-500 p-6">
                  {item.icon}
                </div>

                <div className="flex flex-col md:items-center items-start">
                  <h4 className="text-2xl font-bold text-black">
                    {item.title}
                  </h4>
                  <p className="text-gray-500/70 font-medium mt-2 text-md">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:mt-[150px] mt-20 md:mt-[100px] core-section">
        <div className="flex-col items-center justify-items-center text-center">
          <h1 className="text-4xl font-bold">Core Services</h1>
          <p className="md:mt-2 mt-4 md:w-[100%] w-[90%] text-slate-500/90 font-medium text-md">
            Comprehensive expertise to take your business to the next digital
            level.
          </p>
        </div>
        <div className="mt-8">
          <div className="grid grid-cols-6 gap-8 lg:px-[110px] px-8">
            {coreServices.map((service) => (
              <div
                key={service.title}
                className="lg:col-span-2 md:h-[240px] py-2 md:py-0 col-span-6 md:col-span-3 cursor-pointer flex md:flex-col md:gap-0 gap-4 flex-row justify-center md:items-start items-center px-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105"
                style={{
                  backgroundImage: `url(${service.bgImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "rgba(0, 0, 0, 0.49)",
                  backgroundBlendMode: "overlay",
                }}
              >
                <div className="md:text-3xl text-2xl text-blue-600 md:bg-white/15 bg-white/90 md:p-2 px-2 py-3 rounded-md my-4 ">
                  {service.icon}
                </div>
                <div className="flex flex-col justify-center items-start">
                  <h4 className="text-xl font-semibold text-white md:mt-4">
                    {service.title}
                  </h4>
                  <p className="text-white/80 font-normal md:mt-2 text-sm line-clamp-2 md:line-clamp-none">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:mt-[110px] mt-20 md:mt-[80px] px-8 products-section">
        <h3 className="text-blue-500 font-semibold text-md uppercase">
          Off-The-Shelf
        </h3>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
          <h1 className="text-4xl font-extrabold mt-4 lg:mt-1">
            Ready-to-Deploy Products
          </h1>
          <p className="mt-4 text-slate-500 font-normal text-md lg:w-[40%] w-[90%]">
            Accelerate your business with our pre-built, battle-tested software
            engines designed for rapid integration.
          </p>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.item}
                className="col-span-4 md:col-span-2 lg:col-span-1 relative min-h-[200px] overflow-hidden rounded-2xl shadow-lg"
              >
                <div className="absolute inset-0 -z-1 ps-[100px] bg-blue-800 overflow-hidden text-[100px] p-0 m-0">
                  <h1 className="text-nowrap font-bold text-white m-0 p-0 leading-none opacity-70">
                    {product.item}
                  </h1>
                </div>
                <div className="relative z-5 flex flex-col justify-center h-full w-full px-6 py-4 bg-black/80 p-4">
                  <h4 className="text-xl font-bold text-white">
                    {product.item}
                  </h4>
                  <p className="text-white/50 font-nora mt-4 text-sm">
                    {product.description}
                  </p>
                  <div>
                    <button
                      type="button"
                      className="cursor-pointer mt-8 text-sm flex flex-row items-center hover:text-blue-700 text-blue-500 font-semibold rounded"
                    >
                      Learn More
                      <span className="ms-2">
                        <FaArrowRightLong />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:mt-[110px] mt-20 md:mt-[100px] industries-section">
        <h1 className="text-2xl font-extrabold mt-1 text-center">
          Industries We Serve
        </h1>
        <div className="md:mt-15 mt-10 grid grid-cols-12 md:gap-10 gap-8 px-4 lg:px-[110px]">
          {industries.map((industry) => (
            <div
              key={industry.title}
              className="lg:col-span-2 md:col-span-4 col-span-6 cursor-pointer flex flex-col items-center text-center"
            >
              <div className="text-4xl p-4 rounded-full bg-blue-500 text-white shadow-lg">
                {industry.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{industry.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[110px] reviews-section lg:h-[450px] h-auto bg-blue-300/20 flex flex-col justify-center py-8 lg:py-0">
        <h1 className="text-4xl font-extrabold mt-1 text-center">
          Trusted by Global Leaders
        </h1>
        <div className="mt-15 overflow-hidden w-full">
          <div className="scroll-track flex flex-row gap-8 w-max hover:[animation-play-state:paused]">
            {[...reviews, ...reviews].map((review, i) => (
              <div
                key={`${review.name}-${i}`}
                className="cursor-pointer bg-white flex flex-col justify-center p-6 rounded-lg shadow-md w-[250px] md:w-[350px] lg:w-[300px] shrink-0"
              >
                <div className="flex flex-row">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <FaStar key={index} className="text-yellow-400 me-3" />
                    ))}
                </div>
                <div className="text-gray-700 mt-4 text-sm italic">
                  "{review.quote}"
                </div>
                <div className="flex flex-row items-center justify-start mt-6 w-full">
                  <div>
                    <img
                      src={review.img}
                      alt={review.name}
                      className="md:size-12 size-16 rounded-full object-cover"
                    />
                  </div>
                  <div className="ms-4">
                    <h4 className="text-lg font-bold text-black p-0 m-0 leading-none">
                      {review.name}
                    </h4>
                    <p className="text-gray-500 text-xs md:w-[80%] w-[90%] mt-1">
                      {review.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-[110px] call-section flex flex-row justify-center items-center">
        <div className="lg:h-[380px] py-10 lg:py-0 w-[90%] lg:w-[65%] bg-blue-500 flex flex-col items-center justify-center rounded-[35px] shadow-lg">
          <h1 className="lg:text-5xl text-4xl font-bold lg:font-extrabold lg:mt-4 text-center text-white">
            Ready to Build Something Great ?
          </h1>
          <p className="mt-6 text-white/80 font-normal md:text-lg text-md md:w-[60%] w-[90%] text-center">
            Let's turn your vision into a market-leading digital product. Join
            our 50+ successful clients today.
          </p>
          <div className="mt-8 flex md:flex-row flex-col md:items-center justify-center gap-6">
            <button
              type="button"
              className={`cursor-pointer w-[220px] md:w-auto me-4 rounded-md bg-white md:px-4 py-2 lg:px-10 lg:py-3 text-lg border-3 border-white/50 font-semibold text-blue-500  transition-scale duration-200 hover:bg-white/90 hover:scale-95`}
            >
              Get a Free Quote
            </button>
            <button
              type="button"
              className={`cursor-pointer w-[220px] md:w-auto rounded-md md:px-4 py-2 lg:px-10 lg:py-3 text-lg border-3 bg-transparent border-white/40 font-semibold text-white transition-scale duration-200 hover:bg-black hover:border-black `}
            >
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
