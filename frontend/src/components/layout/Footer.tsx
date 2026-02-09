import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { navigation } from "@/data/navigation";
import { Divider } from "@/components/ui/Divider";

export function Footer() {
  return (
    <footer className="bg-primary">
      <Divider className="mb-0" />
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo-warm.png"
              alt="פראה בית יין"
              width={140}
              height={140}
              className="mb-4 h-12 w-auto"
            />
            <p className="text-caption text-cream-muted">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="overline mb-4">גלו</p>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-caption text-cream-muted transition-colors duration-300 hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="overline mb-4">בקרו</p>
            <div className="space-y-3 text-caption text-cream-muted">
              <p>{siteConfig.location.address}</p>
              <div>
                <p className="text-cream">{siteConfig.hours.daytime.label}</p>
                <p>{siteConfig.hours.daytime.hours}</p>
              </div>
              <div>
                <p className="text-cream">{siteConfig.hours.evening.label}</p>
                <p>{siteConfig.hours.evening.hours}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-cream-muted/10 pt-8 text-center">
          <p className="text-overline text-cream-muted/60">
            &copy; {new Date().getFullYear()} {siteConfig.nameHe}. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
}
