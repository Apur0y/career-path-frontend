import { AnimatePresence, easeInOut, motion } from "framer-motion";
import Link from "next/link";
import { LuUser } from "react-icons/lu";
import { MenuItem } from "./MenuItem";
import { FaBriefcase, FaDownload, FaSignOutAlt, FaUser } from "react-icons/fa";

// Animation variants for profile dropdown
export const profileVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

const mobileMenuVariants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: easeInOut,
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: easeInOut,
    },
  },
};

type NavItem = {
  name: string;
  href: string;
};

const MobileMenu = ({
  mobileMenuOpen,
  hiddenMenuByClick,
  user,
  navItem,
  setMobileMenuOpen,
  menuRef,
  toggleMenu,
  isLogned,
  setShowMenu,
  handleLogout,
  showMenu,
}: {
  mobileMenuOpen: boolean;
  hiddenMenuByClick: React.RefObject<HTMLDivElement | null>;
  user: any;
  navItem: NavItem[];
  setMobileMenuOpen: (value: React.SetStateAction<boolean>) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  toggleMenu: () => void;
  isLogned: boolean;
  setShowMenu: (value: React.SetStateAction<boolean>) => void;
  handleLogout: () => void;
  showMenu: boolean;
}) => {
  const filteredNavItems = navItem.filter((item) => {
    if (!user || user?.role == "USER") {
      return item.name !== "For Job Seekers" && item.name !== "For Employers";
    }
    if (user?.role === "JOB_SEEKER" && item.name === "For Employers") {
      return false; // Hide "For Employers" for job seekers
    }
    if (user?.role === "EMPLOYEE" && item.name === "For Job Seekers") {
      return false; // Hide "For Employers" for employees
    }
    return true; // Keep all other items
  });

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          ref={hiddenMenuByClick}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={mobileMenuVariants}
          className="md:hidden overflow-hidden"
        >
          <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            {filteredNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-main-green font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="" ref={menuRef}>
              <button
                onClick={toggleMenu}
                className="flex items-center gap-2 cursor-pointer"
              >
                <p className="flex items-center  transition-all duration-300">
                  {isLogned ? (
                    <>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <LuUser className="size-9 bg-primary hover:bg-green-700 transition-all duration-300 cursor-pointer rounded-full p-2 text-white mr-2" />
                      </motion.div>
                      <p className="font-semibold">{user?.fullName}</p>
                    </>
                  ) : (
                    <Link
                      onClick={() => setShowMenu(false)}
                      href={"/signIn"}
                      className="w-full text-left hover:bg-green-600 bg-primary text-white rounded-md px-5 py-2 transition-all duration-200"
                    >
                      Sign In
                    </Link>
                  )}
                </p>
              </button>
              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={profileVariants}
                    className="absolute  top-30 left-17 z-50 bg-white/20 backdrop-blur-xl rounded-xl border border-gray-200"
                  >
                    {isLogned ? (
                      <motion.div onClick={() => setShowMenu(false)}>
                        <div className="w-56   p-2  ">
                          <MenuItem
                            user={user}
                            icon={<FaUser />}
                            label="My Profile"
                          />
                          <div className="border-b border-gray-300 my-2"></div>
                          <MenuItem
                            user={user}
                            icon={<FaDownload />}
                            label="Download My Resume"
                            active
                          />
                          {/* <div className="border-b border-gray-300 my-2"></div> */}
                          <Link href={"/jobSeeker/my-application"}>
                            <div className="border-b border-gray-300 my-2"></div>
                          </Link>
                          <Link href={"/jobSeeker/my-application"}>
                            <MenuItem
                              user={user}
                              icon={<FaBriefcase />}
                              label="Applied Job"
                            />
                          </Link>
                          <div className="border-b border-gray-300 my-2"></div>
                          <MenuItem
                            user={user}
                            icon={<FaSignOutAlt />}
                            label="Log Out"
                            danger
                            logoutBtn={handleLogout}
                          />
                        </div>
                      </motion.div>
                    ) : null}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
