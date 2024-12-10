import vault8Logo from "../assets/logo-vault8.png";
import iconMoon from "../assets/icon-moon.svg";
import iconSun from "../assets/icon-sun.svg";
import iconSystem from "../assets/icon-system.svg";
import { useState } from "react";

interface Theme {
  name: string;
  className: string;
  icon: string;
}

const themes: Theme[] = [
  { name: "Light", className: "light", icon: iconSun },
  { name: "Dark", className: "dark", icon: iconMoon },
  { name: "System", className: "system", icon: iconSystem }
];

export const Navbar: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[2]);
  const [siteName] = useState("Vault8");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function updateCurrentTheme(theme: Theme) {
    setCurrentTheme(theme);
    setIsDropdownOpen(false);
    console.log(`🩷Bijoya - Navbar.tsx > 31`);
  }

  function renderDropdown() {
    if (isDropdownOpen) {
      return (<div
        className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
        <div className="p-1">
          {dropdownButtons()}
        </div>
      </div>);
    }

    return null;
  }

  function dropdownButtons() {
    return themes.map(theme =>
      (
        <button
          className="flex w-full items-center gap-3 rounded p-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
          key={theme.name}
          onClick={() => updateCurrentTheme(theme)}
        >
          <span className="mr-2">
            <img src={theme.icon} alt="Current theme" className="h-6" />
          </span>
          <span className="capitalize">{theme.name}</span>
        </button>
      ));
  }

  return (
    <>
      <nav
        className="absolute flex h-16 w-full justify-between border-b border-neutral-200 bg-white px-4 dark:border-neutral-800 dark:bg-neutral-900">
        {/*Left section with logo and title*/}
        <div className="flex items-center gap-4">
          <img src={vault8Logo} alt="Logo" className="h-12" />
          <h1 className="m-0 text-xl font-semibold text-neutral-900 dark:text-neutral-50">
            {siteName}
          </h1>
        </div>

        {/*Theme switcher dropdown*/}
        <div onClick={toggleDropdown} className="relative flex items-center">
          <button className="flex items-center p-3">
        <span className="mr-2">
          <img src={currentTheme.icon} alt="Current theme" className="h-6" />
      </span>
            <span className="flex items-center capitalize">
              {currentTheme.name}
            </span>
          </button>

          {/*Dropdown menu*/}
          {renderDropdown()}
        </div>
      </nav>
    </>
  );
};