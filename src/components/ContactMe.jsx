import { AiFillFacebook, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
const Contactme = () => {
  return (
    <div className="w-[100%] mt-auto flex gap-2 justify-center bg-sky-500 p-4">
      <p className="text-green-300 text-lg md:text-2xl font-bold">
        <span className="text-teal-400 text-2xl md:text-4xl font-bold">
          Contact
        </span>
        me
      </p>
      <a
        href="https://m.facebook.com/khai.lek.5264"
        target="blank"
        className="cursor-pointer select-non text-3xl md:text-4xl text-gray-50 hover:text-gray-400 transition ease-in duration-300"
      >
        <AiFillFacebook />
      </a>
      <a
        href="https://www.linkedin.com/in/jl-khai-635328278/"
        target="blank"
        className="cursor-pointer select-none text-3xl md:text-4xl  text-gray-50 hover:text-gray-400 transition ease-in duration-300"
      >
        <AiFillLinkedin />
      </a>
      <a
        href="https://github.com/JlKhai"
        target="blank"
        className="cursor-pointer select-none text-3xl md:text-4xl  text-gray-50 hover:text-gray-400 transition ease-in duration-300"
      >
        <AiFillGithub />
      </a>
    </div>
  );
};

export default Contactme;
