"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Pen, Trash2Icon } from "lucide-react"
import { router } from "@inertiajs/react"

export type Applicant = {
    id: number
    region: string
    province: string
    city: string
    last_name: string
    first_name: string
    middle_name: string
    sex: string
    age: string
    marital_status: string
    course: string
}

export const columns: ColumnDef<Applicant>[] = [
    {
        accessorKey: "region",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Region
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "province",
        header: "Province",
    },
    {
        accessorKey: "city",
        header: "City",
    },
    {
        accessorKey: "last_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Last Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "first_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                First Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "middle_name",
        header: "Middle Name",
    },
    {
        accessorKey: "sex",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Sex
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "age",
        header: "Age",
    },
    {
        accessorKey: "marital_status",
        header: "Marital Status",
    },
    {
        accessorKey: "course",
        header: "Course",
    },
    {
        id: "actions",
        cell: ({ row }) => {
        const applicant = row.original

        const handleDelete = () => {
            if (confirm('Are you sure you want to delete this applicant?')) {
                router.delete(route('applicants.destroy', applicant.id), {
                    onSuccess: () => {
                        alert('Applicant deleted successfully');
                    },
                })
            }
        }

        return (
            <div className="space-x-2 flex justify-center items-center">
                <Button variant="secondary" size="sm" className="cursor-pointer">
                    <Pen className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" className="cursor-pointer" onClick={handleDelete}>
                    <Trash2Icon className="h-4 w-4" />
                </Button>
            </div>
        )
        },
    },
]