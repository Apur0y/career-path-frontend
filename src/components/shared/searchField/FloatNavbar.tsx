"use client";
import Logo from "@/components/ui/MainLogo";
import SearchSection from "@/components/ui/SearchSection";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  FaBriefcase,
  FaDownload,
  FaSearch,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { logOut } from "@/redux/features/auth/authSlice";
import { clearTokens } from "@/lib/tokenUtils";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { useGetMeQuery } from "@/redux/features/auth/auth";
import Cookies from "js-cookie";

type NavItem = {
  name: string;
  href: string;
};

type NavbarProps = {
  navItem: NavItem[];
};

export default function FloatNavbar({ navItem }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchView, setSearchView] = useState(false);
  const [isLogned, setIsLogned] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: myUser, refetch } = useGetMeQuery({});

  // ✅ Get auth state from Redux instead of API calls
  const { token } = useAppSelector((state) => state.auth);
  const user = myUser?.data;
  // User is logged in if both user and token exist
  const hiddenMenuByClick = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        hiddenMenuByClick.current &&
        !hiddenMenuByClick.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const targetRoutes = ["/", "/jobSeeker/home", "/jobs"];
    if (targetRoutes.includes(pathname)) {
      setSearchView(true);
    } else {
      setSearchView(false);
    }
    refetch();
    if (user) {
      setIsLogned(true);
    }
  }, [pathname, user]);

  const MenuItem = ({
    icon,
    label,
    active = false,
    danger = false,
    logoutBtn,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    danger?: boolean;
    logoutBtn?: () => void;
    onClick?: () => void;
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

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const menuRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  // ✅ Log current auth state for debugging
  // useEffect(() => {
  //   console.log("🔍 Navbar auth state:", {
  //     hasUser: !!user,
  //     userName: user?.fullName,
  //     hasToken: !!token,
  //     isLogned,
  //   });
  // }, [user, token, isLogned]);

  const handleSearch = () => {
    setAnimate(!animate);
  };

  const handleLogout = () => {
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    Cookies.remove("accessToken");
    refetch();
    clearTokens();
    setIsLogned(false);
    setTimeout(() => setIsLogned(false), 0);
    // Clear Redux auth state
    dispatch(logOut());

    // Clear local component state
    setShowMenu(false);
    setShowDeleteModal(false);

    toast.success("Logged out successfully");
    window.location.reload();

    setTimeout(() => router.push("/"), 100);
  };

  // Animation variants for profile dropdown
  const profileVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95,
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
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"}>
          <div className="flex items-center space-x-2">
            <Logo width={153} height={72} />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 items-center text-sm font-medium text-gray-700">
          {/* <button
            onClick={() => handleSearch()}
            className={`flex items-center gap-2 px-6 py-3 bg-primary text-white rounded hover:bg-neutral-900 transition whitespace-nowrap cursor-pointer ${searchView ? "hidden" : ""
              }`}
          >
            <FaSearch />
            Search
          </button> */}
          {/* <span
            className={`w-0.5 h-6 bg-gray-300 ${searchView ? "hidden" : "inline-block"
              }`}
          ></span> */}
          {Array.isArray(filteredNavItems) &&
            filteredNavItems.map((item, index) => (
              <React.Fragment key={item.name}>
                <Link
                  href={item.href}
                  className="hover:text-primary hover:underline transition-colors duration-200"
                >
                  {item.name}
                </Link>
                {index < filteredNavItems.length - 1 && (
                  <span className="w-0.5 h-6 bg-gray-300 inline-block"></span>
                )}
              </React.Fragment>
            ))}

          <div className="relative" ref={menuRef}>
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
                    {user?.fullName}
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
                  className="absolute top-12 -right-0 min-w-[120px] bg-white/50 backdrop-blur-xl rounded-xl z-50 border border-gray-200"
                >
                  {isLogned ? (
                    <motion.div
                      onClick={() => setShowMenu(false)}
                      className="w-72   p-4 space-y-2 "
                    >
                      <MenuItem icon={<FaUser />} label="My Profile" />
                      <div className="border-b border-gray-300 my-2"></div>
                      <MenuItem
                        icon={<FaSearch />}
                        label="Find Your Job"
                        active
                      />
                      <div className="border-b border-gray-300 my-2"></div>
                      <MenuItem icon={<FaBriefcase />} label="Applied Job" />
                      <div className="border-b border-gray-300 my-2"></div>
                      <MenuItem
                        icon={<FaSignOutAlt />}
                        label="Log Out"
                        danger
                        logoutBtn={handleLogout}
                        onClick={() => setShowDeleteModal(true)}
                      />
                    </motion.div>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
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
                            <MenuItem icon={<FaUser />} label="My Profile" />
                            <div className="border-b border-gray-300 my-2"></div>
                            <MenuItem
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
                                icon={<FaBriefcase />}
                                label="Applied Job"
                              />
                            </Link>
                            <div className="border-b border-gray-300 my-2"></div>
                            <MenuItem
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

      {animate && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-40 z-5 transition-opacity duration-300"
          onClick={handleSearch}
        ></div>
      )}

      {/* modal logout */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-[645px] w-full mx-4 relative">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <div className="p-8 text-center">
              <div className="flex justify-center md:mb-[32px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="195"
                  height="194"
                  viewBox="0 0 195 194"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M42.984 15.3973C42.9545 9.34446 47.6551 4.09249 58.1769 3.88374C68.6987 3.675 75.7219 10.266 74.4644 15.3685C72.8243 22.0266 61.3926 23.8964 61.5785 30.9204C61.6068 31.9885 54.6465 31.8904 54.6465 30.8234C54.4862 23.8269 68.3704 20.4463 68.5803 15.2378C68.7639 10.6714 65.034 8.19597 58.2339 8.19597C53.5096 8.19597 49.5385 10.6299 49.1904 15.3414C49.1311 16.3374 42.989 16.3933 42.9824 15.3961L42.984 15.3973Z"
                    fill="#5F6CAF"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M58.073 34.2422C60.7246 34.2422 62.8776 35.6677 62.8776 37.4238C62.8776 39.1799 60.7246 40.6054 58.073 40.6054C55.4214 40.6054 53.2695 39.1799 53.2695 37.4238C53.2695 35.6677 55.4222 34.2422 58.073 34.2422Z"
                    fill="#5F6CAF"
                  />
                  <path
                    d="M139.097 42.7307C139.354 50.2579 131.8 61.3935 128.585 66.2633L128.571 66.2769C127.825 65.0834 126.388 64.1068 124.136 63.6726C125.642 60.458 128.422 51.018 129.277 47.1116C120.555 38.1054 97.6059 34.5381 95.9511 37.1424C95.612 37.6576 95.3001 38.1869 94.9881 38.7157C84.7748 33.8463 85.195 15.2103 89.8475 12.5645C91.9093 11.3846 94.4725 11.9406 96.887 14.3683C96.9956 12.646 98.7315 9.47214 101.499 9.24128C104.618 8.96968 107.209 11.3846 108.987 15.3329C108.621 12.2677 111.375 8.18514 115.796 9.32431C118.658 10.0569 122.171 18.0458 126.145 22.7251C130.132 27.4443 138.853 36.0303 139.097 42.7307Z"
                    fill="#29263B"
                  />
                  <path
                    d="M108.862 33.0198C108.72 33.0197 108.582 32.9752 108.467 32.8926C108.352 32.81 108.266 32.6935 108.22 32.5593C107.162 29.4432 107.342 24.6138 108.116 21.9281C108.14 21.8425 108.182 21.7626 108.237 21.6929C108.293 21.6233 108.361 21.5652 108.439 21.5221C108.517 21.4791 108.603 21.4517 108.692 21.4418C108.78 21.4318 108.87 21.4394 108.955 21.464C109.041 21.4887 109.121 21.53 109.19 21.5855C109.26 21.641 109.318 21.7098 109.361 21.7877C109.404 21.8657 109.432 21.9514 109.442 22.0399C109.452 22.1284 109.444 22.218 109.419 22.3036C108.699 24.8047 108.561 29.3478 109.504 32.1247C109.539 32.2268 109.549 32.3356 109.533 32.4422C109.517 32.5488 109.476 32.6501 109.413 32.7377C109.35 32.8253 109.268 32.8967 109.172 32.9461C109.076 32.9954 108.97 33.0212 108.862 33.0214V33.0198Z"
                    fill="#686674"
                  />
                  <path
                    d="M102.216 32.9654C102.083 32.9654 101.953 32.9263 101.842 32.8528C101.731 32.7794 101.644 32.675 101.592 32.5526C100.048 28.9777 99.4973 25.0525 99.998 21.1908C100.024 21.0127 100.119 20.8521 100.263 20.7444C100.407 20.6367 100.588 20.5906 100.766 20.6163C100.945 20.6421 101.105 20.7375 101.213 20.8816C101.321 21.0257 101.367 21.2067 101.341 21.3848C100.874 25.0011 101.392 28.6764 102.84 32.023C102.884 32.1261 102.902 32.2385 102.891 32.3501C102.881 32.4617 102.843 32.569 102.782 32.6625C102.72 32.756 102.636 32.8328 102.537 32.8859C102.439 32.939 102.328 32.9669 102.216 32.967V32.9654Z"
                    fill="#686674"
                  />
                  <path
                    d="M96.686 33.2096C96.5781 33.2098 96.4717 33.1842 96.3757 33.1349C96.2796 33.0856 96.1967 33.0141 96.1339 32.9264C93.9471 29.8763 92.9007 26.1321 93.0233 21.797C93.0244 21.7074 93.0435 21.6189 93.0795 21.5368C93.1155 21.4548 93.1676 21.3807 93.2328 21.3192C93.2979 21.2577 93.3748 21.2099 93.4588 21.1786C93.5428 21.1474 93.6322 21.1334 93.7217 21.1374C93.811 21.1397 93.8989 21.1596 93.9804 21.196C94.0619 21.2324 94.1354 21.2846 94.1967 21.3495C94.258 21.4144 94.3059 21.4907 94.3376 21.5742C94.3692 21.6577 94.3841 21.7466 94.3813 21.8358C94.2649 25.9245 95.2004 29.2943 97.2386 32.1368C97.3111 32.2381 97.3543 32.3575 97.3635 32.4817C97.3727 32.606 97.3475 32.7304 97.2907 32.8413C97.2338 32.9522 97.1476 33.0453 97.0413 33.1104C96.9351 33.1755 96.813 33.2101 96.6884 33.2104L96.686 33.2096Z"
                    fill="#686674"
                  />
                  <path
                    d="M94.9868 38.7163C88.7071 49.3909 86.9708 61.7472 87.893 67.1318C89.1273 74.3615 95.7993 78.8844 102.216 78.8844C102.338 81.8549 102.108 86.7584 102.108 86.7584C102.108 86.7584 98.7031 87.4502 94.5119 88.6437C93.1695 113.425 121.585 115.133 130.917 90.8553C127.327 89.2155 123.606 87.8772 119.794 86.8543C119.794 86.8543 119.51 77.1698 120.581 72.3547C126.929 75.5286 130.957 69.9406 128.57 66.2783C127.824 65.0848 126.387 64.1082 124.135 63.674C125.64 60.4594 128.421 51.0194 129.276 47.113C120.554 38.1067 97.6047 34.5395 95.9499 37.1437C95.6107 37.6582 95.2988 38.1874 94.9868 38.7163Z"
                    fill="#FFA775"
                  />
                  <path
                    d="M122.847 70.4656C122.783 70.4656 122.721 70.4477 122.667 70.414C122.613 70.3803 122.57 70.3322 122.542 70.275C122.514 70.2179 122.503 70.1541 122.51 70.0909C122.516 70.0277 122.541 69.9677 122.58 69.9177C123.802 68.3537 125.244 67.5742 126.99 67.5358C127.035 67.533 127.08 67.5395 127.122 67.555C127.164 67.5705 127.203 67.5945 127.235 67.6256C127.268 67.6568 127.294 67.6943 127.311 67.7358C127.328 67.7774 127.337 67.8221 127.336 67.8671C127.337 67.9116 127.329 67.9559 127.313 67.9975C127.297 68.039 127.273 68.0769 127.242 68.1091C127.212 68.1413 127.175 68.1671 127.134 68.185C127.093 68.2029 127.049 68.2127 127.005 68.2136C125.453 68.2481 124.218 68.9221 123.114 70.3352C123.083 70.3759 123.042 70.4088 122.996 70.4314C122.949 70.454 122.898 70.4657 122.847 70.4656Z"
                    fill="#29263B"
                  />
                  <path
                    d="M95.6565 45.8236C94.8679 45.8158 94.092 45.6237 93.3909 45.2625C93.2895 45.2185 93.1981 45.1544 93.1223 45.074C93.0465 44.9935 92.9878 44.8985 92.9499 44.7947C92.912 44.6909 92.8955 44.5804 92.9016 44.4701C92.9077 44.3597 92.9362 44.2517 92.9854 44.1527C93.0345 44.0537 93.1033 43.9658 93.1875 43.8942C93.2717 43.8226 93.3696 43.7689 93.4753 43.7364C93.5809 43.7038 93.6921 43.6931 93.802 43.7049C93.9119 43.7166 94.0182 43.7506 94.1146 43.8048C95.6813 44.5808 97.1933 44.1928 98.8718 42.5772C98.9475 42.4967 99.0387 42.4324 99.1399 42.3882C99.2412 42.3441 99.3504 42.321 99.4608 42.3203C99.5713 42.3197 99.6808 42.3415 99.7825 42.3845C99.8843 42.4274 99.9763 42.4906 100.053 42.5702C100.129 42.6499 100.189 42.7442 100.228 42.8476C100.267 42.9509 100.285 43.0611 100.28 43.1715C100.275 43.2818 100.247 43.39 100.199 43.4895C100.151 43.589 100.084 43.6776 100 43.7501C98.5653 45.131 97.1119 45.8236 95.6565 45.8236Z"
                    fill="#29263B"
                  />
                  <path
                    d="M118.518 49.4043C118.322 49.4039 118.133 49.3331 117.986 49.2048C117.838 49.0766 117.741 48.8995 117.713 48.7059C117.644 48.0697 117.427 47.4585 117.079 46.9212C116.731 46.384 116.263 45.9356 115.711 45.612C115.233 45.3637 114.701 45.2361 114.162 45.2403C113.623 45.2446 113.094 45.3806 112.62 45.6364C112.426 45.7202 112.208 45.726 112.011 45.6526C111.814 45.5793 111.653 45.4324 111.561 45.2429C111.47 45.0533 111.455 44.8357 111.521 44.6357C111.586 44.4357 111.726 44.2687 111.912 44.1698C112.617 43.803 113.401 43.6121 114.196 43.6133C114.991 43.6145 115.774 43.8078 116.478 44.1768C117.256 44.6211 117.919 45.2417 118.413 45.9889C118.908 46.736 119.22 47.5887 119.325 48.4785C119.355 48.6923 119.299 48.9092 119.169 49.0817C119.039 49.2541 118.846 49.3681 118.633 49.3985C118.595 49.4029 118.556 49.4048 118.518 49.4043Z"
                    fill="#29263B"
                  />
                  <path
                    d="M102.365 70.1553C102.284 70.1552 102.206 70.1265 102.145 70.0742C102.084 70.022 102.043 69.9496 102.03 69.8701C101.928 69.376 102.006 68.8616 102.25 68.4199C102.493 67.9781 102.887 67.638 103.359 67.461C104.695 66.924 106.774 67.435 108.164 69.4472C108.216 69.5212 108.235 69.6125 108.219 69.701C108.203 69.7895 108.152 69.8679 108.078 69.919C108.004 69.9701 107.913 69.9897 107.824 69.9735C107.736 69.9572 107.657 69.9065 107.606 69.8325C106.419 68.1125 104.696 67.655 103.612 68.0904C103.281 68.2087 103.006 68.4444 102.837 68.7527C102.669 69.0609 102.62 69.4203 102.7 69.7623C102.714 69.8509 102.692 69.9415 102.64 70.0143C102.587 70.087 102.508 70.1359 102.419 70.1503C102.401 70.1533 102.383 70.155 102.365 70.1553Z"
                    fill="#29263B"
                  />
                  <path
                    d="M99.5432 62.4793C99.5058 62.4793 99.4685 62.4732 99.433 62.4611C99.0404 62.3264 95.5852 61.1007 95.3156 59.4692C95.0382 57.7896 99.3333 49.212 100.559 47.5483C100.612 47.4759 100.692 47.4276 100.781 47.414C100.87 47.4005 100.96 47.4228 101.033 47.4761C101.105 47.5294 101.154 47.6093 101.167 47.6983C101.181 47.7872 101.158 47.8778 101.105 47.9503C99.7163 49.8359 95.7742 58.0825 95.9833 59.3575C96.1385 60.2887 98.3144 61.3603 99.6515 61.8182C99.7272 61.8443 99.7912 61.8965 99.8321 61.9653C99.8731 62.0342 99.8883 62.1153 99.8752 62.1943C99.862 62.2734 99.8213 62.3452 99.7603 62.397C99.6992 62.4489 99.6218 62.4775 99.5417 62.4778L99.5432 62.4793Z"
                    fill="#29263B"
                  />
                  <path
                    d="M149.689 185.916C134.484 190.378 95.3801 192.345 79.9311 186.417L79.3491 130.864L62.0176 123.89C62.0176 123.89 71.5364 100.78 81.709 93.8491C84.8556 91.6926 90.1185 89.8884 94.513 88.6406C93.1705 113.421 121.586 115.13 130.918 90.8522C136.112 93.2124 142.148 96.6982 146.678 101.5C156.565 111.97 149.689 185.916 149.689 185.916Z"
                    fill="#F47C7C"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M113.462 50.7662C114.282 50.9749 114.604 52.4967 114.179 54.1612C113.755 55.8257 112.744 57.0052 111.923 56.7965C111.103 56.5878 110.78 55.0656 111.205 53.4015C111.63 51.7374 112.64 50.5571 113.462 50.7662Z"
                    fill="#29263B"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M96.107 46.8455C96.9291 47.0558 97.2504 48.576 96.8259 50.2405C96.4015 51.905 95.3903 53.0861 94.5689 52.8758C93.7476 52.6655 93.4271 51.1449 93.8515 49.4823C94.276 47.8198 95.2871 46.6364 96.107 46.8439V46.8455Z"
                    fill="#29263B"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M144.081 123.332C144.081 123.332 141.019 114.796 136.186 113.836C131.212 112.846 124.405 117.051 119.114 121.22C114.756 111.735 109.943 99.2268 109.889 94.6628C112.711 88.0113 109.836 82.4582 116.854 76.0725C120.104 73.1156 115.414 68.7304 111.025 73.7166C107.691 77.5046 102.178 77.4247 99.1566 76.8035C93.1356 75.5693 89.8058 71.2031 88.5499 69.4727C84.5244 69.9173 85.3826 74.3145 86.3417 76.2258C84.4184 76.7861 83.5396 80.2148 84.8064 82.3294C83.2668 83.4729 82.5778 85.144 84.4277 88.3869C82.9413 89.8438 83.5082 92.7515 85.1386 94.1824C85.1386 94.1824 89.9199 97.4773 93.1702 98.8838C94.609 109.634 96.8264 120.266 99.805 130.695C90.4154 132.333 79.4156 133.562 79.4156 133.562L79.3721 130.916L63.2003 124.37C59.0099 134.268 56.8576 153.221 66.2759 157.187C74.5721 160.679 89.8275 158.488 106.476 148.534C110.585 156.835 115.682 162.774 121.836 162.78C131.864 162.792 138.437 153.179 138.437 153.179C140.265 147.714 139.407 142.315 135.849 138.284C135.841 138.247 135.837 138.206 135.826 138.173C137.87 138.896 140.862 136.893 140.036 134.743C141.821 135.242 143.346 132.886 143.143 129.388C144.467 128.062 144.78 126.043 144.081 123.332Z"
                    fill="#FFA775"
                  />
                  <path
                    d="M135.927 138.382C135.84 138.382 135.757 138.349 135.694 138.289C135.631 138.229 135.593 138.148 135.588 138.061C135.437 135.258 134.308 132.601 132.035 129.7C131.983 129.629 131.96 129.541 131.972 129.453C131.984 129.366 132.029 129.287 132.099 129.232C132.168 129.178 132.256 129.153 132.344 129.162C132.431 129.171 132.512 129.214 132.568 129.282C134.932 132.298 136.106 135.076 136.266 138.025C136.271 138.115 136.24 138.203 136.18 138.27C136.119 138.337 136.035 138.377 135.945 138.382L135.927 138.382Z"
                    fill="#29263B"
                  />
                  <path
                    d="M140.123 134.812C140.043 134.811 139.966 134.783 139.905 134.732C139.844 134.68 139.803 134.609 139.789 134.53C139.167 130.718 137.278 127.226 134.429 124.617C134.363 124.556 134.325 124.47 134.322 124.38C134.32 124.29 134.353 124.203 134.415 124.138C134.476 124.072 134.562 124.034 134.652 124.031C134.742 124.029 134.829 124.062 134.894 124.124C137.837 126.843 139.794 130.463 140.458 134.415C140.473 134.504 140.452 134.595 140.401 134.668C140.349 134.742 140.27 134.792 140.181 134.807C140.162 134.81 140.142 134.812 140.123 134.812Z"
                    fill="#29263B"
                  />
                  <path
                    d="M143.228 129.738C143.152 129.738 143.078 129.713 143.018 129.665C142.958 129.618 142.916 129.552 142.898 129.477C141.915 125.329 139.947 121.924 137.052 119.358C137.018 119.329 136.991 119.293 136.972 119.253C136.952 119.213 136.941 119.17 136.938 119.125C136.933 119.035 136.963 118.947 137.023 118.88C137.082 118.813 137.166 118.772 137.256 118.766C137.346 118.761 137.434 118.791 137.501 118.851C140.504 121.511 142.542 125.034 143.558 129.321C143.579 129.409 143.564 129.501 143.516 129.577C143.469 129.654 143.394 129.709 143.306 129.73C143.281 129.735 143.254 129.738 143.228 129.738Z"
                    fill="#29263B"
                  />
                  <path
                    d="M127.704 137.353C127.644 137.353 127.585 137.337 127.533 137.307C127.48 137.276 127.437 137.232 127.408 137.18L124.876 132.649C121.282 128.45 109.633 101.631 109.55 94.6634C109.55 94.6167 109.559 94.5703 109.577 94.5272C110.58 92.1604 110.853 89.91 111.118 87.7302C111.601 83.7424 112.058 79.9757 116.627 75.8186C117.413 75.1036 117.745 74.2329 117.539 73.4289C117.424 73.0391 117.205 72.6879 116.906 72.413C116.606 72.1381 116.238 71.95 115.84 71.8688C114.404 71.5258 112.74 72.2785 111.28 73.9372C108.148 77.4964 102.929 77.922 99.0893 77.1324C94.8799 76.2699 91.242 73.7568 88.2765 69.6685C88.2486 69.6325 88.2282 69.5914 88.2165 69.5474C88.2048 69.5035 88.202 69.4576 88.2084 69.4126C88.2148 69.3675 88.2302 69.3242 88.2537 69.2853C88.2771 69.2463 88.3082 69.2125 88.345 69.1857C88.3819 69.159 88.4237 69.14 88.468 69.1298C88.5123 69.1195 88.5583 69.1183 88.6031 69.1262C88.6479 69.1341 88.6906 69.151 88.7288 69.1757C88.7669 69.2005 88.7997 69.2327 88.8252 69.2704C89.8926 70.742 93.1401 75.2207 99.2255 76.4681C100.488 76.7277 106.976 77.8021 110.771 73.4895C112.403 71.6352 114.309 70.8041 115.998 71.2096C116.516 71.319 116.994 71.5678 117.382 71.9292C117.769 72.2905 118.05 72.7507 118.195 73.2602C118.467 74.3155 118.061 75.4306 117.084 76.3199C112.702 80.3074 112.26 83.9527 111.792 87.8117C111.525 90.0171 111.249 92.2962 110.231 94.7255C110.389 101.73 121.896 128.177 125.412 132.229C125.427 132.247 125.44 132.266 125.451 132.286L128 136.847C128.028 136.898 128.043 136.956 128.043 137.016C128.042 137.075 128.026 137.132 127.996 137.183C127.966 137.234 127.924 137.277 127.873 137.306C127.821 137.335 127.763 137.351 127.704 137.351V137.353Z"
                    fill="#29263B"
                  />
                </svg>
              </div>
              <h2 className="text-2xl md:text-4xl font-semibold md:font-bold text-gray-900 mb-2">
                <>
                  Are you sure <br /> Logout your Account?
                </>
              </h2>
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 md:px-6 cursor-pointer md:py-3 py-2 border border-gray-300 bg-gray-200 rounded md:rounded-lg hover:bg-gray-50 transition-colors font-medium text-xs md:text-base"
                >
                  No, Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className={`flex-1 px-2 md:px-6 py-1 md:py-3 rounded md:rounded-lg font-medium bg-red-600 hover:bg-red-800 transition text-white text-xs md:text-base cursor-pointer`}
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
