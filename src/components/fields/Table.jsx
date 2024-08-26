import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { BsTable } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

const data = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
    },
    {
        id: "5kma53a1",
        amount: 374,
        status: "success",
        email: "Sila22@gmail.com",
      },
      {
        id: "bhqecj41",
        amount: 891,
        status: "processing",
        email: "carmellayadav@hotmail.com",
      },
  ];
  
  export const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return ( 
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "amount",
      //header: () => <div className="text-right bg-red-300">Amount</div>,
      header: ({ column }) => {
        return (
          <div className="text-right">
            <Button
                 
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Amount
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
  
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
  
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];


const AttributesData = {
  label: "Table Name",
  labelcolor: "", // Default color
  labelsize: 16, // Default font size
  textsize: 16,
  filter: true,
  sort:true,
  pagination: 5,
  textcolor: "", // Default font color
  height: 50, // Default height
  width: 500, // Default width
  labelposition: true,
  disable: false,
  hide: false,
  value: "",
  eovo: {
    EO: {
      entityobject: "",
    },
    VO: {
      viewobject: "",
    }
  },

}


const TableFields = ({ id , x , y }) => {
 
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!property || property.id !== id) {
      dispatch(addprop({ id, x, y, ...AttributesData }));
    }
  }, [dispatch, id, property]);

//    ''''''''''''Table code''''''''''''''
const [sorting, setSorting] = useState([]);
const [columnFilters, setColumnFilters] = useState([]);
const [columnVisibility, setColumnVisibility] = useState({});
const [rowSelection, setRowSelection] = useState({});
const [pagination, setPagination] = useState({});

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
    pagination: {
        ...pagination,
        pageIndex: pagination.pageIndex ?? 0, // Default pageIndex to 0
        pageSize: pagination.pageSize ?? property.pagination, // Default pageSize to 5
      },
  },
  onPaginationChange: setPagination,
});
//    ''''''''''''''''''''''''''


  useEffect(() => {
    if (!property || property.id !== id) {
      dispatch(addprop({ id, ...AttributesData }));
    }
  }, [dispatch, id, property]);

  return (
    <div className={`${property.labelposition ? 'labelposition-top' : 'labelposition-side'} labelposition-main-div`}>
      <Label
        style={{
          color: property.labelcolor,
          fontSize: property.labelsize + "px"
        }}>
        {property.label}
      </Label>

          <div className="table-main-div">

              <div className={`table-header-div ${!property.filter ? 'table-filter' : ''}`}>
                  <Input
                    className='prop-area max-w-sm'
                      placeholder="Filter emails..."
                      value={(table.getColumn("email")?.getFilterValue() ) ?? ""}
                      onChange={(event) =>
                          table.getColumn("email")?.setFilterValue(event.target.value)
                      }
                  />
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="table-filter-btn">
                              Columns <ChevronDownIcon className="table-filter-btnicon" />
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
                                  )
                              })}
                      </DropdownMenuContent>
                  </DropdownMenu>
              </div>

              <div className={`table-content-div ${!property.filter ? 'mt-3' : ''} `}>
                  <Table>
                      <TableHeader>
                          {table.getHeaderGroups().map((headerGroup) => (
                              <TableRow key={headerGroup.id}>
                                  {headerGroup.headers.map((header) => (
                                      <TableHead key={header.id}>
                                          {header.isPlaceholder
                                              ? null
                                              : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                      </TableHead>
                                  ))}
                              </TableRow>
                          ))}
                      </TableHeader>
                      <TableBody>
                          {table.getRowModel().rows.map((row) => (
                              <TableRow key={row.id}>
                                  {row.getVisibleCells().map((cell) => (
                                      <TableCell key={cell.id}>
                                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                      </TableCell>
                                  ))}
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </div>

                <div className="table-pagination-div">
                  <div className="table-pagination-value">
                      {table.getFilteredSelectedRowModel().rows.length} of{" "}
                      {table.getFilteredRowModel().rows.length} row(s) selected.
                  </div>
                  <div className="space-x-2">
                      <Button
                          variant="outline"
                          size="sm"
                          onClick={() => table.previousPage()}
                          disabled={!table.getCanPreviousPage()}
                      >
                          Previous
                      </Button>
                        <span className="text-sm">
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </span>
                      <Button
                          variant="outline"
                          size="sm"
                          onClick={() => table.nextPage()}
                          disabled={!table.getCanNextPage()}
                      >
                          Next
                      </Button>
                  </div>
              </div>
          </div>

    </div>
  )
}

export function TableFieldsPreview({ id }) {
  console.log("txt id", id);
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const attributePropData = useSelector((state) => state.propertiesdata);
  const dispatch = useDispatch();



  //    ''''''''''''Table code''''''''''''''
const initialPagination = {
   pageIndex: 0,
   pageSize: property.pagination || 5, 
};

const [sorting, setSorting] = useState([]);
const [columnFilters, setColumnFilters] = useState([]);
const [columnVisibility, setColumnVisibility] = useState({});
const [rowSelection, setRowSelection] = useState({});
const [pagination, setPagination] = useState(initialPagination);

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
      pagination
    },
    onPaginationChange: setPagination,
  });
//    ''''''''''''''''''''''''''




  const evaluateConditions = (conditions, data) => {
    if (!conditions || !conditions.length) return false;

    return conditions.reduce((result, condition) => {
      const attributeData = data.find(item => item.id === condition.attribute);
      if (!attributeData) return result;

      let conditionResult;
      switch (condition.operator) {
        case '==':
          conditionResult = attributeData.value === condition.attvalues;
          break;
        case '!=':
          conditionResult = attributeData.value !== condition.attvalues;
          break;
        case '>':
          conditionResult = attributeData.value > condition.attvalues;
          break;
        case '<':
          conditionResult = attributeData.value < condition.attvalues;
          break;
        // Add more operators as needed
        default:
          conditionResult = false;
      }

      if (condition.parentOperator === 'AND') {
        return result && conditionResult;
      } else if (condition.parentOperator === 'OR') {
        return result || conditionResult;
      } else {
        return conditionResult;
      }
    }, true);
  };

  const disableConditions = property.disable !== false ? JSON.parse(property.disable) : [];
  const shouldDisable = evaluateConditions(disableConditions, attributePropData);

  const hideConditions = property.hide !== false ? JSON.parse(property.hide) : [];
  const shouldHide = evaluateConditions(hideConditions, attributePropData);



  return (
    <div className={`${property.labelposition ? 'flex flex-col' : 'flex items-center'} gap-2 w-full ${shouldHide ? 'hidden' : ''}`}>
      <Label
        style={{
          color: property.labelcolor,
          fontSize: property.labelsize + "px"
        }}
      >
        {property.label}
        {property.required && <span className='text-red-600 font-bold'> *</span>}
      </Label>
          <div className="w-full">

              <div className={`flex items-center py-4 ${!property.filter ? 'hidden' : ''}`}>
                  <Input
                    className='prop-area max-w-sm'
                      placeholder="Filter emails..."
                      value={(table.getColumn("email")?.getFilterValue()) ?? ""}
                      onChange={(event) =>
                          table.getColumn("email")?.setFilterValue(event.target.value)
                      }
                  />
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="ml-auto">
                              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
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
                                  )
                              })}
                      </DropdownMenuContent>
                  </DropdownMenu>
              </div>

              <div className={`rounded-md border ${!property.filter ? 'mt-3' : ''} `}>
                  <Table>
                      <TableHeader>
                          {table.getHeaderGroups().map((headerGroup) => (
                              <TableRow key={headerGroup.id}>
                                  {headerGroup.headers.map((header) => (
                                      <TableHead key={header.id}>
                                          {header.isPlaceholder
                                              ? null
                                              : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                      </TableHead>
                                  ))}
                              </TableRow>
                          ))}
                      </TableHeader>
                      <TableBody>
                          {table.getRowModel().rows.map((row) => (
                              <TableRow key={row.id}>
                                  {row.getVisibleCells().map((cell) => (
                                      <TableCell key={cell.id}>
                                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                      </TableCell>
                                  ))}
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </div>

              <div className="flex items-center justify-end space-x-2 py-4">
                  <div className="flex-1 text-sm text-muted-foreground">
                      {table.getFilteredSelectedRowModel().rows.length} of{" "}
                      {table.getFilteredRowModel().rows.length} row(s) selected.
                  </div>
                  <div className="space-x-2">
                      <Button
                          variant="outline"
                          size="sm"
                          onClick={() => table.previousPage()}
                          disabled={!table.getCanPreviousPage()}
                      >
                          Previous
                      </Button>
                      <span className="text-sm">
                          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                      </span>
                      <Button
                          variant="outline"
                          size="sm"
                          onClick={() => table.nextPage()}
                          disabled={!table.getCanNextPage()}
                      >
                          Next
                      </Button>
                  </div>
              </div>
          </div>
    </div>
  )
}

export function TableFieldsPage({ properties, id, submitValues }) {
  const attributePropData = useSelector((state) => state.propertiesdata);
  const property = AttributesData;

  console.log("txt id", id);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue); // Update state to trigger re-render
    if (submitValues) {
      submitValues(id, newValue); // Update formValues
    }
  };
  

  properties.forEach((item) => {
    switch (item.property_name) {
      case "label":
        property.label = item.property_value;
        break;
      case "required":
        property.required = item.property_value;
        break;
      case "placeholder":
        property.placeholder = item.property_value;
        break;
      case "labelcolor":
        property.labelcolor = item.property_value;
        break;
      case "labelsize":
        property.labelsize = item.property_value;
        break;
      case "textsize":
        property.textsize = item.property_value;
        break;
      case "textcolor":
        property.textcolor = item.property_value;
        break;
      case "height":
        property.height = item.property_value;
        break;
      case "width":
        property.width = item.property_value;
        break;
      case "value":
        property.value = item.property_value;
        break;
      case "disable":
          property.disable = item.property_value;
          break; 
      case "hide":
          property.hide = item.property_value;
          break;     
      default:
        break;
    }
  });

  // const disableConditions = property.disable !== false ? JSON.parse(property.disable) : [];
  // const shouldDisable = evaluateConditions(disableConditions, attributePropData);

  const [inputValue, setInputValue] = useState(property.value);
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label style={{
        color: property.labelcolor,
        fontSize: property.labelsize + "px"
      }}

      >
        {property.label}
      </Label>
      <Input
        className='prop-area' placeholder={property.placeholder} style={{
        fontSize: property.textsize + "px",
        color: property.textcolor,
        height: property.height + "px",
        width: property.width + "px",
      }}
        value={inputValue} // Bind to state
        onChange={handleChange}

      />
    </div>
  )
}

export const TableFieldFormElement = {
  type: "tablefield",
  icon: BsTable,
  label: "Table Fields"
}


export function TableProperties({ id }) {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const expressionData = useSelector((state) => state.expressiondata);
  const entityData = useSelector((state) => state.entitydata);
  const viewData = useSelector((state) => state.viewdata);

  console.log("entityData",entityData);
  

  console.log("property data", property);

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      id: id,
      label: property.label,
      labelposition: property.labelposition,
      disable: property.disable,
      hide: property.hide,
      filter:property.filter,
      sort:property.sort,
      pagination:property.pagination,
      labelcolor: property.labelcolor,
      textsize: property.textsize,
      labelsize: property.labelsize,
      textcolor: property.textcolor,
      height: property.height,
      width: property.width,
      eovo: {
        EO: {
          entityobject: property.eovo.EO.entityobject,
        },
        VO: {
          viewobject: property.eovo.VO.viewobject,
        }
      },
    },
  });

  useEffect(() => {  // Reset form values to default when the component mounts
    form.reset({
      label: property.label,
      labelposition: property.labelposition,
      disable: property.disable,
      hide: property.hide,
      filter:property.filter,
      sort:property.sort,
      pagination:property.pagination,
      labelcolor: property.labelcolor,
      textcolor: property.textcolor,
      textsize: property.textsize,
      labelsize: property.labelsize,
      height: property.height,
      width: property.width,
      eovo: {
        EO: {
          entityobject: property.eovo.EO.entityobject,
        },
        VO: {
          viewobject: property.eovo.VO.viewobject,
        }
      },
    });
  }, [form, property]);

  const handleReset = () => {
    form.reset(AttributesData);
    dispatch(updateprop({ id, ...AttributesData }));
  };


  const applyChanges = (formData) => {
    console.log("formdata", formData);
    const existingProperty = property.id;
    if (existingProperty) {
      dispatch(updateprop({ id, ...formData }));

    } else {
      dispatch(addprop({ id, ...formData }));
    }
    console.log("apply change");
  };


  return (
    <Form {...form}>
      <form onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-3">

        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Id</FormLabel>
              <FormControl>
                <Input
                  readOnly
                  disabled
                  className='prop-area'
                  {...field}
                  value={id}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Label</FormLabel>
              <FormControl>
                <Input
                  className='prop-area'
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="labelposition"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Label Position</FormLabel>
              <FormControl>
                <Select value={field.value.toString()} onValueChange={(value) => field.onChange(value === 'true')}>
                  <SelectTrigger className='prop-area'>
                    <SelectValue placeholder={field.value ? 'Top' : 'Side'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Top</SelectItem>
                    <SelectItem value="false">Side</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="filter"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Filters</FormLabel>
              <FormControl>
                <Select value={field.value.toString()} onValueChange={(value) => field.onChange(value === 'true')}>
                  <SelectTrigger className='prop-area'>
                    <SelectValue placeholder={field.value ? 'Yes' : 'No'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sort"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Sort</FormLabel>
              <FormControl>
                <Select value={field.value.toString()} onValueChange={(value) => field.onChange(value === 'true')}>
                  <SelectTrigger className='prop-area'>
                    <SelectValue placeholder={field.value ? 'Yes' : 'No'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pagination"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Pagination ( No. of line per page ) </FormLabel>
              <FormControl>
                <Input
                  className='prop-area'
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="disable"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Disable</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className='prop-area'>
                    <SelectValue placeholder="select expression">
                      {field.value === false ? "No" : (expressionData?.find(item => JSON.stringify(item.conditions) === JSON.stringify(field.value))?.expressionname)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"false".toString()}>No</SelectItem>
                    {expressionData?.map((item) => (
                      <SelectItem key={item.expression_id} value={JSON.stringify(item.conditions)}>
                        {item.expressionname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hide"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Hide</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className='prop-area'>
                    <SelectValue placeholder="select expression">
                      {field.value === false ? "No" : (expressionData?.find(item => JSON.stringify(item.conditions) === JSON.stringify(field.value))?.expressionname)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"false".toString()}>No</SelectItem>
                    {expressionData?.map((item) => (
                      <SelectItem key={item.expression_id} value={JSON.stringify(item.conditions)}>
                        {item.expressionname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />



        <FormField
          control={form.control}
          name="eovo.EO.entityobject"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Entity Object Name</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className='prop-area'>
                    <SelectValue placeholder="select enity object">
                      {field.value === false ? "No" : JSON.stringify(field.value)?.entityname}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"false".toString()}>No</SelectItem>
                    {entityData?.map((item, index) => (
                      <SelectItem key={index} value={JSON.stringify(item.entityname)}>
                        {item.entityname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eovo.VO.viewobject"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>View Object Name</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className='prop-area'>
                    <SelectValue placeholder="select view object">
                      {field.value === false ? "No" : JSON.stringify(field.value)?.viewname}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"false".toString()}>No</SelectItem>
                    {viewData?.map((item, index) => (
                      <SelectItem key={index} value={JSON.stringify(item.viewname)}>
                        {item.viewname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* ====================================== */}
        <FormField
          control={form.control}
          name="labelsize"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Label Size</FormLabel>
              <FormControl>
                <Input
                  className='prop-area'
                  {...field}
                  type="number"
                  step="1"
                  min="8"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="textsize"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Text Size</FormLabel>
              <FormControl>
                <Input
                  className='prop-area'
                  {...field}
                  type="number"
                  step="1"
                  min="8"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="labelcolor"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Label Color</FormLabel>
              <FormControl>
                <Input
                  className='prop-area'
                  {...field}
                  type="color"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="textcolor"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Text Color</FormLabel>
              <FormControl>
                <Input
                  className='prop-area'
                  {...field}
                  type="color"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Text height (px)</FormLabel>
              <FormControl>
                <Input
                  className='prop-area'
                  {...field}
                  type="number"
                  step="1"
                  min="10"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="width"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Text width (px)</FormLabel>
              <FormControl>
                <Input
                  className='prop-area'
                  {...field}
                  type="number"
                  step="1"
                  min="10"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />


        <div className="w-full flex items-center justify-center">
          <Button type='button' className='prop-reset-btn' onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default TableFields;