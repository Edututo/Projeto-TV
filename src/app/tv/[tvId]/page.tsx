@@ -1,7 +1,8 @@
 "use client";
 
 import React, { useEffect, useState } from "react";
+import Image from "next/image";
 
 interface Slide {
   type: "image" | "video";
   url: string;
@@ -10,9 +11,15 @@
 interface TVContent {
   slides: Slide[];
 }
 
-export default function TVContentPage({ params }: { params: { tvId: string } }) {
+interface PageProps {
+  params: {
+    tvId: string;
+  };
+}
+
+export default function TVContentPage({ params }: PageProps) {
   const { tvId } = params;
   const [content, setContent] = useState<TVContent | null>(null);
   const [currentIndex, setCurrentIndex] = useState(0);
 
@@ -48,12 +55,15 @@
 
   return (
     <div className="w-full h-full bg-black flex items-center justify-center">
       {currentSlide.type === "image" ? (
-        <img
+        <Image
           src={currentSlide.url}
           alt={`Slide ${currentIndex + 1}`}
+          width={1920}
+          height={1080}
           className="max-w-full max-h-full object-contain"
+          priority
         />
       ) : (
         <video
           src={currentSlide.url}
