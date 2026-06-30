import type { ThemeOption } from "../types";
import { SunIcon, MoonIcon, LaptopIcon } from "lucide-react";

export const themes: ThemeOption[] = [
  { value: "light", icon: SunIcon, label: "Light", description: "Bright background, dark text" },
  { value: "dark", icon: MoonIcon, label: "Dark", description: "Dim background, soft contrast" },
  { value: "system", icon: LaptopIcon, label: "System", description: "Follow OS preference" },
];
