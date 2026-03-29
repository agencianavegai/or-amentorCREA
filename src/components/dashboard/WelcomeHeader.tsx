"use client";

import { useEffect, useState } from "react";

export function WelcomeHeader() {
  const [userName, setUserName] = useState<string>("Engenheiro(a)");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedName = localStorage.getItem("userName");
      const profileSettings = localStorage.getItem("ProfileSettings");
      
      let nameToUse = "";
      if (profileSettings) {
        try {
          const parsed = JSON.parse(profileSettings);
          nameToUse = parsed?.name || parsed?.userName || "";
        } catch {
          // ignora erro de parse
        }
      }
      
      if (!nameToUse && savedName) {
        nameToUse = savedName;
      }
      
      if (nameToUse) {
        setUserName(nameToUse);
      }
    } catch (e) {
      console.error("Failed to parse user name from local storage", e);
    }
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
        Seu Próximo Orçamento Técnico<br className="hidden md:block" /> em Minutos,{" "}
        <span className="text-crea-blue-200">
          {mounted ? userName : "Engenheiro(a)"}
        </span>
        <span className="text-crea-blue-200">.</span>
      </h1>
      <p className="text-crea-blue-100/90 text-sm sm:text-base md:text-lg max-w-2xl font-medium leading-relaxed mt-2">
        Acesse a inteligência técnica do CREA para elaboração de propostas precisas, perfeitamente integradas aos padrões oficiais (SINAPI/SICRO).
      </p>
    </div>
  );
}
