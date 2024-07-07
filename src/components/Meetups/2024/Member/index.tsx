import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type MemberProps = {
  name: string;
  role: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  image: string;
};

export default function Member({ name, role, image }: MemberProps) {
  return (
    <Link
      className="flex min-w-[250px] max-w-[250px] flex-1 flex-col items-center justify-center hover:scale-[1.01]"
      href="#"
      rel="external noopener nofollow"
      target="_blank"
    >
      <div className="relative flex w-full flex-1 cursor-pointer flex-col items-center justify-center rounded-md bg-white/10 p-[1px] transition-all">
        <div className="flex w-full flex-1 flex-col justify-between gap-2 rounded-md bg-[#000214]/50 px-6 py-5 transition">
          <span>
            <figure className="flex items-center justify-center">
              <img
                alt={name}
                className="h-56 w-56 rounded-md bg-white object-cover transition"
                loading="lazy"
                src={image}
              />
            </figure>
          </span>
          <div className="flex flex-col gap-4">
            <span className="flex flex-col gap-1.5">
              <h3 className="mt-3 font-bold text-white">{name}</h3>
              <p className="text-sm text-sky-200">{role}</p>
            </span>
            <span className="flex flex-row gap-2">
              <FaGithub className="text-[24px] text-white hover:scale-105" />
              <FaLinkedin className="text-[24px] text-white hover:scale-105" />
              <FaXTwitter className="text-[24px] text-white hover:scale-105" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
