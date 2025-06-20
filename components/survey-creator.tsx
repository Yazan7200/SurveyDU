"use client";

import React, { useState } from "react";
import { FileText } from "lucide-react";
import {
  Search,
  Radio,
  Star,
  CheckSquare,
  List,
  FileUp,
  ImageIcon,
  BarChart2,
  Type,
  MoreHorizontal,
  HelpCircle,
  Undo2,
  Redo2,
  Scissors,
  AlignLeft,
  Maximize2,
  Trash2,
  Plus,
  Save,
  Calendar,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { format } from "date-fns";
import { createSurvey } from "@/lib/services/survey-service";
import { motion, AnimatePresence } from "framer-motion";

// Import question type components
import RadioButtonGroup from "./question-types/RadioButtonGroup";
import RatingScale from "./question-types/RatingScale";
import Checkboxes from "./question-types/Checkboxes";
import Dropdown from "./question-types/Dropdown";
import MultiSelectDropdown from "./question-types/MultiSelectDropdown";
import YesNo from "./question-types/YesNo";
import SingleLineInput from "./question-types/SingleLineInput";
import LongText from "./question-types/LongText";

interface QuestionType {
  icon: React.ReactElement;
  name: string;
  component: () => React.ReactElement;
  type: string;
}

interface QuestionData {
  id: number;
  type: QuestionType;
  questionText: string;
  options?: { id: number; text: string }[];
}

interface SurveyMetadata {
  title: string;
  description: string;
  pointsReward: number;
  startDate: string;
  endDate: string;
  requiredParticipants: number;
  targetAcademicYear: number;
  targetMajor: string;
  targetGender: number;
  publishImmediately: boolean;
}

export default function SurveyCreator() {
  const [activeTab, setActiveTab] = useState("designer");
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [lastSelectedType, setLastSelectedType] = useState<QuestionType | null>(null);
  const [metadata, setMetadata] = useState<SurveyMetadata>({
    title: "",
    description: "",
    pointsReward: 100,
    startDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    endDate: format(new Date().setMonth(new Date().getMonth() + 1), "yyyy-MM-dd'T'HH:mm:ss"),
    requiredParticipants: 50,
    targetAcademicYear: 0,
    targetMajor: "",
    targetGender: 0,
    publishImmediately: true
  });

  const questionTypes: QuestionType[] = [
    { icon: <Radio className="h-4 w-4" />, name: "Radio Button Group", component: RadioButtonGroup, type: "single_answer" },
    { icon: <Star className="h-4 w-4" />, name: "Rating Scale", component: RatingScale, type: "percentage" },
    { icon: <CheckSquare className="h-4 w-4" />, name: "Checkboxes", component: Checkboxes, type: "multiple_choice" },
    { icon: <List className="h-4 w-4" />, name: "Dropdown", component: Dropdown, type: "single_answer" },
    { icon: <List className="h-4 w-4" />, name: "Multi-Select Dropdown", component: MultiSelectDropdown, type: "multiple_choice" },
    { icon: <Radio className="h-4 w-4" />, name: "Yes/No (Boolean)", component: YesNo, type: "single_answer" },
    { icon: <Type className="h-4 w-4" />, name: "Single-Line Input", component: SingleLineInput, type: "open_text" },
    { icon: <FileText className="h-4 w-4" />, name: "Long Text", component: LongText, type: "open_text" },
  ];

  const handleQuestionTypeClick = (type: QuestionType) => {
    if (questions.length > 0) {
      const lastQuestion = questions[questions.length - 1];
      if (!lastQuestion.questionText.trim()) {
        toast.error("Please fill in the question text for the previous question before adding a new one.");
        return;
      }
    }

    const newQuestion: QuestionData = {
      id: Date.now(),
      type: type,
      questionText: "",
      options: [],
    };

    setQuestions([...questions, newQuestion]);
    setLastSelectedType(type);
  };

  const handleAddQuestion = () => {
    if (questions.length > 0) {
      const lastQuestion = questions[questions.length - 1];
      if (!lastQuestion.questionText.trim()) {
        toast.error("Please fill in the question text for the previous question before adding a new one.");
        return;
      }
    }

    const typeToAdd = lastSelectedType || questionTypes[0];
    const newQuestion: QuestionData = {
      id: Date.now(),
      type: typeToAdd,
      questionText: "",
      options: [],
    };

    setQuestions([...questions, newQuestion]);
    setLastSelectedType(typeToAdd);
  };

  const updateQuestionText = (questionId: number, text: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, questionText: text } : q
    ));
  };

  const removeQuestion = (indexToRemove: number) => {
    setQuestions(questions.filter((_, index) => index !== indexToRemove));
  };

  const handleMetadataChange = (key: keyof SurveyMetadata, value: string | number | boolean) => {
    setMetadata(prev => ({ ...prev, [key]: value }));
  };

  const formatSurveyData = () => {
    const formattedQuestions = questions.map((q, index) => ({
      questionId: index + 1,
      questionText: q.questionText,
      questionType: q.type.type,
      isRequired: true,
      questionOrder: index + 1,
      options: q.options || []
    }));

    return {
      data: {
        surveyId: Date.now(),
        ...metadata,
        status: 1,
        currentParticipants: 0,
        questions: formattedQuestions
      }
    };
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!metadata.title || !metadata.description) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Validate questions
      if (questions.length === 0) {
        toast.error("Please add at least one question");
        return;
      }

      // Check if all questions have text
      const emptyQuestions = questions.filter(q => !q.questionText.trim());
      if (emptyQuestions.length > 0) {
        toast.error("Please fill in all question texts");
        return;
      }

      // Format the survey data
      const surveyData = formatSurveyData();

      // Show loading toast
      toast.loading("Saving survey...");

      // Send to API
      const response = await createSurvey(surveyData);

      if (response.success) {
        toast.success(response.message);
        // You might want to redirect to a success page or survey list
        // router.push('/surveys');
      } else {
        toast.error(response.message || "Failed to create survey");
      }
    } catch (error) {
      console.error('Error saving survey:', error);
      toast.error("An error occurred while saving the survey");
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] relative overflow-hidden">
      {/* Left Sidebar - Question Types - Fixed */}
      <div className="w-56 bg-white border-r border-gray-200 overflow-y-auto fixed left-0 top-16 bottom-0">
        <div className="space-y-1 px-2 py-4">
          {questionTypes.map((type, index) => (
            <motion.button
              key={index}
              className={`flex items-center w-full px-2 py-2 text-sm text-left rounded-md hover:bg-gray-100 ${
                lastSelectedType === type ? "bg-gray-100" : ""
              }`}
              onClick={() => handleQuestionTypeClick(type)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-emerald-500 mr-2">
                {type.icon}
              </span>
              {type.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Content Area - Scrollable with fixed margins */}
      <div className="flex-1 flex flex-col ml-56 mr-72">
        {/* Survey Canvas - Scrollable */}
        <div className="flex-1 bg-gray-100 overflow-y-auto h-full">
          <div className="p-4 space-y-4 pb-20">
            {/* Survey Metadata - Animated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-6 mb-4"
            >
              <h2 className="text-lg font-semibold mb-4">Survey Details</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Survey Title
                  </label>
                  <Input
                    id="title"
                    placeholder="Enter survey title"
                    value={metadata.title}
                    onChange={(e) => handleMetadataChange("title", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="pointsReward" className="text-sm font-medium text-gray-700">
                      Points Reward
                    </label>
                    <Input
                      id="pointsReward"
                      type="number"
                      placeholder="Enter points"
                      value={metadata.pointsReward}
                      onChange={(e) => handleMetadataChange("pointsReward", parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="requiredParticipants" className="text-sm font-medium text-gray-700">
                      Required Participants
                    </label>
                    <Input
                      id="requiredParticipants"
                      type="number"
                      placeholder="Enter number"
                      value={metadata.requiredParticipants}
                      onChange={(e) => handleMetadataChange("requiredParticipants", parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      value={metadata.startDate.slice(0, 16)}
                      onChange={(e) => handleMetadataChange("startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      value={metadata.endDate.slice(0, 16)}
                      onChange={(e) => handleMetadataChange("endDate", e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Target Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="targetAcademicYear" className="text-sm font-medium text-gray-700">
                      Target Academic Year
                    </label>
                    <Select value={metadata.targetAcademicYear.toString()} onValueChange={(value) => handleMetadataChange("targetAcademicYear", parseInt(value))}>
                      <SelectTrigger>
                        <div className="flex items-center">
                          <span>
                            {metadata.targetAcademicYear === 0 ? "All Years" :
                             metadata.targetAcademicYear === 6 ? "Graduation" :
                             `Year ${metadata.targetAcademicYear}`}
                          </span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">All Years</SelectItem>
                        <SelectItem value="1">First Year</SelectItem>
                        <SelectItem value="2">Second Year</SelectItem>
                        <SelectItem value="3">Third Year</SelectItem>
                        <SelectItem value="4">Fourth Year</SelectItem>
                        <SelectItem value="5">Fifth Year</SelectItem>
                        <SelectItem value="6">Graduation</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <label htmlFor="targetMajor" className="text-sm font-medium text-gray-700">
                      Target Major
                  </label>
                  <Input
                      id="targetMajor"
                      placeholder="Enter target major"
                      value={metadata.targetMajor}
                      onChange={(e) => handleMetadataChange("targetMajor", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="targetGender" className="text-sm font-medium text-gray-700">
                      Target Gender
                    </label>
                    <Select value={metadata.targetGender.toString()} onValueChange={(value) => handleMetadataChange("targetGender", parseInt(value))}>
                      <SelectTrigger>
                        <div className="flex items-center">
                          <span>{metadata.targetGender === 0 ? "All" : metadata.targetGender === 1 ? "Male" : "Female"}</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">All</SelectItem>
                        <SelectItem value="1">Male</SelectItem>
                        <SelectItem value="2">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                      <Checkbox
                        checked={metadata.publishImmediately}
                        onCheckedChange={(checked) => handleMetadataChange("publishImmediately", checked)}
                  />
                      <span>Publish Immediately</span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {/* Questions List - Animated */}
              {questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8 rounded-full shadow-lg"
                      onClick={() => removeQuestion(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Enter your question"
                        className={`text-lg font-semibold mb-4 ${!question.questionText.trim() ? 'border-red-500 pr-10' : ''}`}
                        value={question.questionText}
                        onChange={(e) => updateQuestionText(question.id, e.target.value)}
                      />
                      {!question.questionText.trim() && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <question.type.component />
                  </div>
                </motion.div>
              ))}

              {/* Empty State - Animated */}
              {questions.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-sm flex flex-col items-center justify-center text-center p-8"
                >
              <div className="max-w-md">
                <div className="mb-6">
                  <img
                        src="/img/fail.png"
                    alt="Empty form illustration"
                    className="mx-auto w-40 h-40 opacity-50"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Your form is empty
                </h2>
                <p className="text-gray-500 mb-6">
                      Click the button below to add your first question
                    </p>
                    <Button
                      className="bg-emerald-500 hover:bg-emerald-600 text-white"
                      onClick={handleAddQuestion}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Add Question Button - Animated */}
            {questions.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center mt-4"
              >
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={handleAddQuestion}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add {lastSelectedType?.name || "Radio Button Group"}
                </Button>
              </motion.div>
            )}
              </div>
            </div>
          </div>

      {/* Right Sidebar - Settings - Fixed */}
      <div className="w-72 bg-white border-l border-gray-200 fixed right-0 top-16 bottom-0">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-medium">Survey Settings</h3>
              <button className="p-1 rounded hover:bg-gray-100">
                <Maximize2 className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-lg font-medium mb-2">
            Survey Summary
              </h3>
              <p className="text-sm text-gray-500 mb-4">
            Total Questions: {questions.length}
          </p>
        </div>
      </div>

      {/* Save Button - Fixed at bottom */}
      {questions.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-end px-8 shadow-lg"
        >
          <Button
            className="bg-emerald-500 hover:bg-emerald-600 text-white min-w-[120px]"
            onClick={handleSave}
            disabled={!metadata.title || !metadata.description}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Survey
          </Button>
        </motion.div>
      )}
    </div>
  );
}
