"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TablaIntegracionesProps } from "./TablaIntegraciones.type";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { formatPrice } from "@/lib/formatPrice";

const data: TablaIntegracionesProps[] = [
    {
        app: "rosa",
        icon: "/logo.png",
        type: "finance",
        rate: 60,
        profit: 450,
    },
    {
        app: "melisa",
        icon: "/logo.png",
        type: "finance",
        rate: 60,
        profit: 800,
    },
    {
        app: "carol",
        icon: "/logo.png",
        type: "finance",
        rate: 60,
        profit: 200,
    },
    {
        app: "donato",
        icon: "/logo.png",
        type: "finance",
        rate: 60,
        profit: 600,
    },
    {
        app: "zara",
        icon: "/logo.png",
        type: "Tienda",
        rate: 80,
        profit: 1200,
    },
    {
        app: "pedro",
        icon: "/logo.png",
        type: "Tienda",
        rate: 90,
        profit: 950,
    },
];

export const columns: ColumnDef<TablaIntegracionesProps>[] = [
    {
        accessorKey: "icon",
        header: "Logo",
        cell: ({ row }) => (
            <div className="capitalize flex items-center">
                <Image src={row.getValue("icon")} alt="Logo" width={24} height={24} className="rounded" />
            </div>
        ),
    },
    {
        accessorKey: "app",
        header: "Aplicación",
        cell: ({ row }) => (
            <span className="capitalize font-semibold">{row.getValue("app")}</span>
        ),
    },
    {
        accessorKey: "type",
        header: () => <div>Tipo</div>,
        cell: ({ row }) => <span className="capitalize">{row.getValue("type")}</span>,
    },
    {
        accessorKey: "rate",
        header: () => <div className="">Tasa</div>,
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Progress value={row.getValue("rate")} className="h-2 w-20" />
                <span className="text-xs">{row.getValue("rate")}%</span>
            </div>
        ),
    },
    {
        accessorKey: "profit",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="float-end px-2"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Ganancia
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("profit"));
            return (
                <div className="text-right font-medium">{formatPrice(amount)}</div>
            );
        },
        sortingFn: (rowA, rowB, columnId) => {
            const valueA = parseFloat(rowA.getValue(columnId));
            const valueB = parseFloat(rowB.getValue(columnId));
            return valueA - valueB;
        },
    },
];

export function TablaIntegraciones() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    console.log("Estado de ordenación actual:", sorting);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Buscar aplicación..."
                    value={(table.getColumn("app")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("app")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columnas <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No hay resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
