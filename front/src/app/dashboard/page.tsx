"use client";

import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import courses from "@/data/courses";

interface Submission {
  studentName: string;
  schoolGrade: string;
  parentPhone: string;
  branch: string;
  diet: string;
  selectedCourses: Record<number, { transportation: string; location: string }>;
  submittedAt: string;
}

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/submissions");
        const data = await res.json();
        setSubmissions(data.reverse());
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const exportCSV = () => {
    const header = ["學生姓名", "學校年級", "手機號碼", "所屬分校", "飲食習慣", "報名課程", "提交時間"];

    const rows = submissions.map((submission) => {
      const coursesList = Object.entries(submission.selectedCourses)
        .map(([index, course]) => {
          const courseDetails = courses[Number(index)];
          return `${courseDetails.date}｜${courseDetails.subject}｜${courseDetails.name} - ${course.transportation}${
            course.transportation !== "自行前往" ? `（${course.location}）` : ""
          }`;
        })
        .join("\n");

      return [
        submission.studentName,
        submission.schoolGrade,
        submission.parentPhone,
        submission.branch,
        submission.diet,
        coursesList,
        new Date(submission.submittedAt).toLocaleString(),
      ];
    });

    const csvContent =
      "data:text/csv;charset=utf-8," + [header, ...rows].map((e) => e.map((v) => `"${v}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, "submissions.csv");
  };

  if (loading) {
    return <main className="min-h-screen flex items-center justify-center text-[#94c9ad] text-xl">加載中...</main>;
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-12 text-[#4b5563]">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#cfa7b4]">管理後台 - 調查表提交紀錄</h1>

      <div className="max-w-6xl mx-auto mb-8 text-center">
        <button
          onClick={exportCSV}
          className="bg-[#94c9ad] hover:bg-[#cfa7b4] text-white font-bold py-3 px-8 rounded-full shadow-md transform hover:scale-105 transition text-sm"
        >
          匯出 CSV
        </button>
      </div>

      {submissions.length === 0 ? (
        <p className="text-center text-gray-400">目前尚無提交資料。</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden text-sm">
            <thead className="bg-[#f9ccd3] text-white uppercase tracking-wider text-md">
              <tr>
                {["學生姓名", "學校年級", "手機號碼", "分校", "飲食", "報名課程", "提交時間"].map((title) => (
                  <th key={title} className="p-2 text-center font-semibold whitespace-nowrap">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {submissions.map((submission, index) => (
                <tr key={index} className="hover:bg-[#fef9fa] transition-all duration-200 ease-in-out">
                  <td className="p-2 text-center text-gray-700">{submission.studentName}</td>
                  <td className="p-2 text-center text-gray-500">{submission.schoolGrade}</td>
                  <td className="p-2 text-center text-gray-500">{submission.parentPhone}</td>
                  <td className="p-2 text-center text-[#94c9ad] font-medium">{submission.branch}</td>
                  <td className="p-2 text-center text-[#cfa7b4]">{submission.diet}</td>
                  <td className="p-2">
                    <ul className="list-disc list-inside text-left space-y-0.5">
                      {Object.entries(submission.selectedCourses).map(([idx, course], i) => {
                        const courseDetails = courses[Number(idx)];
                        return (
                          <li key={i} className="text-gray-600">
                            {`${courseDetails.date}｜${courseDetails.subject}｜${courseDetails.name} - `}
                            <span className="text-[#94c9ad] ml-1">{course.transportation}</span>
                            {course.transportation !== "自行前往" && (
                              <span className="text-gray-400 ml-1">（{course.location}）</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                  <td className="p-2 text-center text-gray-400 text-xs">
                    {new Date(submission.submittedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
