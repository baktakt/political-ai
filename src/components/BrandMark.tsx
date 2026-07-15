/**
 * Site brand mark — an outlined dome on a baseline (a parliamentary
 * hemicycle/chamber reduced to its simplest silhouette, also readable as
 * a capitol dome), with four small graduation ticks along the curve and
 * one accent at the crown. Deliberately not a robot, a brain, a circuit
 * board, a party rosette, or a ballot box.
 *
 * Passed into the shared Header/Footer via their `logo` prop so this
 * site's identity is consistent everywhere the mark appears, while sites
 * that don't pass the prop keep their own default mark unchanged.
 */
export function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden
      className="text-foreground"
    >
      <path
        d="M 5 20 A 11 11 0 0 1 27 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <line x1="5" y1="20" x2="27" y2="20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="24.65" y1="16.85" x2="28.03" y2="15.62" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="20.6" y1="12.03" x2="22.4" y2="8.92" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="11.4" y1="12.03" x2="9.6" y2="8.92" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="7.35" y1="16.85" x2="3.97" y2="15.62" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="16" cy="9" r="1.8" fill="currentColor" />
    </svg>
  );
}
