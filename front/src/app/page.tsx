"use client";

import { useState } from "react";
import courses from "@/data/courses";

const transportationOptions = ["自行前往", "搭乘交通車 - 去程", "搭乘交通車 - 回程", "搭乘交通車 - 來回"];

export default function HomePage() {
  const [formData, setFormData] = useState({
    studentName: "",
    schoolGrade: "",
    parentPhone: "",
    branch: "",
    diet: "",
    selectedCourses: {} as Record<number, { transportation: string; location: string }>,
  });

  const handleCourseSelect = (index: number) => {
    setFormData((prev) => {
      const selected = { ...prev.selectedCourses };
      if (selected[index]) {
        delete selected[index];
      } else {
        selected[index] = { transportation: "", location: "" };
      }
      return { ...prev, selectedCourses: selected };
    });
  };

  const handleTransportationChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedCourses: {
        ...prev.selectedCourses,
        [index]: {
          ...prev.selectedCourses[index],
          transportation: value,
        },
      },
    }));
  };

  const handleLocationChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedCourses: {
        ...prev.selectedCourses,
        [index]: {
          ...prev.selectedCourses[index],
          location: value,
        },
      },
    }));
  };

  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-8 text-[#4b5563]">
      {" "}
      {/* 🔖 px-4 改小，py-8 改小 */}
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-3 text-[#cfa7b4]">114 P&C 銜接課程調查表</h1> {/* 🔖 text-3xl */}
      <p className="text-center text-base mb-6 text-[#6b7280]">
        {" "}
        {/* 🔖 text-base */}
        為了安排最適合您的課程，請協助填寫以下資料，我們期待與您一同前行 🌸
      </p>
      {/* 課表 Image */}
      <div className="mb-8">
        {" "}
        {/* 🔖 mb-8 */}
        <img src="/schedule.png" alt="課程表" className="w-full max-w-md mx-auto rounded-2xl shadow-sm" />{" "}
        {/* 🔖 max-w-md, rounded-2xl, shadow-sm */}
      </div>
      {/* Form */}
      <form className="space-y-8 max-w-xl mx-auto">
        {" "}
        {/* 🔖 space-y-8 */}
        {/* 基本資料 */}
        <section className="bg-white p-6 rounded-2xl shadow-sm">
          {" "}
          {/* 🔖 p-6, rounded-2xl */}
          <h2 className="text-2xl font-semibold mb-4 text-[#cfa7b4] text-center">基本資料</h2>
          <div className="flex flex-col gap-4">
            {[
              { type: "text", placeholder: "學生姓名", value: formData.studentName, key: "studentName" },
              { type: "text", placeholder: "學校年級 例：五福二", value: formData.schoolGrade, key: "schoolGrade" },
              { type: "text", placeholder: "手機號碼", value: formData.parentPhone, key: "parentPhone" },
            ].map((field, idx) => (
              <input
                key={idx}
                type={field.type}
                placeholder={field.placeholder}
                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#f9ccd3] focus:outline-none bg-[#fafafa] text-sm"
                value={field.value}
                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
              />
            ))}

            {/* 所屬分校 */}
            <select
              className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#f9ccd3] focus:outline-none bg-[#fafafa] text-sm text-gray-500"
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
            >
              <option value="">選擇所屬分校</option>
              <option value="總校">總校</option>
              <option value="分校A">分校A</option>
              <option value="分校B">分校B</option>
              <option value="分校C">分校C</option>
            </select>

            {/* 葷素 */}
            <select
              className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#f9ccd3] focus:outline-none bg-[#fafafa] text-sm text-gray-500"
              value={formData.diet}
              onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
            >
              <option value="">選擇飲食習慣</option>
              <option value="葷食">葷食</option>
              <option value="素食">素食</option>
            </select>
          </div>
        </section>
        {/* 課程選擇 */}
        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-[#94c9ad] text-center">課程選擇</h2>

          <div className="flex flex-col space-y-3">
            {courses.map((course, idx) => {
              const selected = !!formData.selectedCourses[idx];
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl transition border ${
                    selected ? "bg-[#fef9fa] border-[#f9ccd3] shadow-sm" : "bg-[#fafafa] border-gray-200"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => handleCourseSelect(idx)}
                      className="accent-[#94c9ad] w-5 h-5 mt-1 shrink-0"
                    />

                    {/* 課程資訊 */}
                    <div className="flex flex-col w-full">
                      {/* 課程主資訊 */}
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-700 text-sm leading-snug">
                          <span className="text-[#cfa7b4]">{course.date}</span>・
                          <span className="text-[#94c9ad]">{course.subject}</span>《{course.name}》
                        </span>
                      </div>

                      {/* 課程次資訊：時間 & 講師 */}
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                        <div>講師｜{course.lecturer}</div>
                        <div className="whitespace-nowrap">
                          {course.timeStart} ~ {course.timeEnd}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 選課後展開更多 */}
                  {selected && (
                    <div className="mt-4 flex flex-col gap-3">
                      {/* Transportation */}
                      <div className="flex flex-col text-xs">
                        <label className="text-gray-500 mb-1">交通方式</label>
                        <select
                          className="border border-gray-300 rounded-xl p-2 bg-white focus:ring-2 focus:ring-[#cfa7b4] text-sm"
                          value={formData.selectedCourses[idx].transportation}
                          onChange={(e) => handleTransportationChange(idx, e.target.value)}
                        >
                          <option value="">選擇交通方式</option>
                          {transportationOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Location */}
                      <div className="flex flex-col text-xs">
                        <label className="text-gray-500 mb-1">上課地點</label>
                        <select
                          className="border border-gray-300 rounded-xl p-2 bg-white focus:ring-2 focus:ring-[#94c9ad] text-sm"
                          value={formData.selectedCourses[idx].location}
                          onChange={(e) => handleLocationChange(idx, e.target.value)}
                        >
                          <option value="">選擇上課地點</option>
                          {Object.entries(course.location)
                            .filter(([_, available]) => available)
                            .map(([loc]) => (
                              <option key={loc} value={loc}>
                                {loc}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
        {/* 提交按鈕 */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#cfa7b4] hover:bg-[#f9ccd3] text-white font-bold py-3 px-10 rounded-full shadow-md transform hover:scale-105 transition text-sm"
          >
            提交表單
          </button>
        </div>
      </form>
    </main>
  );
}
