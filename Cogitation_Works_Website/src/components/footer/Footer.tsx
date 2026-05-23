import Reveal from "../Reveal";

const socialLinks = [
  { name: "LinkedIn", link: "https://www.linkedin.com/in/cogitation-works/" },
  { name: "Twitter", link: "https://www.instagram.com/cogitation_works/" },
  { name: "WhatsApp", link: "https://wa.me/919360889434" },
  { name: "Instagram", link: "https://www.instagram.com/cogitation_works/" },
  { name: "Email", link: "mailto:info@cogitationworks.com" },
];

const Footer = () => {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="mt-[100px] min-h-[350px] bg-slate-900 flex flex-row items-center">
      <div className="grid grid-cols-12 gap-8 p-8">
        <Reveal className="lg:col-span-3 md:col-span-6 col-span-12">
          <div className="flex flex-row items-center my-4">
            <img
              className="brand-mark size-12"
              src={`${baseUrl}logo/logo.png`}
              alt="Cogitation Works Logo"
            />
            <h3 className="ms-2 text-lg font-bold text-white">
              Cogitation Works
            </h3>
          </div>
          <p className="text-white/50 font-normal text-[15px] w-[85%] md:w-[80%] lg:w-[78%]">
            Pioneering digital excellence through innovative IT services and
            scalable software solutions for global enterprises.
          </p>
          <p className="text-white/70 font-medium text-[15px] w-[78%] mt-4">
            Dubai | India | Global
          </p>
        </Reveal>

        <Reveal className="lg:col-span-2 md:col-span-6 col-span-12" delay={80}>
          <h3 className="text-lg font-bold text-white my-4">Services</h3>
          <ul className="text-white/50 font-normal text-[14px]">
            {[
              "Custom Software",
              "Mobile App Dev",
              "Cloud Solutions",
              "UI/UX Design",
            ].map((service) => (
              <li
                key={service}
                className="my-4 cursor-pointer transition-colors duration-200 hover:text-white"
              >
                {service}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          className="lg:col-span-2 md:col-span-6 col-span-12"
          delay={140}
        >
          <h3 className="text-lg font-bold text-white my-4">Company</h3>
          <ul className="text-white/50 font-normal text-[14px]">
            {["About Us", "Our Process", "Case Studies", "Contact"].map(
              (item) => (
                <li
                  key={item}
                  className="my-4 cursor-pointer transition-colors duration-200 hover:text-white"
                >
                  {item}
                </li>
              ),
            )}
          </ul>
        </Reveal>

        <Reveal
          className="lg:col-span-2 md:col-span-6 col-span-12"
          delay={200}
        >
          <h3 className="text-lg font-bold text-white my-4">Social</h3>
          <ul className="text-white/50 font-normal text-[14px]">
            {socialLinks.map((link) => (
              <li
                key={link.name}
                className="my-4 cursor-pointer transition-colors duration-200 hover:text-white"
              >
                <a href={link.link} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-3 col-span-12" delay={260}>
          <h3 className="text-lg font-bold text-white my-2 lg:my-4">Connect</h3>
          <p className="text-white/50 lg:mt-6 font-normal text-[12px]">
            (c) 2026 Cogitation Works. All rights reserved.
          </p>
        </Reveal>
      </div>
    </div>
  );
};

export default Footer;
