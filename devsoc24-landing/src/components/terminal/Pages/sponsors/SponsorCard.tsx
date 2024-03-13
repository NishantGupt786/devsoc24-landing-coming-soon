import React from "react";
import Image from "next/image";

const SponsorCard = (props: {
  imgsrc: string;
  company: string;
  title: string;
  width: number;
  height: number;
}) => {
  return (
    <div className="w-fit h-fit ">
      <p className="my-2 text-center text-[15px]">{props.title}</p>
      <div className="active:scale-[0.99] h-fit w-fit border-[4px] border-b-white border-l-black border-r-white border-t-black hover:cursor-pointer">
        <div className="h-fit w-fit border-[4px] border-b-[#DFDFDF] border-l-[#808080] border-r-[#DFDFDF] border-t-[#808080]">
          <div className="flex h-fit min-h-[15vh] min-w-[15vh] w-fit flex-col items-center justify-evenly border-[8px] border-[#DFDFDF] bg-white">
            <Image
              src={props.imgsrc}
              alt="sponsor card"
              height={props.height}
              width={props.width}
              className={`m-4 `}
              
            />
            <p className="mb-2">{props.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorCard;
