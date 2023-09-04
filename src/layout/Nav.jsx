import { useState, useEffect, createElement } from "react";
import { useNavigate } from "react-router-dom";
import ColorDoge from "../assets/ColorDoge.svg";
import { useSelector } from "react-redux";

import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";

import {
  UserCircleIcon,
  UserPlusIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
  Bars2Icon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";

// Dropdown menu
function AccountMenu({ user, handleLogOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.entireUser?.user);

  const navToProfile = () => {
    closeMenu();
    navigate(`/profile/${userId}`);
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen}>
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center gap-1 rounded-full hover:bg-meme-teal"
        >
          {createElement(UserCircleIcon, {
            className: "h-[24px] w-[24px]",
            style: {
              color: user ? "rgb(45, 45, 45)" : "#facc15",
            },
          })}

          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
            style={{
              color: user ? "rgb(45, 45, 45)" : "#facc15",
            }}
          />
        </Button>
      </MenuHandler>

      <MenuList className="p-1">
        {user && (
          <Typography>
            <MenuItem
              onClick={navToProfile}
              className={"flex items-center gap-2 rounded"}
              style={{ color: "rgb(45, 45, 45)" }}
            >
              {createElement(UserCircleIcon, {
                className: "h-4 w-4",
                strokeWidth: 2,
              })}
              My Account
            </MenuItem>
          </Typography>
        )}

        {user && (
          <Typography as="a" href="/account-settings">
            <MenuItem
              onClick={closeMenu}
              className={"flex items-center gap-2 rounded"}
              style={{ color: "rgb(45, 45, 45)" }}
            >
              {createElement(Cog6ToothIcon, {
                className: "h-4 w-4",
                strokeWidth: 2,
              })}
              Edit Account
            </MenuItem>
          </Typography>
        )}

        {!user && (
          <Typography as="a" href="/register">
            <MenuItem
              onClick={closeMenu}
              className={"flex items-center gap-2 rounded"}
              style={{ color: "rgb(45, 45, 45)" }}
            >
              {createElement(UserPlusIcon, {
                className: "h-4 w-4",
                strokeWidth: 2,
              })}
              Sign Up
            </MenuItem>
          </Typography>
        )}

        <Typography
          as="a"
          onClick={user ? handleLogOut : undefined}
          href={user ? undefined : "/sign-in"}
        >
          <MenuItem
            onClick={closeMenu}
            className={"flex items-center gap-2 rounded"}
            style={{ color: "rgb(45, 45, 45)" }}
          >
            {createElement(PowerIcon, {
              className: "h-4 w-4",
              strokeWidth: 2,
            })}
            {user ? "Sign Out" : "Sign In"}
          </MenuItem>
        </Typography>
      </MenuList>
    </Menu>
  );
}

function NavList({ user, handleLogOut }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center justify-end">
      {user && (
        <Typography
          onClick={() => navigate("/meme-selection")}
          variant="small"
          className="font-normal"
        >
          <MenuItem
            className="flex items-center gap-2 rounded-full hover:bg-meme-teal"
            style={{ color: "rgb(45, 45, 45)" }}
          >
            {createElement(PlusSmallIcon, {
              className: "h-6 w-6",
            })}
          </MenuItem>
        </Typography>
      )}
      <AccountMenu user={user} handleLogOut={handleLogOut} />
    </div>
  );
}

export default function Nav({ user, handleLogOut }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  // const handleFeedFilter = async (e) => {
  //   if (e.target.id === "most-liked") {
  //   } else if (e.target.id === "friends") {
  //   } else if (e.target.id === "newest") {
  //   }
  // };

  return (
    <div>
      <Navbar className="max-w-full rounded-none bg-meme-teal px-0 py-4">
        <div className="flex" style={{ color: "rgb(45, 45, 45)" }}>
          <div
            className="flex items-center w-full"
            style={{ marginLeft: "33vw" }}
          >
            <img
              className="w-14 h-14 cursor-pointer hover:opacity-50"
              src={ColorDoge}
              onClick={() => navigate("/")}
            />

            <Typography
              onClick={() => navigate("/")}
              className="mr-4 ml-4 flex items-center grow cursor-pointer py-1.5 font-black text-3xl hover:opacity-50"
            >
              You & Meme
            </Typography>
          </div>

          <div className="flex justify-end w-1/6 top-2/4 hidden lg:block">
            <NavList user={user} handleLogOut={handleLogOut} />
          </div>

          {/* Responsive menu change (NavList > Bars2Icon) when Collapse is open (determined by useEffect above) */}
          <IconButton
            size="sm"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden my-auto"
            style={{ color: "#d1bd04" }}
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
        </div>

        <Collapse open={isNavOpen} className="overflow-scroll">
          <NavList user={user} handleLogOut={handleLogOut} />
        </Collapse>
      </Navbar>
    </div>
  );
}
