import { motion } from "framer-motion";
import Link from "next/link";

export const MenuItem = ({
  icon,
  label,
  active = false,
  danger = false,
  logoutBtn,
  onClick,
  user,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  danger?: boolean;
  logoutBtn?: () => void;
  onClick?: () => void;
  user: any;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={logoutBtn}
    className={`flex items-center gap-3  p-2 md:p-3 rounded-lg cursor-pointer transition  text-xs md:text-base${
      active ? "" : ""
    } ${danger ? "text-red-500 hover:bg-red-100" : "hover:bg-gray-100"}`}
  >
    {label === "Applied Job" ? (
      <Link className="flex gap-3" href="/jobSeeker/my-applications">
        <div className="text-xl">{icon}</div>
        <span>{label}</span>
      </Link>
    ) :label==="Wishlist"? (
      <Link className="flex gap-3" href="/jobSeeker/saved-jobs">
        <div className="text-xl">{icon}</div>
        <span>{label}</span>
      </Link>
    ) : label === "My Profile" ? (
      user?.role == "JOB_SEEKER" ? (
        <>
          {" "}
          <Link className="flex gap-3" href="/jobSeeker/my-profile">
            <div className="text-xl">{icon}</div>
            <span>{label}</span>
          </Link>
        </>
      ) : (
        <>
          {" "}
          <Link className="flex gap-3" href="/my-profile">
            <div className="text-xl">{icon}</div>
            <span>{label}</span>
          </Link>
        </>
      )
    ) : label === "Find Your Job" ? (
      <Link className="flex gap-3" href="/jobSeeker/home">
        <div className="text-xl">{icon}</div>
        <span>{label}</span>
      </Link>
    ) : (
      <>
        <div className="text-xl">{icon}</div>
        <span>{label}</span>
      </>
    )}
  </motion.div>
);
