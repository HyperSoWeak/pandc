"use client";

import { useEffect, useRef, useState } from "react";
import courses from "@/data/courses";
import { FormData } from "@/types/FormData";
import NextImage from "next/image";

export default function ResultPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    studentName: "",
    schoolGrade: "",
    parentPhone: "",
    branch: "",
    diet: "",
    selectedCourses: {},
  });

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (!formData) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const img = new Image();
    img.src = "/schedule_blank.png";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      ctx.font = "48px sans-serif";
      ctx.fillStyle = "#000";
      ctx.fillText(`${formData.studentName} 專屬 P&C 課表`, 120, 130);

      Object.keys(formData.selectedCourses).forEach((keyStr) => {
        const index = Number(keyStr);
        const courseInfo = formData.selectedCourses[index];
        const course = courses[index];
        if (!course) return;

        ctx.font = "22px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillStyle = "#557ae0";
        ctx.fillText(`《${course.name}》`, course.xpos + 10, course.ypos - 20);

        ctx.font = "20px sans-serif";
        ctx.fillStyle = "#222";
        ctx.fillText(`${course.subject} | ${course.lecturer}`, course.xpos + 10, course.ypos + 15);
        ctx.fillText(`${course.timeStart} ~ ${course.timeEnd}`, course.xpos + 10, course.ypos + 45);

        ctx.fillStyle = "#c9883e";
        const transText =
          courseInfo.transportation === "自行前往"
            ? "自行前往"
            : `${courseInfo.transportation} | ${courseInfo.location}`;
        ctx.fillText(transText, course.xpos + 10, course.ypos + 75);

        const dataURL = canvas.toDataURL("image/png");
        setImageUrl(dataURL);
      });
    };
  }, [formData]);

  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-12 text-[#4b5563]">
      <h1 className="text-3xl font-bold text-center mb-3 text-[#cfa7b4]">您的課表 🌸</h1>
      <p className="text-center text-base mb-6 text-[#6b7280]">
        感謝您填寫調查表！以下是您專屬的 P&C 課表，請務必確認課程資訊正確無誤。
        <br />
        您可以長按圖片下載（手機）或右鍵儲存（電腦）。
      </p>

      <div className="mb-8">
        {imageUrl ? (
          <NextImage
            src={imageUrl}
            alt="專屬課表"
            width={800}
            height={600}
            className="w-full max-w-xl mx-auto rounded-2xl shadow-sm"
          />
        ) : (
          <canvas ref={canvasRef} className="w-full max-w-xl mx-auto rounded-2xl shadow-sm" />
        )}
      </div>
    </main>
  );
}
