import { Footer, type FooterProps } from "built-intelligence-components";
import { BrandMark } from "./BrandMark";

/** Shared Footer with this site's own brand mark instead of the library default. */
export default function SiteFooter(props: FooterProps) {
  return <Footer {...props} logo={<BrandMark />} />;
}
