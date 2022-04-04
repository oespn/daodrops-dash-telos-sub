import Image from "next/image";

type Props = {
  size: string;
};

const Logo = ({ size }: Props) => {
  return (
    <div
      style={{ borderColor: "#C9A6D0" }}
      className="bg-transparent p-1 rounded-full border"
    >
      <div className="rounded-full" style={{ background: "#E6D7E9" }}>
        <div className={"relative " + size}>
          <Image
            src="/images/gold/undraw_updated_resume.svg"
            layout="fill"
            alt="logo"
            className="w-80 h-80 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Logo;
