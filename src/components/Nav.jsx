import { useState, useEffect, createElement } from "react";
import { useNavigate } from "react-router-dom";

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
function AccountMenu({ user, handleLogOut }) {
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
            {createElement(UserCircleIcon, {
                className: "h-[24px] w-[24px]",
                style: { color: user ? "green" : "rgb(96, 20, 30)" },
            })}

            <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
            }`}
            style={{ color: user ? "green" : "rgb(96, 20, 30)" }}
            />
        </Button>
        </MenuHandler>

        <MenuList className="p-1">
        <Typography as="a" href="/account-info">
            <MenuItem
                onClick={closeMenu}
                className={"flex items-center gap-2 rounded"}
                style={{ color: "rgb(96, 20, 30)" }}
            >
            {createElement(UserCircleIcon, {
                className: "h-4 w-4",
                strokeWidth: 2,
            })}
            My Account
            </MenuItem>
        </Typography>

        <Typography as="a" href="/development">
            <MenuItem
                onClick={closeMenu}
                className={"flex items-center gap-2 rounded"}
                style={{ color: "rgb(96, 20, 30)" }}
            >
            {createElement(Cog6ToothIcon, {
                className: "h-4 w-4",
                strokeWidth: 2,
            })}
            Edit Account
            </MenuItem>
        </Typography>

        <Typography
            as="a"
            onClick={user ? handleLogOut : undefined}
            href={user ? undefined : "/sign-in"}
        >
            <MenuItem
                onClick={closeMenu}
                className={"flex items-center gap-2 rounded"}
                style={{ color: "rgb(96, 20, 30)" }}
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

// Creates favorites and shopping cart icons
function NavList({ user, handleLogOut }) {
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
        <AccountMenu user={user} handleLogOut={handleLogOut} />
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
        <div className="bg-white">
        <Navbar className="max-w-full rounded-none">
        {/* ==================== */}
        <div className="flex" style={{ color: "rgb(96, 20, 30)" }}>
            <Typography
                onClick={() => navigate("/development")}
                className="flex items-center w-1/6"
            >
            {createElement(MagnifyingGlassIcon, {
                className: "h-6 w-6",
                strokeWidth: 2,
            })}
            </Typography>

            <Typography
                onClick={() => navigate("/")}
                className="mr-4 ml-2 flex items-center justify-center grow cursor-pointer py-1.5 font-black text-5xl"
                style={{ fontFamily: "Wine Date" }}
            >
            Wine About It
            </Typography>

          {/* Favorites and shopping cart icons */}
            <div className="flex justify-end w-1/6 top-2/4 hidden lg:block">
            <NavList user={user} handleLogOut={handleLogOut} />
            </div>

          {/* Responsive menu change (NavList > Bars2Icon) when Collapse is open (determined by useEffect above) */}
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
        {/* ==================== */}

        <Collapse open={isNavOpen} className="overflow-scroll">
            <NavList user={user} handleLogOut={handleLogOut} />
        </Collapse>
        </Navbar>

        <div
            className="flex justify-center border-b border-t"
            style={{ borderColor: "rgb(96, 20, 30)" }}
        >
        <Button
            id="all"
            variant="text"
            onClick={handleProductTypeFilter}
            style={{
                color: "rgb(96, 20, 30)",
                fontFamily: "'HelpUsGiambattista', sans-serif",
            }}
        >
            All Wines
        </Button>

        <Button
            id="red"
            variant="text"
            onClick={handleProductTypeFilter}
            style={{
                color: "rgb(96, 20, 30)",
                fontFamily: "'HelpUsGiambattista', sans-serif",
            }}
        >
            Red Wines
        </Button>

        <Button
            id="white"
            variant="text"
            onClick={handleProductTypeFilter}
            style={{
                color: "rgb(96, 20, 30)",
                fontFamily: "'HelpUsGiambattista', sans-serif",
            }}
        >
            White Wines
        </Button>

        <Button
            id="rose"
            variant="text"
            onClick={handleProductTypeFilter}
            style={{
                color: "rgb(96, 20, 30)",
                fontFamily: "'HelpUsGiambattista', sans-serif",
            }}
        >
            Rosé Wines
        </Button>
        </div>
    </div>
    );
}
