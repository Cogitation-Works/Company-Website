import { FaRegIdCard } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";

const products = [
  {
    icon: <FaRegIdCard />,

    img: "/images/product/hrm.png",
    subtitle: "Workforce Management",
    title: "HRMS & Payroll",
    description:
      "Streamline your workforce management with ease. Eliminate manual entry and reduce errors in your payroll cycles.",
    features: [
      "Mobile attendance with GPS tracking",
      "Automated payroll processing & tax compliance",
      "Employee self-service portal & leave management",
    ],
  },
  {
    icon: <MdOutlineInventory2 />,
    img: "/images/product/inventory.jpg",
    subtitle: "Supply Chain",
    title: "Inventory Management",
    description:
      "Complete control over your supply chain. Optimize your stock levels and reduce holding costs with intelligent tracking.",
    features: [
      "Real-time stock tracking across multiple locations",
      "Integrated asset management & auditing",
      "Automated reordering systems with vendor API",
    ],
  },
  {
    icon: <FaUsers />,
    img: "/images/product/crm.jpg",
    subtitle: "Sales Enablement",
    title: "CRM Solutions",
    description:
      "Close deals faster with a unified sales pipeline. Build stronger relationships with data-driven insights.",
    features: [
      "Visual sales pipeline and deal forecasting",
      "Automated follow-ups and lead scoring",
      "360-degree customer activity history",
    ],
  },
  {
    icon: <RiRobot2Line />,
    img: "/images/product/ai.jpg",
    subtitle: "Future Ready",
    title: "AI Automations",
    description:
      "Scale your operations without adding headcount. Intelligent bots that learn and grow with your business.",
    features: [
      "24/7 intelligent chatbots for customer support",
      "Automated lead nurturing & segmentation",
      "Predictive analytics for operational efficiency",
    ],
  },
];

const Products = () => {
  return (
    <div className="pt-[6%]">
      <div className="text-center flex flex-col items-center">
        <h1 className="lg:text-5xl text-4xl lg:font-black font-bold">
          Our Products
        </h1>
        <p className="lg:w-[70%] w-[90%] lg:mt-6 mt-4 lg:text-xl text-base text-slate-500/95">
          Software Products Built for Modern Operations. Scalable solutions
          designed to streamline your business workflow and drive growth.
        </p>
      </div>
      <div className="mt-[4%] md:px-[10%] px-[5%]">
        {products.map((product, index) => (
          <div
            className="grid grid-cols-14 lg:h-[350px] h-auto my-10 bg-white lg:rounded-lg rounded-[20px] overflow-hidden"
            key={product.title}
            style={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <div
              className={` ${index % 2 === 0 || index == 0 ? "lg:order-1" : "lg:order-2"} lg:col-span-4 col-span-14 h-full w-full min-h-0`}
            >
              <img
                className="object-cover h-full w-full"
                src={product.img}
                alt={product.title}
              />
            </div>
            <div
              className={` ${index % 2 === 0 || index == 0 ? "lg:order-2" : "lg:order-1"} lg:col-span-10 col-span-14 px-[10%] py-8 flex flex-col items-start justify-center`}
            >
              <div className="flex flex-row items-center">
                <div className="text-blue-500 text-2xl me-2">
                  {product.icon}
                </div>
                <h5 className="text-base font-semibold text-blue-500">
                  {product.subtitle}
                </h5>
              </div>

              <h1 className="text-3xl text-black font-bold mt-4">
                {product.title}
              </h1>
              <p className="md:text-base w-[95%] text-[15px] text-black/80 mt-6 md:w-[80%]">
                {product.description}
              </p>
              <ul className="list-disc list-inside text-slate-600 mt-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center mt-1">
                    <FaRegCheckCircle className="text-blue-500 text-xl md:text-[15px] shrink-0 me-3 md:me-2" />
                    <span className="text-slate-500 text-sm md:text-md ">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[110px] call-section flex flex-row justify-center items-center gap-12">
        <div className="lg:h-[400px] px-6 py-8 lg:px-0 lg:py-0 lg:w-[75%] w-[90%] bg-blue-500 flex flex-col items-center justify-center rounded-[35px] shadow-lg">
          <h1 className="lg:text-5xl md:text-4xl text-2xl w-[90%] md:w-[80%] lg:w-full font-extrabold mt-4 text-center text-white">
            Ready to modernize your operations ?
          </h1>
          <p className="mt-6 text-white/80 font-normal md:text-lg text-[14px] w-[90%] lg:w-[60%] text-center">
            Join 500+ companies using Cogitation Works to power their daily
            business processes.
          </p>
          <div className="mt-8 w-full flex md:flex-row flex-col items-center justify-center gap-6">
            <button
              type="button"
              onClick={() =>
                window.open(
                  "https://calendar.app.google/7gB3fnhRjGCBUptQ6",
                  "_blank",
                )
              }
              className={`cursor-pointer md:w-[250px] w-[80%] md:w-auto md:me-4 rounded-md bg-white md:px-4 py-2 lg:px-10 lg:py-3 md:text-lg text-sm border-3 border-white/50 font-semibold text-blue-500  transition-scale duration-200 hover:bg-white/90 hover:scale-95`}
            >
              Book a Free Consultation
            </button>
            <button
              type="button"
              onClick={() =>
                window.open(
                  "https://calendar.app.google/7gB3fnhRjGCBUptQ6",
                  "_blank",
                )
              }
              className={`cursor-pointer md:w-[250px] w-[80%] md:w-auto rounded-md md:px-4 py-2 lg:px-10 lg:py-3 md:text-lg text-sm border-3 bg-transparent border-white/40 font-semibold text-white transition-scale duration-200 hover:bg-black hover:border-black `}
            >
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Products;
