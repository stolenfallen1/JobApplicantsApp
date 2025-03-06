import { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AppLayout from '@/layouts/app-layout';
import type { PSGCRegion, PSGCProvince, PSGCCity } from '@/types/psgc';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Add Applicant',
        href: '/applicants/create',
    },
];

export default function CreateApplicant() {
    const [regions, setRegions] = useState<PSGCRegion[]>([]);
    const [provinces, setProvinces] = useState<PSGCProvince[]>([]);
    const [cities, setCities] = useState<PSGCCity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { data, setData, post, processing } = useForm({
        region: '',
        province: '',
        city: '',
        last_name: '',
        first_name: '',
        middle_name: '',
        sex: '',
        age: '',
        marital_status: '',
        course: '',
    });

    useEffect(() => {
        fetchRegions();
    }, []);

    useEffect(() => {
        if (data.region) {
            fetchProvinces(data.region);
            setData('province', '');
            setData('city', '');
        }
    }, [data.region]);

    useEffect(() => {
        if (data.province) {
            fetchCities(data.province);
            setData('city', '');
        }
    }, [data.province]);

    async function fetchRegions() {
        setLoading(true);
        try {
            const response = await fetch('https://psgc.gitlab.io/api/regions/');
            const data = await response.json();
            setRegions(data);
        } catch (error) {
            console.error('Error fetching regions: ', error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchProvinces(regionCode: string) {
        setLoading(true);
        try {
            const response = await fetch(`https://psgc.gitlab.io/api/regions/${regionCode}/provinces/`);
            const data = await response.json();
            setProvinces(data);
        } catch (error) {
            console.error('Error fetching provinces: ', error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchCities(provinceCode: string) {
        setLoading(true);
        try {
            const response = await fetch(`https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities/`);
            const data = await response.json();
            setCities(data);
        } catch (error) {
            console.error('Error fetching cities: ', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Applicant" />
            
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Add New Applicant</h2>
                
                <form className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="region">Region</Label>
                            <Select
                                value={data.region}
                                onValueChange={(value) => setData('region', value)}
                                disabled={loading}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select region" />
                                </SelectTrigger>
                                <SelectContent>
                                    {regions.map((region) => (
                                        <SelectItem key={region.code} value={region.code}>
                                            {region.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="province">Province</Label>
                            <Select
                                value={data.province}
                                onValueChange={(value) => setData('province', value)}
                                disabled={!data.region}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select province" />
                                </SelectTrigger>
                                <SelectContent>
                                    {provinces.map((province) => (
                                        <SelectItem key={province.code} value={province.code}>
                                            {province.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="city">City/Municipality</Label>
                            <Select
                                value={data.city}
                                onValueChange={(value) => setData('city', value)}
                                disabled={!data.province}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select city" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cities.map((city) => (
                                        <SelectItem key={city.code} value={city.code}>
                                            {city.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" name="last_name" required />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" name="first_name" required />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="middleName">Middle Name</Label>
                            <Input id="middleName" name="middle_name" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="sex">Sex</Label>
                            <Select name="sex">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select sex" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input id="age" name="age" type="number" required />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="maritalStatus">Marital Status</Label>
                            <Select name="marital_status">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="single">Single</SelectItem>
                                    <SelectItem value="married">Married</SelectItem>
                                    <SelectItem value="widowed">Widowed</SelectItem>
                                    <SelectItem value="divorced">Divorced</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Input id="course" name="course" required />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" type="button">Cancel</Button>
                        <Button type="submit">Save Applicant</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}