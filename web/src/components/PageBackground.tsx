"use client";
import { useEffect } from "react";

// Sets body background to a solid colour so iOS overscroll (rubber-band)
// never reveals the dark base colour underneath the page content.
// Does NOT touch the animated background, html, nav, or footer.
export function PageBackground({ color }: { color: string }) {
  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = color;
    return () => { document.body.style.background = prev; };
  }, [color]);
  return null;
}
