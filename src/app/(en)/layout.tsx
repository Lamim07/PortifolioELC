import { SiteHtml, buildMetadata } from "../site";

export { viewport } from "../site";
export const metadata = buildMetadata("en");

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteHtml language="en">{children}</SiteHtml>;
}
