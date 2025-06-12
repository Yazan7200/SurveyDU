import SurveyAnalytics from "@/components/analytics/survey-analytics"

// Mock surveys data - in a real app, this would come from your database or API
const surveys = [
  { id: '1', title: "Student Satisfaction Survey" },
  { id: '2', title: "Course Feedback: Introduction to Programming" },
  { id: '3', title: "Campus Facilities Evaluation" },
  { id: '4', title: "Library Services Feedback" },
  { id: '5', title: "Student Mental Health Assessment" },
  { id: '6', title: "Course Evaluation: Advanced Programming" },
  { id: '7', title: "Teaching Methods Feedback" },
  { id: '8', title: "Laboratory Equipment Assessment" },
  { id: '9', title: "Research Project Interest Survey" },
  { id: '10', title: "Academic Resources Evaluation" }
]

export function generateStaticParams() {
  // Return an array of objects with the id parameter for each survey
  return surveys.map((survey) => ({
    id: survey.id
  }))
}

export default function SurveyAnalyticsPage() {
  return <SurveyAnalytics />
}
