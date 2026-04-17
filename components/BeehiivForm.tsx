"use client";

import Script from "next/script";

type Props = {
  className?: string;
};

export function BeehiivForm({ className }: Props) {
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
      <div className={className}>
        <iframe
          className="beehiiv-embed"
          data-test-id="beehiiv-embed"
          frameBorder="0"
          scrolling="no"
          src="https://subscribe-forms.beehiiv.com/3268c32d-d6e1-4f2b-905f-95c606d6a362"
          style={{
            width: "390px",
            height: "45px",
            margin: 0,
            borderRadius: "0px",
            backgroundColor: "transparent",
            boxShadow: "0 0 #0000",
            maxWidth: "100%",
          }}
          title="Formulario nativo de Beehiiv"
        />
      </div>
    </>
  );
}
