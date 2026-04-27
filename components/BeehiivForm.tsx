"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type Props = {
  className?: string;
};

const iframeWidth = 407;
const iframeHeight = 82;

export function BeehiivForm({ className }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const width = wrapperRef.current?.clientWidth || iframeWidth;
      setScale(width / iframeWidth);
    };
    const observer = new ResizeObserver(updateScale);

    updateScale();

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Script
        id="beehiiv-embed"
        src="https://subscribe-forms.beehiiv.com/embed.js"
        strategy="afterInteractive"
      />
      <Script
        id="beehiiv-attribution"
        src="https://subscribe-forms.beehiiv.com/attribution.js"
        strategy="afterInteractive"
      />
      <div className={className} ref={wrapperRef}>
        <div
          style={{
            height: iframeHeight * scale,
            overflow: "hidden",
            width: iframeWidth * scale,
          }}
        >
          <iframe
            className="beehiiv-embed"
            data-test-id="beehiiv-embed"
            frameBorder="0"
            scrolling="no"
            src="https://subscribe-forms.beehiiv.com/3268c32d-d6e1-4f2b-905f-95c606d6a362"
            style={{
              width: iframeWidth,
              height: iframeHeight,
              margin: 0,
              borderRadius: "0px",
              backgroundColor: "transparent",
              boxShadow: "0 0 #0000",
              maxWidth: "none",
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
            title="Formulario nativo de Beehiiv"
          />
        </div>
      </div>
    </>
  );
}
