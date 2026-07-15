import { Header, type HeaderProps } from "built-intelligence-components";
import { BrandMark } from "./BrandMark";

/** Shared Header with this site's own brand mark instead of the library default. */
export default function SiteHeader(props: HeaderProps) {
  return <Header {...props} logo={<BrandMark />} />;
}
