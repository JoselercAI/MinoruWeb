"use client";

import { useRef, useState } from "react";
import styles from "./page.module.scss";

export function GuideVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const handleStart = async () => {
    const video = ref.current;
    if (!video) return;

    try {
      video.muted = false;
      await video.play();
      setStarted(true);
    } catch {}
  };

  return (
    <div className={styles.videoShell}>
      {!started ? (
        <button
          aria-label="Reproducir vídeo con sonido"
          className={styles.videoTrigger}
          onClick={handleStart}
          type="button"
        >
          <span aria-hidden="true" className={styles.videoTriggerIcon} />
        </button>
      ) : null}

      <video
        ref={ref}
        className={styles.guideVideo}
        controls
        loop
        playsInline
      >
        <source src="/videos/confirmation-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
