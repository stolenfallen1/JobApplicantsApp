import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { DataTable } from "@/components/data-table/data-table"
import { columns, type Applicant } from "@/components/data-table/columns"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface PageProps {
    applicants: Applicant[];
}

export default function Dashboard({ applicants }: PageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Job Applicants</h2>
            <Link href="/applicants/create">
                <Button className="cursor-pointer">
                <Plus className="mr-2 h-4 w-4" />
                Add Applicant
                </Button>
            </Link>
            </div>

            <DataTable columns={columns} data={applicants || []} />
        </div>
        </AppLayout>
    );
}
