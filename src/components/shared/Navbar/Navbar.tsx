"use client";
import Logo from "@/components/ui/MainLogo";
import SearchSection from "@/components/ui/SearchSection";
import { clearTokens } from "@/lib/tokenUtils";
import { useGetMeQuery } from "@/redux/features/auth/auth";
import { logOut } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaBriefcase, FaSearch, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import DeleteModal from "./DeleteModal";
import { MenuItem } from "./MenuItem";
import MobileMenu, { profileVariants } from "./MobileMenu";
import { LanguageSwitcher } from "@/components/context/LanguageSwitcher";

type NavItem = {
  name: string;
  href: string;
};

type NavbarProps = {
  navItem: NavItem[];
};

export default function Navbar({ navItem }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchView, setSearchView] = useState(true);
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
    const targetRoutes = ["/", "/jobSeeker/home", "/jobs", "/jobSeeker/job-details", "/jobSeeker/job-details/:id"];
    const isDynamicRoute = /^\/jobSeeker\/job-details\/.+$/.test(pathname);
    if (targetRoutes.includes(pathname) || isDynamicRoute) {
      setSearchView(true);
    } else {
      setSearchView(false);
    }
    refetch();
    if (user) {
      setIsLogned(true);
    }
  }, [pathname, user]);

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
    window.location.href = "/";

    setTimeout(() => router.push("/"), 100);
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
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40 ">
      <div className="container py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"}>
          <Logo
            width={200}
            height={200}
            className="max-w-[153px] max-h-[72px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 items-center text-sm font-medium text-gray-700">
          <button
            onClick={() => handleSearch()}
            className={`flex items-center gap-2 px-6 py-3 bg-primary text-white rounded hover:bg-neutral-900 transition whitespace-nowrap cursor-pointer ${searchView ? "hidden" : "block"
              }`}
          >
            <FaSearch />
            Search
          </button>
          <span
            className={`w-0.5 h-6 bg-gray-300 ${searchView ? "hidden" : "inline-block"
              }`}
          ></span>
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
          <LanguageSwitcher />
          <div className="relative" ref={menuRef}>
            {isLogned ? (<button
              onClick={toggleMenu}
              className="flex items-center gap-2 cursor-pointer"
            >
              <p className="flex items-center  transition-all duration-300">

                <>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <LuUser className="size-9 bg-primary hover:bg-green-700 transition-all duration-300 cursor-pointer rounded-full p-2 text-white mr-2" />
                  </motion.div>
                  {user?.fullName}
                </>
              </p>
            </button>) : (
              <Link

                href={"/signIn"}
                className="px-3 py-1.5 xl:px-6 xl:py-3 bg-primary text-white text-xs xl:text-sm font-medium hover:cursor-pointer rounded hover:bg-white hover:text-black hover:border-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300 whitespace-nowrap"
              >
                Sign In
              </Link>
            )}


            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={profileVariants}
                  className="absolute top-12 -right-0 min-w-[120px] bg-white/50 backdrop-blur-xl rounded-xl z-50 border border-gray-200"
                >
                  {isLogned && (
                    <motion.div
                      onClick={() => setShowMenu(false)}
                      className="w-72   p-4 space-y-2 "
                    >
                      <MenuItem
                        user={user}
                        icon={<FaUser />}
                        label="My Profile"
                      />
                      <div className="border-b border-gray-300 my-2"></div>
                      {
                        user?.role === "JOB_SEEKER" && <div>     <MenuItem
                          user={user}
                          icon={<FaSearch />}
                          label="Find Your Job"
                          active
                        />
                          <div className="border-b border-gray-300 my-2"></div>
                          <MenuItem
                            user={user}
                            icon={<FaBriefcase />}
                            label="Applied Job"
                          />
                          <div className="border-b border-gray-300 my-2"></div>
                          <MenuItem
                            user={user}
                            icon={<FaBriefcase />}
                            label="Wishlist"
                          />
                          <div className="border-b border-gray-300 my-2"></div></div>
                      }

                      <MenuItem
                        user={user}
                        icon={<FaSignOutAlt />}
                        label="Log Out"
                        danger
                        logoutBtn={handleLogout}
                        onClick={() => setShowDeleteModal(true)}
                      />
                    </motion.div>
                  )}
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
        <MobileMenu
          handleLogout={handleLogout}
          hiddenMenuByClick={hiddenMenuByClick}
          isLogned={isLogned}
          menuRef={menuRef}
          mobileMenuOpen={mobileMenuOpen}
          navItem={navItem}
          setMobileMenuOpen={setMobileMenuOpen}
          setShowMenu={setShowMenu}
          showMenu={showMenu}
          toggleMenu={toggleMenu}
          user={user}
        />
      </AnimatePresence>

      {animate && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-40 z-5 transition-opacity duration-300"
          onClick={handleSearch}
        ></div>
      )}
      <div
        className={`absolute bg-white border-t-2 border-gray-400 w-full py-12 transform transition-all duration-500 ease-out z-10 ${animate ? "translate-y-0 opacity-100" : "-translate-y-250 opacity-0"
          }`}
      >
        <SearchSection setAnimate={setAnimate} animate={animate} />
      </div>

      {/* modal logout */}
      {showDeleteModal && (
        <DeleteModal
          handleDelete={handleDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </nav>
  );
}
