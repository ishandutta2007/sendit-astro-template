import navigation from "@data/navigation.json";
import { useRef, useState } from "react";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useKeyPress } from "../../hooks/useKeyPress";
import { useSticky } from "../../hooks/useSticky";

export default function Navigation({ pageUrl }) {
  const isSticky = useSticky();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Use click outside hook to close mobile menu
  const navbarRef = useClickOutside(closeMobileMenu, isMobileMenuOpen);

  // Lock body scroll when mobile menu is open
  useBodyScrollLock(isMobileMenuOpen);

  const [openDropdown, setOpenDropdown] = useState(false);

  // Create refs for dropdown buttons and menus
  const dropdownButtonRefs = useRef({});
  const dropdownMenuRefs = useRef({});

  // Helper functions to get refs (no hooks inside)
  const getDropdownButtonRef = (index) => {
    if (!dropdownButtonRefs.current[index]) {
      dropdownButtonRefs.current[index] = { current: null };
    }
    return dropdownButtonRefs.current[index];
  };

  const getDropdownMenuRef = (index) => {
    if (!dropdownMenuRefs.current[index]) {
      dropdownMenuRefs.current[index] = { current: null };
    }
    return dropdownMenuRefs.current[index];
  };

  // Handle Escape key to close menus and dropdowns
  useKeyPress("Escape", (e) => {
    if (openDropdown !== false) {
      setOpenDropdown(false);
    }
    if (isMobileMenuOpen) {
      closeMobileMenu();
    }
  });

  const handleDropdownClick = (e, index) => {
    if (window.innerWidth >= 1024) return; // lg breakpoint

    e.preventDefault();
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <>
      {/* Skip to content link for accessibility */}
      <button
        onClick={() => {
          console.log("skip to content clicked");
          const mainContent =
            document.getElementById("main-content") ||
            document.querySelector("main") ||
            document.querySelector('[role="main"]') ||
            document.querySelector(".main-content");
          if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
        onKeyDown={(e) => {
          console.log("skip to content clicked");
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const mainContent =
              document.getElementById("main-content") ||
              document.querySelector("main") ||
              document.querySelector('[role="main"]') ||
              document.querySelector(".main-content");
            if (mainContent) {
              mainContent.focus();
              mainContent.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-primary text-secondary px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center gap-2 shadow-lg"
      >
        <svg
          className="w-4 h-4 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
        <span>Skip to main content</span>
        <span className="text-xs opacity-90 ml-2 px-2 py-1 bg-primary rounded border border-primary">
          Hit Enter
        </span>
      </button>

      <header
        className={`fixed z-30 w-full transition-all duration-100 ${isSticky || isMobileMenuOpen ? " bg-white shadow-primary/10 shadow-xl" : ""}`}
        role="banner"
      >
        <nav
          ref={navbarRef}
          className={`mx-auto max-w-[1500px] px-6 pt-8 pb-10 lg:flex lg:px-8 lg:pb-5`}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className=" mx-auto flex items-center justify-between w-full">
            <a
              data-astro-prefetch
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
              href="/"
              aria-label="Go to homepage"
            >
              <img
                data-editable="image"
                data-prop-src="logo"
                data-prop-alt="logo_alt"
                src={navigation.logo}
                alt="Company logo"
                className="h-12 w-auto max-w-[155px]"
              />
            </a>

            <button
              className="p-2 lg:hidden flex items-center justify-center w-10 h-10 bg-transparent border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
              type="button"
              aria-controls="mobile-navigation-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              onClick={toggleMobileMenu}
            >
              <span className={`${isMobileMenuOpen ? "hidden" : "flex"} `}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="3.5"
                    y1="5.5"
                    x2="21.5"
                    y2="5.5"
                    stroke="#292D32"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="4.5"
                    y1="12.5"
                    x2="21.5"
                    y2="12.5"
                    stroke="#292D32"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="11.5"
                    y1="19.5"
                    x2="21.5"
                    y2="19.5"
                    stroke="#292D32"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className={`${isMobileMenuOpen ? "flex" : "hidden"} `}>
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.5 6.5L6.5 21.5"
                    stroke="#292D32"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.5 21.5L6.5 6.5"
                    stroke="#292D32"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            <div
              className={`${isMobileMenuOpen ? "block" : "hidden"} duration-200 transition-all lg:flex grow items-center justify-center absolute lg:relative top-full lg:top-auto left-0 lg:left-auto w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none`}
              id="mobile-navigation-menu"
              role="region"
              aria-label="Navigation menu"
              aria-hidden={!isMobileMenuOpen}
            >
              <ul
                className="lg:flex grid items-center gap-0 lg:gap-1.5 list-none lg:p-0 m-0 mb-6 lg:mb-0"
                role="menubar"
                aria-label="Main navigation links"
                data-editable="array"
                data-prop="nav_items"
              >
                {navigation.nav_items.map((item, i) => {
                  return (
                    <li
                      key={i}
                      className={`relative w-full grid  ${item.dropdown?.length ? "group" : ""}`}
                      role="none"
                      data-editable="array-item"
                    >
                      {item.dropdown?.length ? (
                        <>
                          <button
                            ref={getDropdownButtonRef(i)}
                            id={`dropdown-button-${i}`}
                            className={`block w-full text-left px-10 lg:px-5 py-3 text-2xl lg:text-xl font-normal lg:rounded-lg transition-colors duration-200 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset ${pageUrl?.pathname === item.link || item.dropdown?.some((dropdownItem) => pageUrl?.pathname === dropdownItem.dropdown_link) ? "text-primary" : "text-gray-700"} flex items-center lg:justify-start`}
                            onClick={(e) => {
                              handleDropdownClick(e, i);
                              // Close mobile menu if it's a regular link (not dropdown)
                              if (!item.dropdown || window.innerWidth >= 1024) {
                                closeMobileMenu();
                              }
                            }}
                            onKeyDown={(e) => {
                              // Handle keyboard navigation for dropdown
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleDropdownClick(e, i);
                              } else if (e.key === "ArrowDown") {
                                e.preventDefault();
                                // Open dropdown and focus first item
                                if (openDropdown !== i) {
                                  setOpenDropdown(i);
                                  // Focus first dropdown item after a brief delay
                                  setTimeout(() => {
                                    const menuRef = getDropdownMenuRef(i);
                                    const firstItem =
                                      menuRef.current?.querySelector(
                                        "a:first-child",
                                      );
                                    if (firstItem) firstItem.focus();
                                  }, 50);
                                }
                              }
                            }}
                            role="menuitem"
                            aria-haspopup="true"
                            aria-expanded={openDropdown === i}
                            aria-controls={`dropdown-menu-${i}`}
                          >
                            <editable-text data-prop="text">
                              {item.text}
                            </editable-text>
                            <svg
                              className={`ml-2 w-4 h-4 transition-transform duration-200 ${openDropdown === i ? "rotate-180" : ""}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                          <ul
                            ref={getDropdownMenuRef(i)}
                            id={`dropdown-menu-${i}`}
                            className={`lg:absolute lg:top-full lg:left-0 lg:min-w-[200px] w-full lg:bg-white lg:shadow-lg lg:rounded-lg lg:border lg:border-gray-200 transition-all duration-250 z-50 px-0 ${
                              openDropdown === i
                                ? "block lg:opacity-100 lg:visible lg:translate-y-0"
                                : "hidden lg:block lg:opacity-0 lg:invisible lg:translate-y-1"
                            } lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:translate-y-0`}
                            role="menu"
                            aria-labelledby={`dropdown-button-${i}`}
                            aria-hidden={openDropdown !== i}
                          >
                            <div data-editable="array" data-prop="dropdown">
                              {item.dropdown.map((dropdown_item, j) => {
                                return (
                                  <li
                                    key={j}
                                    className=""
                                    role="none"
                                    data-editable="array-item"
                                  >
                                    <a
                                      data-astro-prefetch
                                      className={`block px-12 lg:px-5 py-2 text-xl font-normal lg:font-medium hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset transition-all duration-200 border-b border-gray-100 last:border-b-0 ${pageUrl?.pathname === dropdown_item.dropdown_link ? "text-primary" : "text-gray-700"}`}
                                      href={dropdown_item.dropdown_link}
                                      onClick={closeMobileMenu}
                                      onKeyDown={(e) => {
                                        const menuRef = getDropdownMenuRef(i);
                                        const menuItems =
                                          menuRef.current?.querySelectorAll(
                                            "a",
                                          );
                                        const currentIndex = Array.from(
                                          menuItems,
                                        ).indexOf(e.target);

                                        if (e.key === "ArrowDown") {
                                          e.preventDefault();
                                          const nextIndex =
                                            currentIndex < menuItems.length - 1
                                              ? currentIndex + 1
                                              : 0;
                                          menuItems[nextIndex]?.focus();
                                        } else if (e.key === "ArrowUp") {
                                          e.preventDefault();
                                          const prevIndex =
                                            currentIndex > 0
                                              ? currentIndex - 1
                                              : menuItems.length - 1;
                                          menuItems[prevIndex]?.focus();
                                        } else if (e.key === "Escape") {
                                          e.preventDefault();
                                          // Close dropdown and return focus to button
                                          setOpenDropdown(false);
                                          getDropdownButtonRef(
                                            i,
                                          ).current?.focus();
                                        }
                                      }}
                                      role="menuitem"
                                    >
                                      <editable-text data-prop="dropdown_text">
                                        {dropdown_item.dropdown_text}
                                      </editable-text>
                                    </a>
                                  </li>
                                );
                              })}
                            </div>
                          </ul>
                        </>
                      ) : (
                        <a
                          data-astro-prefetch
                          href={`${item.link}`}
                          className={`block px-10 lg:px-5 py-3 text-2xl lg:text-xl font-normal lg:rounded-lg transition-colors duration-200 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset ${pageUrl?.pathname === item.link ? "text-primary" : "text-gray-700"}`}
                          onClick={closeMobileMenu}
                          role="menuitem"
                        >
                          <editable-text data-prop="text">
                            {item.text}
                          </editable-text>
                        </a>
                      )}
                    </li>
                  );
                })}
                <li role="none">
                  {/* Mobile nav button - shown inside mobile menu */}
                  {navigation.enable_nav_btn && isMobileMenuOpen ? (
                    <div className="flex justify-center lg:hidden">
                      <a
                        data-astro-prefetch
                        href={`${navigation.nav_btn?.link}`}
                        className="inline-flex mb-2 items-center px-6 py-3 text-base bg-secondary lg:rounded-2xl font-normal text-primary hover:bg-primary hover:text-secondary border border-primary rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        onClick={closeMobileMenu}
                        role="menuitem"
                      >
                        <editable-text data-prop="nav_btn.text">
                          {navigation.nav_btn?.text}
                        </editable-text>
                      </a>
                    </div>
                  ) : null}
                </li>
              </ul>
            </div>
            {navigation.enable_nav_btn ? (
              <div className="hidden lg:block">
                <a
                  data-astro-prefetch
                  href={`${navigation.nav_btn?.link}`}
                  className="inline-flex items-center px-6 py-3 text-base font-normal text-primary bg-secondary hover:bg-primary hover:text-secondary  border border-primary rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <editable-text data-prop="nav_btn.text">
                    {navigation.nav_btn?.text}
                  </editable-text>
                </a>
              </div>
            ) : null}
          </div>
        </nav>
      </header>
    </>
  );
}
