import { useState, useEffect, FormEvent } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
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
import InputError from '@/components/input-error';

interface Props {
    applicant: {
        id: number;
        region: string;
        province: string;
        city: string;
        last_name: string;
        first_name: string;
        middle_name: string;
        sex: string;
        age: string;
        marital_status: string;
        course: string;
    };
}

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Edit Applicant',
        href: '#',
    },
];

export default function EditApplicant({ applicant }: Props) {
    const [regions, setRegions] = useState<PSGCRegion[]>([]);
    const [provinces, setProvinces] = useState<PSGCProvince[]>([]);
    const [cities, setCities] = useState<PSGCCity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { data, setData, put, processing, errors } = useForm({
        region: applicant.region,
        province: applicant.province,
        city: applicant.city,
        last_name: applicant.last_name,
        first_name: applicant.first_name,
        middle_name: applicant.middle_name,
        sex: applicant.sex,
        age: applicant.age,
        marital_status: applicant.marital_status,
        course: applicant.course,
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        put(route('applicants.update', applicant.id));
    }

    useEffect(() => {
        fetchRegions().then(() => {
            if (applicant.region) {
                fetchProvinces(applicant.region).then(() => {
                    if (applicant.province) {
                        fetchCities(applicant.province);
                    }
                });
            }
        });
    }, []);

    useEffect(() => {
        if (data.region) {
            fetchProvinces(data.region);
        }
    }, [data.region]);

    useEffect(() => {
        if (data.province) {
            fetchCities(data.province);
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
            <Head title="Edit Applicant" />
            
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Edit Applicant</h2>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                            <InputError message={errors.region} />
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
                            <InputError message={errors.province} />
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
                            <InputError message={errors.city} />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                                id="lastName"
                                value={data.last_name}
                                onChange={e => setData('last_name', e.target.value)}
                                required 
                            />
                            <InputError message={errors.last_name} />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                                id="firstName"
                                value={data.first_name}
                                onChange={e => setData('first_name', e.target.value)}
                                required 
                            />
                            <InputError message={errors.first_name} />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="middleName">Middle Name</Label>
                            <Input 
                                id="middleName"
                                value={data.middle_name}
                                onChange={e => setData('middle_name', e.target.value)}
                                required 
                            />
                            <InputError message={errors.middle_name} />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="sex">Sex</Label>
                            <Select
                                value={data.sex}
                                onValueChange={(value) => setData('sex', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select sex" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.sex} />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input 
                                id="age"
                                type="number"
                                value={data.age}
                                onChange={e => setData('age', e.target.value)}
                                required 
                            />
                            <InputError message={errors.age} />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="maritalStatus">Marital Status</Label>
                            <Select
                                value={data.marital_status}
                                onValueChange={(value) => setData('marital_status', value)}
                            >
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
                            <InputError message={errors.marital_status} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Input 
                            id="course"
                            value={data.course}
                            onChange={e => setData('course', e.target.value)}
                            required 
                        />
                        <InputError message={errors.course} />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Link href="/dashboard">
                            <Button className="cursor-pointer" variant="outline" type="button">Cancel</Button>
                        </Link>
                        <Button className="cursor-pointer" type="submit">Save Applicant</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}