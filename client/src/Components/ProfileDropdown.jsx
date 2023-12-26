import { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";

export const ProfileDropdown = ({ logout, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useGetCurrentUser();

  const ref = useClickAway(() => {
    setIsOpen(false);
  });

  const toggleDropdown = () => {
    setIsOpen((prevValue) => !prevValue);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        id="dropdownUserAvatarButton"
        onClick={() => {
          toggleDropdown();
        }}
        className="flex text-sm text-white hover:bg-transparent hover:text-[#00ffc2] rounded-full md:me-0 "
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-user w-7"
        >
          <circle cx="16" cy="16" r="15" />
          <image
            href="http://localhost:3000/static/media/heroSection.884c78f7234bff6065b1.png"
            x="4"
            y="4"
            height="24"
            width="24"
            clipPath="url(#userClip)"
          />
          <defs>
            <clipPath id="userClip">
              <circle cx="16" cy="16" r="16" />
            </clipPath>
          </defs>
        </svg>
      </button>

      <div
        className={`z-20 divide-y absolute right-1 top-8 rounded-lg shadow-md w-44 bg-gray-700 divide-gray-600 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3 text-sm text-white">
          <div className="">
            {currentUser?.firstname} {currentUser?.lastname}
          </div>
          <div className="font-medium truncate">{currentUser?.email}</div>
        </div>
        <ul
          className="py-2 text-sm  text-gray-200"
          aria-labelledby="dropdownUserAvatarButton"
        >
          <li
            className="px-4 py-2 w-full"
            onClick={() => {
              toggleDropdown();
            }}
          >
            {children}
          </li>
        </ul>
        <div className="py-2 w-full">
          <button
            onClick={() => logout()}
            className="block px-4 py-2 w-full text-sm font-bold text-red-600 hover:text-red-700"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};
