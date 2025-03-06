"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Pen, Trash2Icon } from "lucide-react"
import { router, Link } from "@inertiajs/react"
import { useState, useEffect } from "react"
import { type PSGCRegion, type PSGCProvince, type PSGCCity } from '@/types/psgc';

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
        cell: ({ row }) => {
            const [regionName, setRegionName] = useState<string>("");
            
            useEffect(() => {
                const fetchRegionName = async () => {
                    try {
                        const response = await fetch('https://psgc.gitlab.io/api/regions/');
                        const regions: PSGCRegion[] = await response.json();
                        const region = regions.find(r => r.code === row.getValue("region"));
                        setRegionName(region?.name || row.getValue("region"));
                    } catch (error) {
                        console.error('Error fetching region:', error);
                        setRegionName(row.getValue("region"));
                    }
                };
                fetchRegionName();
            }, []);

            return regionName;
        }
    },
    {
        accessorKey: "province",
        header: "Province",
        cell: ({ row }) => {
            const [provinceName, setProvinceName] = useState<string>("");
            const regionCode = row.getValue("region");
            
            useEffect(() => {
                const fetchProvinceName = async () => {
                    try {
                        const response = await fetch(`https://psgc.gitlab.io/api/regions/${regionCode}/provinces/`);
                        const provinces: PSGCProvince[] = await response.json();
                        const province = provinces.find(p => p.code === row.getValue("province"));
                        setProvinceName(province?.name || row.getValue("province"));
                    } catch (error) {
                        console.error('Error fetching province:', error);
                        setProvinceName(row.getValue("province"));
                    }
                };
                if (regionCode) {
                    fetchProvinceName();
                }
            }, [regionCode]);

            return provinceName;
        }
    },
    {
        accessorKey: "city",
        header: "City/Municipality",
        cell: ({ row }) => {
            const [cityName, setCityName] = useState<string>("");
            const provinceCode = row.getValue("province");
            
            useEffect(() => {
                const fetchCityName = async () => {
                    try {
                        const response = await fetch(`https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities/`);
                        const cities: PSGCCity[] = await response.json();
                        const city = cities.find(c => c.code === row.getValue("city"));
                        setCityName(city?.name || row.getValue("city"));
                    } catch (error) {
                        console.error('Error fetching city:', error);
                        setCityName(row.getValue("city"));
                    }
                };
                if (provinceCode) {
                    fetchCityName();
                }
            }, [provinceCode]);

            return cityName;
        }
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
                <Link href={route('applicants.edit', applicant.id)}>
                    <Button variant="secondary" size="sm" className="cursor-pointer">
                        <Pen className="h-4 w-4" />
                    </Button>
                </Link>
                <Button variant="destructive" size="sm" className="cursor-pointer" onClick={handleDelete}>
                    <Trash2Icon className="h-4 w-4" />
                </Button>
            </div>
        )
        },
    },
]