"use client";

import { useEffect } from "react";

export function ClientConsoleLog() {
  useEffect(() => {
    console.log(
      "%c" +
        "⚠️⚠️⚠️⚠️⚠️\nYou shouldn't be seeing this message if you don't know what you're doing.\n⚠️⚠️⚠️⚠️⚠️\nIf you do know what you're doing please help us for the love of Urza.\n🤍💙🖤❤️💚\nCheck out our GitHub repository at https://github.com/LucasFASouza/mtgtracker",
      "color:" +
        "#e11d48" +
        ";font-weight:bold;font-size:1.5em;background-color:black"
    );
  }, []);

  return null;
}
