/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { createStudent } from "@/services/student.service";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// // Client-side schema verification before sending to the server
// const schema = z.object({
//   name: z.string().min(3, "Name must be at least 3 characters"),
//   email: z.string().email("Invalid email format").optional().or(z.literal("")),
//   phone: z.string().optional(),
// });

// type FormData = z.infer<typeof schema>;

// export function StudentForm() {
//   const router = useRouter();
  
//   const form = useForm<FormData>({
//     resolver: zodResolver(schema),
//     defaultValues: { 
//       name: "", 
//       email: "", 
//       phone: "" 
//     }
//   });

//   const { errors, isSubmitting } = form.formState;

//   async function onSubmit(values: FormData) {
//     try {
//       await createStudent(values);
//             toast.success("Student created successfully.");
//       form.reset();
//       router.refresh(); 
//     } catch (apiError: any) {
//       // console.error("Backend Error payload received:", apiError);
      
//       // Extract structured dictionary object from API wrapper
//       const backendErrors = apiError?.error; 

//       if (backendErrors) {
//         // Iterate over validation error keys returned by API (e.g., "Name", "Phone")
//         Object.keys(backendErrors).forEach((serverKey) => {
//           // Convert C# PascalCase key to JS camelCase schema key ("Phone" -> "phone")
//           const formKey = serverKey.toLowerCase() as keyof FormData;
//           const messages = backendErrors[serverKey];

//           if (messages && messages.length > 0) {
//           form.setError(formKey, {  type: "server", message: messages[0],  });
//             // form.setError(formKey, { type: "server",message: messages[0], });
//           }
//         });
//       } else {
//         // Fallback error registration if the API throws a generic exception message
//         form.setError("root", {
//           type: "server",
//           message: apiError?.message || "An unexpected error occurred.",
//         });
//       }
//     }
//   }

//   return (
//     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col max-w-sm">
      
//       {/* Fallback Global API Error Notification Panel */}
//       {errors.root && (
//         <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded font-medium text-sm">
//           {errors.root.message}
//         </div>
//       )}

//       {/* Name Input Component Block */}
//       <div className="flex flex-col">
//         <label className="text-sm font-medium mb-1">Full Name</label>
//         <input 
//           {...form.register("name")} 
//           placeholder="Name" 
//           className="border p-2 rounded w-full border-gray-300 focus:outline-blue-500" 
//         />
//         {errors.name && (
//           <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//         )}
//       </div>

//       {/* Email Input Component Block */}
//       <div className="flex flex-col">
//         <label className="text-sm font-medium mb-1">Email Address</label>
//         <input 
//           {...form.register("email")} 
//           placeholder="Email" 
//           className="border p-2 rounded w-full border-gray-300 focus:outline-blue-500" 
//         />
//         {errors.email && (
//           <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//         )}
//       </div>

//       {/* Phone Input Component Block */}
//       <div className="flex flex-col">
//         <label className="text-sm font-medium mb-1">Phone Number</label>
//         <input 
//           {...form.register("phone")} 
//           placeholder="Phone" 
//           className="border p-2 rounded w-full border-gray-300 focus:outline-blue-500" 
//         />
//         {errors.phone && (
//           <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
//         )}
//       </div>

//       {/* Action Processing Controller Button */}
//       <button 
//         type="submit" 
//         disabled={isSubmitting}
//         className="bg-blue-600 text-white p-2 rounded font-medium mt-2 transition-colors hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
//       >
//         {isSubmitting ? "Saving..." : "Save Student Info"}
//       </button>
//     </form>
//   );
// }
import { createStudent, updateStudent } from "@/services/student.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";



import { z } from "zod";
import { useEffect } from "react";


// Client-side schema verification before sending to the server
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string(),//.email("Invalid email address"),
  phone: z.string()//.min(10, "Phone must be at least 10 characters"),
});

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface StudentFormProps {
  student?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

export function StudentForm({ student }: StudentFormProps) {
  const isEdit = !!student;
  const router = useRouter();
  
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: student ? { 
      name: student.name, 
      email: student.email, 
      phone: student.phone 
    } : { 
      name: "", 
      email: "", 
      phone: "" 
    }
  });

  const { errors, isSubmitting } = form.formState;

  useEffect(() => {
    if (student) {
      form.reset({
        name: student.name,
        email: student.email,
        phone: student.phone,
      });
    }
  }, [student, form]);

  async function onSubmit(values: FormData) {
    try {
      if (isEdit && student) {
        await updateStudent(student.id, values);
        toast.success("Student updated successfully.");
      } else {
        await createStudent(values);
        toast.success("Student created successfully.");
        form.reset();
      }
      router.refresh(); 
    } catch (apiError: any) {
      const backendErrors = apiError?.error; 

      if (backendErrors) {
        Object.keys(backendErrors).forEach((serverKey) => {
          const formKey = serverKey.toLowerCase() as keyof FormData;
          const messages = backendErrors[serverKey];

          if (messages && messages.length > 0) {
            form.setError(formKey, { type: "server", message: messages[0] });
          }
        });
      } else {
        form.setError("root", {
          type: "server",
          message: apiError?.message || "An unexpected error occurred.",
        });
      }
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col max-w-sm">
      
      {errors.root && (
        <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded font-medium text-sm">
          {errors.root.message}
        </div>
      )}

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Full Name</label>
        <input 
          {...form.register("name")} 
          placeholder="Name" 
          className="border p-2 rounded w-full border-gray-300 focus:outline-blue-500" 
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Email Address</label>
        <input 
          {...form.register("email")} 
          placeholder="Email" 
          className="border p-2 rounded w-full border-gray-300 focus:outline-blue-500" 
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Phone Number</label>
        <input 
          {...form.register("phone")} 
          placeholder="Phone" 
          className="border p-2 rounded w-full border-gray-300 focus:outline-blue-500" 
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      <button 
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Saving..." : (isEdit ? "Update Student" : "Create Student")}
      </button>
    </form>
  );
}