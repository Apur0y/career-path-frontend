import { ReactNode } from "react";

type containerProps = {
  children: ReactNode;
};


const Container = ({ children }: containerProps) => {
  return <div className="max-w-[1420px] mx-auto py-14 md:py-20  px-2 md:px-0">{children}</div>;

}

export default Container;
