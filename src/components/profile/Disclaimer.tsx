"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function Disclaimer() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="relative rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 max-w-xl m-3">
      <button
        onClick={() => setShow(false)}
        className="absolute right-3 top-3 rounded-md p-1 text-amber-700 transition hover:bg-amber-100"
        aria-label="Close disclaimer"
      >
        <X size={18} />
      </button>

      <p className="pr-8 leading-6">
        <strong>Disclaimer:</strong> This project was a
         company project. I have received permission to showcase the
        features that can be shared publicly for portfolio purposes. As a
        result, some features, APIs, or components may be limited. If you'd like to learn more about the project,
        my role, or see the complete implementation, please feel free to contact
        me.
      </p>
    </div>
  );
}