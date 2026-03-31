"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import {useGetAllTrashProductsQuery, useUpdateProductMutation,} from "@/redux/features/product/product.api";
import {IProduct} from "@/types";
import {toast} from "sonner";
import BreadCrumbPage from "@/components/shared/BreadCrumbPage";


const TrashLeadPage = () => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    const { data, isLoading } = useGetAllTrashProductsQuery({
        searchTerm: search,
        sort,
    });

    const products: IProduct[] = data?.data || [];

    const [updateTrash] = useUpdateProductMutation();

    const handleRestore = async (id: string) => {
        // try {
        //     await updateTrash({
        //         _id: id,
        //         data: { isDeleted: false },
        //     }).unwrap();
        //     toast.success("Product restored successfully!");
        // } catch (err) {
        //     toast.error("Failed to restore product");
        // }
        toast.success("Pending work");
    };

    // Filter deleted products only
    const trashProducts = products.filter((product) => product.isDeleted);


    return (
        <div className="px-2 sm:px-6 py-6 space-y-6">
            {/*Breadcrumb */}
            <BreadCrumbPage
                BreadcrumbTitle={"Leads Management"}
                BreadCrumbLink={"/staff/dashboard/leads"}
                BreadCrumbPage={"Leads Trash"}
            />
            {/* 🔍 Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Select onValueChange={(value) => setSort(value)}>
                    <SelectTrigger className="w-[200px] cursor-pointer">
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>

                    <SelectContent position="popper">
                        <SelectItem value="-createdAt">Newest</SelectItem>
                        <SelectItem value="createdAt">Oldest</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* 📊 Table */}
            <div className="border rounded-xl">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : trashProducts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-6">
                                    No Trash User Found
                                </TableCell>
                            </TableRow>
                        ) : (
                            trashProducts.map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell className="font-medium">{product.title}</TableCell>
                                    <TableCell>৳ {product.price}</TableCell>
                                    <TableCell>{product.availableStock}</TableCell>
                                    <TableCell className="text-red-500">Deleted</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="outline"
                                            onClick={() => handleRestore(product._id as string)}
                                        >
                                            Restore
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TrashLeadPage;