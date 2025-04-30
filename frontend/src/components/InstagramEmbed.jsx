// frontend/src/components/InstagramEmbed.jsx
import { useEffect } from "react";

export default function InstagramEmbed({ url, caption = true }) {
  useEffect(() => {
    // After mounting, ask Instagram's script to scan the page
    if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    }
  }, [url]);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      {...(!caption && { "data-instgrm-captioned": "" })}
      style={{ margin: "1em auto", maxWidth: "540px", width: "100%" }}
    ></blockquote>
  );
}
