import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { navigation } from "@/data/navigation";
import { Divider } from "@/components/ui/Divider";

export function Footer() {
  return (
    <footer className="bg-secondary">
      <Divider className="mb-0" />
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="grid grid-cols-1 gap-16 text-center md:grid-cols-3">
          {/* Column 1 — Logo + Contact + Social */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative h-24 w-60 overflow-visible">
              <Image
                src="/images/logo-warm.png"
                alt="פראה בית יין"
                fill
                sizes="120px"
                className="object-contain scale-[1.8] origin-center"
              />
            </div>
            <p className="text-caption text-cream-muted">
              {siteConfig.tagline}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-cream-muted transition-colors duration-300 hover:text-copper"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-caption font-medium text-cream-muted">ניווט</p>
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-caption text-cream-muted/80 transition-colors duration-300 hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Hours + Location */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-caption font-medium text-cream-muted">שעות פתיחה</p>
            <div className="space-y-1.5 text-caption text-cream-muted/80">
              <div>
                <p className="text-cream-muted">{siteConfig.hours.daytime.label}</p>
                <p>{siteConfig.hours.daytime.hours}</p>
              </div>
              <div>
                <p className="text-cream-muted">{siteConfig.hours.evening.label}</p>
                <p>{siteConfig.hours.evening.hours}</p>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-caption font-medium text-cream-muted">מיקום</p>
              <a
                href={siteConfig.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption text-cream-muted/80 transition-colors duration-300 hover:text-copper"
              >
                {siteConfig.location.address}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-cream-muted/10 pt-3 text-center">
          <p className="text-overline text-cream-muted/60">
            &copy; {new Date().getFullYear()} {siteConfig.nameHe}. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
}
