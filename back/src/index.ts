import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "data/formData.json");

interface FormData {
  studentName: string;
  schoolGrade: string;
  parentPhone: string;
  branch: string;
  diet: string;
  selectedCourses: Record<number, { transportation: string; location: string }>;
  submittedAt?: string;
}

const saveData = (data: FormData) => {
  const submissionWithTimestamp = {
    ...data,
    submittedAt: new Date().toISOString(),
  };

  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  let existingData: FormData[] = [];
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, "utf-8");
    existingData = JSON.parse(rawData) as FormData[];
  }

  existingData.push(submissionWithTimestamp);

  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
};

const loadData = (): FormData[] => {
  if (!fs.existsSync(filePath)) return [];

  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data) as FormData[];
};

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://59.127.99.53:3000"],
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.get("/api/submissions", (req, res) => {
  const submissions = loadData();
  res.status(200).json(submissions);
});

app.post("/api/submit", (req, res) => {
  const formData = req.body;
  saveData(formData);
  res.status(200).json({ message: "Form submitted successfully!" });
});

const ADMIN_PASSWORD = "pc2025admin";

app.post("/api/login", (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Incorrect password" });
  }
});

const PORT = 3500;

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
