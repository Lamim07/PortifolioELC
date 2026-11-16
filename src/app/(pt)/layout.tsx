import { SiteHtml, buildMetadata } from "../site";

export { viewport } from "../site";
export const metadata = buildMetadata("pt");

export default function PortugueseLayout({ children }: { children: React.ReactNode }) {
  return <SiteHtml language="pt">{children}</SiteHtml>;
}
