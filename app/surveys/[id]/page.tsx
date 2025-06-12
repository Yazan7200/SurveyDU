import SurveyParticipation from "@/components/surveys/survey-participation"

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ]
}

export default function SurveyParticipationPage() {
  return <SurveyParticipation />
}
