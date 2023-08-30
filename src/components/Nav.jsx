import React from "react";
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
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
  Bars2Icon,
  HeartIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

//dropdown menu
function AccountMenu({
  // user, handleLogOut
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen}>
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center gap-1 rounded-full"
          style={{ color: "rgb(96, 20, 30)" }}
        >
        <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        />
        <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
        />
        </Button>
        </MenuHandler>
        <MenuList className="p-1">
            {profileMenuItems.map(({ label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
            <MenuItem
                key={label}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${
                    isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
            >
                {React.createElement(icon, {
                    className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                    strokeWidth: 2,
                })}
                <Typography
                    as="span"
                    variant="small"
                    className="font-normal"
                    color={isLastItem ? "red" : "inherit"}
                >
                {label}
                </Typography>
        </MenuItem>
        );
    })}
        </MenuList>
        </Menu>
    );
}

// Creates favorites and shopping cart icons
function NavList({
  // user, handleLogOut
}) {
  return (
    <div className="flex flex-row items-center justify-between">
      <Typography
        as="a"
        href="/favorites"
        variant="small"
        className="font-normal"
      >
        <MenuItem
          className="flex items-center gap-2 rounded-full"
          style={{ color: "rgb(96, 20, 30)" }}
        >
          {createElement(HeartIcon, { className: "h-6 w-6" })}
        </MenuItem>
      </Typography>

      <Typography
        as="a"
        href="/shopping-cart"
        variant="small"
        className="font-normal"
      >
        <MenuItem
          className="flex items-center gap-2 rounded-full"
          style={{ color: "rgb(96, 20, 30)" }}
        >
          {createElement(ShoppingCartIcon, {
            className: "h-6 w-6",
          })}
        </MenuItem>
      </Typography>
      {/* <AccountMenu user={user} handleLogOut={handleLogOut} /> */}
    </div>
  );
}

//real below
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

  // When productType button is clicked, it will navigate to the url, with above useEffect re-rendering page
  const handleProductTypeFilter = async (e) => {
    if (e.target.id === "red") {
      navigate("/filter/red");
    } else if (e.target.id === "white") {
      navigate("/filter/white");
    } else if (e.target.id === "rose") {
      navigate("/filter/rose");
    } else if (e.target.id === "all") {
      navigate("/filter/all");
    }
  };


    return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
        <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
            as="a"
            href="#"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
            Material Tailwind
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
            <NavList />
        </div>
        <IconButton
            size="sm"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden my-auto"
            style={{ color: "rgb(96, 20, 30)" }}
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
        </div>
        <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
        </MobileNav>
    </Navbar>
    );
}