"use client";

import { useEffect, useRef, useState } from "react";
import courses from "@/data/courses";

export default function ResultPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState<any>(null);

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

      console.log("formData", formData);

      ctx.font = "48px sans-serif";
      ctx.fillStyle = "#000";
      ctx.fillText(`${formData.studentName} 專屬 P&C 課表`, 120, 130);

      Object.entries(formData.selectedCourses).forEach(([index, courseInfo]: any) => {
        const course = courses[Number(index)];
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
      });
    };
  }, [formData]);

  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-12 text-[#4b5563]">
      <h1 className="text-3xl font-bold text-center mb-3 text-[#cfa7b4]">您的課表 🌸</h1>
      <p className="text-center text-base mb-6 text-[#6b7280]">
        感謝您填寫調查表！以下是您專屬的 P&C 課表，請務必確認課程資訊正確無誤。
        <br />
        右鍵點擊圖片（電腦）或長按圖片（手機）即可下載課表。
      </p>
      <div className="mb-8">
        <canvas ref={canvasRef} className="w-full max-w-xl mx-auto rounded-2xl shadow-sm" />
      </div>
    </main>
  );
}
