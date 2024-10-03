"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Allocation } from "@/lib/types";
import * as XLSX from "xlsx";

export default function Component() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState("");
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // const handleChooseFileClick = () => {
  //   const fileInput = document.getElementById("file-upload") as HTMLInputElement;
  //   if (fileInput) {
  //     fileInput.click();
  //   }
  // };

  
  function saveData() {
    if (selectedFile) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          // SheetName
          const sheetName = workbook.SheetNames[0];
          // Worksheet
          const workSheet = workbook.Sheets[sheetName];
          // Json
          const json: Allocation[] = XLSX.utils.sheet_to_json(workSheet);
          //Save to the DB
          try {
            // console.log(json);
            await createBulkUsers(json);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        }
      };
      reader.readAsBinaryString(selectedFile);
    }
  }


  const handleUploadClick = () => {
    if (!selectedFile) {
      toast({
        description: "Please select a file first",
      });
      console.log("File selected:", selectedFile);

      // {TODO: toast belum muncul saat file berhasil import & belum hit API}

    } else {
      console.log("File selected:", selectedFile);
      redirect('/dashboard/alokasi')
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 py-12 md:px-6 lg:px-8">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Upload Excel</h1>
      </div>
      <div className="w-full max-w-md">
        <div>
            <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center gap-4 border-4 w-full h-96 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">.xlsx, .xls, csv</p>
                </div>
                <input
                    id="dropzone-file"
                    type="file"
                    accept=".xlsx, .xls"
                    className="hidden"
                    onChange={handleFileChange}
                />

            </label>

        </div>
        <div className="mt-4 flex justify-center">
            <Input disabled type="text" value={selectedFile ? selectedFile.name : "Upload File"} className="text-primary"/>
            <Button onClick={handleUploadClick}>Import Selected</Button>
        </div>
      </div>
    </div>
  );
}

// Create a single user in DB
async function createUser(data: Allocation) {
  try {
    const user = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

// Bulk create users
async function createBulkUsers(users: Allocation[]) {
  try {
    for (const user of users) {
      await createUser(user);
    }
  } catch (error) {
    console.error("Error creating bulk users:", error);
  }
}