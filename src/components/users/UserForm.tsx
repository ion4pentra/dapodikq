import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

const userFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  role: z.string().min(1, { message: "Please select a role" }),
  isActive: z.boolean().default(true),
  permissions: z.array(z.string()).optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  user?: UserFormValues;
  onSubmit?: (data: UserFormValues) => void;
  isEditing?: boolean;
}

const defaultUser: UserFormValues = {
  name: "",
  email: "",
  role: "",
  isActive: true,
  permissions: [],
};

const UserForm = ({
  user = defaultUser,
  onSubmit,
  isEditing = false,
}: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: user,
  });

  const watchRole = watch("role");

  const handleFormSubmit = (data: UserFormValues) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  const permissions = [
    { id: "view_students", label: "View Students" },
    { id: "edit_students", label: "Edit Students" },
    { id: "view_attendance", label: "View Attendance" },
    { id: "edit_attendance", label: "Edit Attendance" },
    { id: "view_reports", label: "View Reports" },
    { id: "manage_users", label: "Manage Users" },
    { id: "dapodik_integration", label: "Dapodik Integration" },
  ];

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-md">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit User" : "Add New User"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter full name"
              {...register("name")}
              className={cn(errors.name && "border-red-500")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              {...register("email")}
              className={cn(errors.email && "border-red-500")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">User Role</Label>
            <Select
              defaultValue={user.role}
              onValueChange={(value) => setValue("role", value)}
            >
              <SelectTrigger
                id="role"
                className={cn(errors.role && "border-red-500")}
              >
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="principal">Principal</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={user.isActive}
              onCheckedChange={(checked) => {
                setValue("isActive", checked as boolean);
              }}
            />
            <Label htmlFor="isActive">Active Account</Label>
          </div>

          {watchRole && (
            <div className="space-y-3">
              <Label>Permissions</Label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={permission.id}
                      checked={user.permissions?.includes(permission.id)}
                      onCheckedChange={(checked) => {
                        const currentPermissions = user.permissions || [];
                        if (checked) {
                          setValue("permissions", [
                            ...currentPermissions,
                            permission.id,
                          ]);
                        } else {
                          setValue(
                            "permissions",
                            currentPermissions.filter(
                              (p) => p !== permission.id,
                            ),
                          );
                        }
                      }}
                    />
                    <Label htmlFor={permission.id}>{permission.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : isEditing
                ? "Update User"
                : "Create User"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UserForm;
