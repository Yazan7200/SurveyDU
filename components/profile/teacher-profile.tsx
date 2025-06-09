"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Mock teacher data
const teacherData = {
  id: "T5678",
  firstName: "Dr. Sarah",
  lastName: "almoualem",
  email: "sarah.almoualem@gmail.com",
  department: "هندسة الحواسيب والأتمتة",
  position: "Associate Professor",
  officeLocation: "البناء الاحمر, المكتب 5",
  officeHours: "Monday and Wednesday, 2-4 PM",
  phoneNumber: "+963 985 884 654",
  researchInterests: "Artificial Intelligence, Machine Learning, Data Science",
};

// Personal Information Form Schema
const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  department: z.string({ required_error: "Please select a department." }),
  position: z
    .string()
    .min(2, { message: "Position must be at least 2 characters." }),
  officeLocation: z
    .string()
    .min(2, { message: "Office location must be at least 2 characters." }),
  officeHours: z
    .string()
    .min(2, { message: "Office hours must be at least 2 characters." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Please enter a valid phone number." }),
  researchInterests: z.string(),
});

// Password Change Form Schema
const passwordChangeSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function TeacherProfile() {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal-info");

  // Personal Information Form

  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: teacherData.firstName || "",
      lastName: teacherData.lastName || "", // يفضل تغير listName إلى lastName في teacherData
      department: teacherData.department,
      position: teacherData.position,
      officeLocation: teacherData.officeLocation,
      officeHours: teacherData.officeHours,
      phoneNumber: teacherData.phoneNumber,
      researchInterests: teacherData.researchInterests,
    },
  });

  // Password Change Form
  const passwordChangeForm = useForm<z.infer<typeof passwordChangeSchema>>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle Personal Information Form Submission
  const onPersonalInfoSubmit = (values: z.infer<typeof personalInfoSchema>) => {
    // In a real app, you would submit the form data to your API
    console.log("Personal Info Form submitted:", values);

    // Show success toast
    toast({
      title: "Profile Updated",
      description: "Your personal information has been updated successfully.",
    });
  };

  // Handle Password Change Form Submission
  const onPasswordChangeSubmit = (
    values: z.infer<typeof passwordChangeSchema>
  ) => {
    // In a real app, you would submit the form data to your API
    console.log("Password Change Form submitted:", values);

    // Show success toast
    toast({
      title: "Password Changed",
      description: "Your password has been changed successfully.",
    });

    // Reset form
    passwordChangeForm.reset({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Teacher Profile
            </h1>
            <p className="text-gray-500">
              Manage your personal information and password
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => router.push("/dashboard/teacher")}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal-info">
              Personal Information
            </TabsTrigger>
            <TabsTrigger value="change-password">Change Password</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal-info">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <Form {...personalInfoForm}>
                <form
                  onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)}
                >
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* First Name */}
                        <FormField
                          control={personalInfoForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Last Name */}
                        <FormField
                          control={personalInfoForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Email (Non-editable) */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={teacherData.email}
                          disabled
                          className="bg-gray-100"
                        />
                        <p className="text-xs text-gray-500">
                          Email cannot be changed
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Department */}
                      <FormField
                        control={personalInfoForm.control}
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Department</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="الميكانيك العام">
                                  هندسة الميكانيك العام   
                                </SelectItem>
                                <SelectItem value="التصميم">هندسة التصميم الميكانيكي</SelectItem>
                                <SelectItem value="الطاقة">هندسة الطاقة الكهربائية</SelectItem>
                                <SelectItem value="الحواسيب">هندسة الحواسيب والأتمتة</SelectItem>
                                <SelectItem value="النسيجية">هندسة ميكانيك الصناعات النسيجية وتقاناتها</SelectItem>
                                <SelectItem value="السيارات">هندسة السيارات والآليات الثقيلة</SelectItem>
                                <SelectItem value="الالكترونيات">هندسة الالكترونيات والاتصالات</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Position */}
                      <FormField
                        control={personalInfoForm.control}
                        name="position"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Position</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select position" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Professor">
                                  Professor
                                </SelectItem>
                                <SelectItem value="Associate Professor">
                                  Associate Professor
                                </SelectItem>
                                <SelectItem value="Assistant Professor">
                                  Assistant Professor
                                </SelectItem>
                                <SelectItem value="Lecturer">
                                  Lecturer
                                </SelectItem>
                                <SelectItem value="Adjunct Professor">
                                  Adjunct Professor
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Office Location */}
                      <FormField
                        control={personalInfoForm.control}
                        name="officeLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Office Location</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Office Hours */}
                      <FormField
                        control={personalInfoForm.control}
                        name="officeHours"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Office Hours</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Phone Number */}
                    <FormField
                      control={personalInfoForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Research Interests */}
                    <FormField
                      control={personalInfoForm.control}
                      name="researchInterests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Research Interests</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Separate multiple research interests with commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="bg-[#FF9814] hover:bg-orange-600"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>

          {/* Change Password Tab */}
          <TabsContent value="change-password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <Form {...passwordChangeForm}>
                <form
                  onSubmit={passwordChangeForm.handleSubmit(
                    onPasswordChangeSubmit
                  )}
                >
                  <CardContent className="space-y-4">
                    {/* Current Password */}
                    <FormField
                      control={passwordChangeForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* New Password */}
                    <FormField
                      control={passwordChangeForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormDescription>
                            Password must be at least 8 characters long.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Confirm Password */}
                    <FormField
                      control={passwordChangeForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="bg-[#FF9814] hover:bg-orange-600"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
