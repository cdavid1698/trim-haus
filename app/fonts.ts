import { Figtree, IBM_Plex_Sans_Arabic, Marcellus, Noto_Kufi_Arabic } from "next/font/google";

// Latin: Marcellus (echoes the logo lettering) + Figtree. Arabic: Noto Kufi Arabic (echoes the Kufic shop sign) + IBM Plex Sans Arabic.
const marcellus = Marcellus({ variable: "--font-marcellus", subsets: ["latin"], weight: "400", preload: false });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });
const kufi = Noto_Kufi_Arabic({ variable: "--font-kufi", subsets: ["arabic"], weight: "600", preload: false });
const plexArabic = IBM_Plex_Sans_Arabic({ variable: "--font-plex-ar", subsets: ["arabic"], weight: ["400", "600"] });

// Only the body fonts are preloaded; heading fonts swap in, keeping the critical path light.
/** Both scripts' fonts on every page: each language also shows the shop name in the other script. */
export const fontVariables = [marcellus, figtree, kufi, plexArabic].map((f) => f.variable).join(" ");
