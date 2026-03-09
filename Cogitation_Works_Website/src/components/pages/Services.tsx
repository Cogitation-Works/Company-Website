import "./styles/services.css";
import { FaStar } from "react-icons/fa6";
import { VscCircuitBoard } from "react-icons/vsc";
import { ImMobile } from "react-icons/im";
import { PiHeadCircuitBold } from "react-icons/pi";
import { BsGlobe } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";
import { RiReactjsLine } from "react-icons/ri";
import { RiNodejsFill } from "react-icons/ri";
import { FaAws } from "react-icons/fa6";
import { IoServerOutline } from "react-icons/io5";
import { TbBrandSwift } from "react-icons/tb";
import { TbBrandFlutter } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";

const services = [
  {
    title: "Mobile App Development",
    description:
      "Building high-performance native and cross-platform mobile applications that provide seamless user experiences across all devices.",
    p1: "React Native & Flutter",
    p2: "API Integration & Microservices",
    p3: "Mobile UI/UX Design",
    icon: <ImMobile />,
  },
  {
    title: "Web App Development",
    description:
      "Scalable, secure, and lightning-fast web applications built with modern frameworks to help your business grow online.",
    p1: "React & Next.js Ecosystem",
    p2: "Progressive Web Apps (PWAs)",
    p3: "API Integration & Microservices",
    icon: <BsGlobe />,
  },
  {
    title: "AI Automation for Business",
    description:
      "Intelligent automation solutions designed to streamline operations, reduce manual work, and accelerate business growth.",
    p1: "Process Automation",
    p2: "Smart Workflows",
    p3: "Custom AI Solutions",
    icon: <PiHeadCircuitBold />,
  },
  {
    title: "IOT Services",
    description:
      "Strategic guidance to help businesses adopt IoT technologies that improve efficiency, visibility, and decision-making.",
    p1: "Automation",
    p2: "Real Time Monitoring",
    p3: "Smart inventory tracking",
    icon: <VscCircuitBoard />,
  },
];

const work = [
  {
    title: "Discovery",
    description:
      "Deep diving into your business goals, target audience, and project requirements to establish a solid foundation..",
  },
  {
    title: "Planning",
    description:
      "Defining the project roadmap, technology stack, architecture design, and sprint timelines for clear execution.",
  },
  {
    title: "Design",
    description:
      "Creating intuitive user interfaces and experiences through wireframing, prototyping, and high-fidelity mockups.",
  },
  {
    title: "Development",
    description:
      "Our expert engineers write clean, scalable code using the latest industry standards and agile methodologies.",
  },
  {
    title: "Testing",
    description:
      "Rigorous quality assurance, automated testing, and security audits to ensure a bug-free and robust solution.",
  },
  {
    title: "Launch",
    description:
      "Final deployment to production environments and ongoing support to ensure long-term platform success.",
  },
];

const code = [
  {
    title: "React",
    icon: <RiReactjsLine />,
  },
  {
    title: "Node.js",
    icon: <RiNodejsFill />,
  },
  {
    title: "AWS",
    icon: <FaAws />,
  },
  {
    title: "PostgreSQL",
    icon: <IoServerOutline />,
  },
  {
    title: "Swift",
    icon: <TbBrandSwift />,
  },
  {
    title: "Flutter",
    icon: <TbBrandFlutter />,
  },
];

const Services = () => {
  return (
    <div>
      <div className="lg:h-[70vh] md:h-[60vh] h-auto w-full overflow-hidden bg-slate-200/50">
        <div className="grid grid-cols-10 h-full">
          <div className="lg:col-span-6 col-span-10 py-15 px-10 md:px-15 md:py-15 h-full flex flex-row items-start justify-center">
            <div className="flex flex-col items-start">
              <h5 className="text-blue-500 bg-blue-200/40 font-bold text-sm p-2 rounded-md">
                Our Expertise
              </h5>
              <h1 className="md:text-[55px] text-4xl md:leading-16 font-bold mt-6 w-full md:w-[90%]">
                What We Do -{" "}
                <span className="text-blue-500 hidden md:block">
                  End-to-End IT Services
                </span>{" "}
                <span className="text-blue-500 block md:hidden">
                  End - to - End IT Services
                </span>{" "}
                That Drive Results
              </h1>
              <p className="text-lg text-gray-600 mt-8  md:w-[80%]">
                We transform complex challenges into elegant digital solutions.
                From conceptualization to deployment, our team ensures your
                technology scales with your vision.
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 hidden lg:block bg-blue-500 h-full">
            <div className="h-full w-full relative">
              <div
                className="absolute h-[95%] w-[95%] z-5 right-0 bottom-0"
                style={{
                  backgroundImage: "url('/images/services/hero-section.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "20% center",
                }}
              >
                <div className="absolute z-10 bg-white rounded-lg shadow-xl shadow-blue-500/100 bottom-[80px] right-5">
                  <div className="flex flex-row items-center py-4 px-3">
                    <h5 className="font-semibold text-black text-2xl">5.0</h5>
                    <div className="flex flex-row ms-3">
                      {Array(5)
                        .fill(0)
                        .map((_, index) => (
                          <FaStar
                            key={index}
                            className="text-blue-500 me-2 text-2xl"
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid place-items-center md:hidden mb-8">
          <img
            className="w-[85%] h-auto object-cover rounded-lg"
            src="images/services/hero-sm.png"
            alt="hero-sm"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 mt-[100px] px-[6%]">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-slate-200/40 md:col-span-1 col-span-2 justify-start p-8 rounded-lg"
          >
            <div className="text-blue-500 inline-block text-4xl mb-4 p-2 bg-blue-200/40 rounded-md">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-black mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <FaRegCheckCircle className="text-blue-500 shrink-0" />
                {service.p1}
              </li>
              <li className="flex items-center gap-2">
                <FaRegCheckCircle className="text-blue-500 shrink-0" />
                {service.p2}
              </li>
              <li className="flex items-center gap-2">
                <FaRegCheckCircle className="text-blue-500 shrink-0" />
                {service.p3}
              </li>
            </ul>
          </div>
        ))}
      </div>
      <div className="h-[600px] mt-[120px] w-full overflow-hidden relative">
        <div className="scroll-track bg-black absolute h-full w-full -z-1">
          {[...Array(2)].map((_, setIndex) =>
            Array.from({ length: 8 }, (_, i) => (
              <img
                key={`${setIndex}-${i}`}
                src={`/images/services/book${i + 1}.png`}
                alt={`book${i + 1}`}
                className="h-full w-[300px] object-contain mx-[2%] shrink-0"
              />
            )),
          )}
        </div>
        <div
          className="h-full w-full relative flex flex-col items-center justify-center z-10"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            backgroundBlendMode: "overlay",
          }}
        >
          <h1 className="text-center text-slate-200 md:leading-15 flex flex-col lg:text-[50px] md:text-5xl text-2xl font-bold w-full lg:w-[50%]">
            <span> Ready to go live ?</span>
            <span>Just hit publish — Your</span>
            <span>Website, With Cogitation Works.</span>
          </h1>
          <button
            className="cursor-pointer bg-blue-600 md:text-3xl text-xl hover:bg-blue-500 text-white font-bold py-2 px-4 md:py-4 md:px-4 rounded-xl mt-[8%] md:mt-[6%] lg:mt-[4%]"
            style={{ boxShadow: "0 0 20px 15px rgba(59, 130, 246, 0.6)" }}
          >
            Book Now
          </button>
        </div>
      </div>
      <div className="mt-[120px] work-section bg-slate-200/50 py-[8%] md:py-[5%]">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold">How We Work</h1>
          <p className="mt-4 text-slate-500/90 font-medium text-md w-[90%] md:w-[80%] lg:w-[40%]">
            Our structured 6-stage delivery model ensures transparency, quality,
            and timely project completion.
          </p>
        </div>
        <div className="mt-[4%] grid grid-cols-6 gap-8 px-[6%]">
          {work.map((item, index) => (
            <div
              className="relative col-span-6 md:col-span-3 lg:col-span-2"
              key={item.title}
            >
              <div className="absolute right-4 top-4 text-blue-500/10 font-black text-5xl">
                {(index + 1).toString().padStart(2, "0")}
              </div>
              <div
                key={item.title}
                className="p-8 rounded-lg shadow-md bg-white/90 "
              >
                <h3 className="text-xl mt-8 font-bold text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="md:mt-[120px] mt-[80px] code-section code-section">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold">Our Core Technology Stack</h1>
        </div>
        <div className="md:px-[15%] px-6 grid grid-cols-12 gap-8 w-full mt-10">
          {code.map((item) => (
            <div
              key={item.title}
              className="col-span-6 md:col-span-4 lg:col-span-2 flex flex-col items-center mt-8"
            >
              <div className="text-4xl p-3 bg-slate-200/50 rounded-xl">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-black/70 mt-4">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[110px] h-[500px] call-section bg-blue-500  bg-blue-500 flex flex-col items-center justify-center">
        <h1 className="md:text-5xl text-4xl font-extrabold mt-4 text-center text-white w-[90%] md:w-[80%] lg:w-full">
          Ready to bring your ideas to life?
        </h1>
        <p className="mt-6 text-white font-normal text-md md:text-lg w-[80%] md:w-[60%] text-center">
          We’re currently taking on new projects and would love to hear from
          you. Schedule a free consultation with our experts today.
        </p>
        <div className="mt-8">
          <button
            type="button"
            className={`cursor-pointer flex flex-row items-center rounded-md bg-white text-md px-6 py-2 md:px-10 md:py-3 md:text-lg border-3 border-white font-semibold text-blue-500  transition-scale duration-200 hover:bg-white/90 hover:scale-95`}
          >
            Book Free Consultation
            <span className="ms-3">
              <FaArrowRightLong />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Services;
