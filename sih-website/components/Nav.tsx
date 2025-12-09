"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav() {
  const router = useRouter();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contributionsOpen, setContributionsOpen] = useState(false);
  const [monasteriesOpen, setMonasteriesOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<Array<{label: string; action: () => void}>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [search, setSearch] = useState("");
  
  const monasteries = [
    { name: "Dubdi", slug: "dubdi" },
    { name: "Rumtek", slug: "rumtek" },
    { name: "Tashiding", slug: "tashiding" },
    { name: "Tsuk La Khang", slug: "tsuk" },
  ];

  const contributions = [
    { name: t("nav.mediaContribution") || "Media Contribution", href: "/media-contribution/login" },
    { name: t("nav.dataContribution") || "Data Contribution", href: "/data-contribution" },
  ];

  const pages = [
    { name: t("nav.home") || "Home", action: () => { router.push("/"); setSearch(""); setShowSuggestions(false); } },
    { name: t("nav.experiences") || "Experiences", action: () => { router.push("/experiences"); setSearch(""); setShowSuggestions(false); } },
    { name: t("nav.archive") || "Archive", action: () => { router.push("/archive"); setSearch(""); setShowSuggestions(false); } },
    { name: t("nav.mediaContribution") || "Media Contribution", action: () => { router.push("/media-contribution/login"); setSearch(""); setShowSuggestions(false); } },
    { name: t("nav.dataContribution") || "Data Contribution", action: () => { router.push("/data-contribution"); setSearch(""); setShowSuggestions(false); } },
  ];

  const handleSearchInput = (value: string) => {
    setSearch(value);
    
    if (!value.trim()) {
      setShowSuggestions(false);
      return;
    }

    const normalize = (text: string) => text.trim().toLowerCase();
    const searchVal = normalize(value);

    const suggestions: Array<{label: string; action: () => void}> = [];

    // Search monasteries
    monasteries.forEach((monastery) => {
      if (normalize(monastery.name).includes(searchVal)) {
        suggestions.push({
          label: monastery.name,
          action: () => {
            router.push(`/all-monasteries/${monastery.slug}`);
            setSearch("");
            setShowSuggestions(false);
          },
        });
      }
    });

    // Search pages
    pages.forEach((page) => {
      if (normalize(page.name).includes(searchVal)) {
        suggestions.push(page);
      }
    });

    setSearchSuggestions(suggestions);
    setShowSuggestions(suggestions.length > 0);
  };

  const getFilteredMonasteries = () => {
    const normalize = (text: string) => text.trim().toLowerCase();
    const searchVal = normalize(dropdownSearch);
    if (!searchVal) return monasteries;
    return monasteries.filter(m => normalize(m.name).includes(searchVal));
  };

  const getFilteredContributions = () => {
    const normalize = (text: string) => text.trim().toLowerCase();
    const searchVal = normalize(dropdownSearch);
    if (!searchVal) return contributions;
    return contributions.filter(c => normalize(c.name).includes(searchVal));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const normalize = (value: string) => value.trim().toLowerCase();
    const val = normalize(search);
    
    // Try to find in suggestions
    if (searchSuggestions.length > 0) {
      searchSuggestions[0].action();
      return;
    }

    // Fallback: check for section IDs on current page
    const searchTargets = [
      { id: "home", terms: [t("nav.home"), "home"] },
      { id: "monastery-map", terms: [t("nav.map"), "map"] },
      { id: "monastery-slideshow", terms: [t("nav.overview"), "overview"] },
    ];

    const match = searchTargets.find((target) =>
      target.terms.some((term) => normalize(term) === val)
    );

    if (match?.id) {
      document.getElementById(match.id)?.scrollIntoView({ behavior: "smooth" });
    }
    
    setSearch("");
    setShowSuggestions(false);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-shadow
      ${scrolled ? "shadow-[0_2px_12px_rgba(0,0,0,0.15)]" : ""}`}>
      <div className="bg-[#0c3b44] text-white">
        <nav className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          {/* Left: logo */}
          <Link href="/" className="flex flex-row items-center gap-2">
            <img src="/logo web.png" alt="Logo" className="h-12 w-12 object-contain" />
            <span className="font-poppins tracking-wide text-xl">{t("brand.name")}</span>
            <span className="font-lora italic text-sm text-white/90"></span>
          </Link>

          {/* Center: links */}
          <ul className="mx-auto hidden md:flex items-center gap-8 text-sm uppercase tracking-wider">
            <li className="relative">
              <button 
                onClick={() => { setContributionsOpen(!contributionsOpen); setDropdownSearch(""); }}
                className="hover:opacity-80 flex items-center gap-1"
              >
                {t("nav.contributions")}
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  className={`transition-transform ${contributionsOpen ? 'rotate-180' : ''}`}
                >
                  <path fill="currentColor" d="M7 10l5 5 5-5z"/>
                </svg>
              </button>
              {contributionsOpen && (
                <div className="absolute top-full left-0 mt-2 bg-[#0c3b44] border border-white/20 rounded-md shadow-lg py-2 min-w-[220px] z-40">
                  <div className="px-3 py-2 border-b border-white/10">
                    <input
                      type="text"
                      placeholder="Search contributions..."
                      value={dropdownSearch}
                      onChange={(e) => setDropdownSearch(e.target.value)}
                      className="w-full bg-white/10 text-white text-sm px-2 py-1 rounded placeholder-white/50 outline-none"
                    />
                  </div>
                  {getFilteredContributions().map((contrib) => (
                    <Link 
                      key={contrib.href}
                      href={contrib.href}
                      className="block px-4 py-2 hover:bg-white/10 text-sm"
                      onClick={() => { setContributionsOpen(false); setDropdownSearch(""); }}
                    >
                      {contrib.name}
                    </Link>
                  ))}
                  {getFilteredContributions().length === 0 && (
                    <div className="px-4 py-2 text-sm text-white/60">No results found</div>
                  )}
                </div>
              )}
            </li>
            <li className="relative">
              <button 
                onClick={() => { setMonasteriesOpen(!monasteriesOpen); setDropdownSearch(""); }}
                className="hover:opacity-80 flex items-center gap-1"
              >
                {t("nav.monasteries")}
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  className={`transition-transform ${monasteriesOpen ? 'rotate-180' : ''}`}
                >
                  <path fill="currentColor" d="M7 10l5 5 5-5z"/>
                </svg>
              </button>
              {monasteriesOpen && (
                <div className="absolute top-full left-0 mt-2 bg-[#0c3b44] border border-white/20 rounded-md shadow-lg py-2 min-w-[200px] z-40">
                  <div className="px-3 py-2 border-b border-white/10">
                    <input
                      type="text"
                      placeholder="Search monasteries..."
                      value={dropdownSearch}
                      onChange={(e) => setDropdownSearch(e.target.value)}
                      className="w-full bg-white/10 text-white text-sm px-2 py-1 rounded placeholder-white/50 outline-none"
                    />
                  </div>
                  {getFilteredMonasteries().map((monastery) => (
                    <Link 
                      key={monastery.slug}
                      href={`/all-monasteries/${monastery.slug}`}
                      className="block px-4 py-2 hover:bg-white/10 text-sm"
                      onClick={() => { setMonasteriesOpen(false); setDropdownSearch(""); }}
                    >
                      {monastery.name}
                    </Link>
                  ))}
                  {getFilteredMonasteries().length === 0 && (
                    <div className="px-4 py-2 text-sm text-white/60">No monasteries found</div>
                  )}
                </div>
              )}
            </li>
            <li><Link href="/experiences" className="hover:opacity-80">{t("nav.bookings")}</Link></li>
          </ul>

          {/* Right: search + burger */}
          <div className="ml-auto flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/admin" className="hidden sm:block px-4 py-2 rounded-md bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium">
              {t("nav.adminLogin")}
            </Link>
            <div className="relative hidden sm:block">
              <form className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5" onSubmit={handleSearch}>
                {/* search icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-80">
                  <path fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16a6.471 6.471 0 0 0 4.23-1.57l.27.28v.79L20 21.5 21.5 20zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <input
                  value={search}
                  onChange={e => handleSearchInput(e.target.value)}
                  placeholder={t("nav.searchPlaceholder")}
                  className="w-28 bg-transparent text-sm placeholder-white/70 outline-none"
                />
              </form>
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-[#0c3b44] border border-white/20 rounded-md shadow-lg py-2 z-50">
                  {searchSuggestions.slice(0, 5).map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={suggestion.action}
                      className="w-full text-left px-4 py-2 hover:bg-white/10 text-sm text-white"
                    >
                      {suggestion.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              aria-label="Menu"
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 md:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/></svg>
            </button>
          </div>
        </nav>

        {/* Mobile sheet */}
        {open && (
          <div className="md:hidden border-t border-white/15">
              <ul className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3 text-sm uppercase tracking-wider">
              <li><a href="#home" onClick={()=>setOpen(false)}>{t("nav.home")}</a></li>
              <li><a href="#monastery-slideshow" onClick={()=>setOpen(false)}>{t("nav.overview")}</a></li>
              <li><a href="#monastery-map" onClick={()=>setOpen(false)}>{t("nav.map")}</a></li>
              <li><Link href="/archive" onClick={()=>setOpen(false)}>{t("nav.archive")}</Link></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
