"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Schema
const formSchema = z.object({
  name: z.string().min(2, "Name required"),

  description: z.string().optional(),

  price: z.coerce.number().min(1),

  stock: z.coerce.number().min(0),

  category: z.string().optional(),

  images: z.array(z.string()).optional(),

  isFeatured: z.boolean().default(false),

  isWearable: z.boolean().default(false),

  replacementDate: z.string().optional(),

  highlights: z.array(z.string()).optional(),

  warranty: z.coerce.number().optional(),

  payOnDelivery: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

export default function AddProductForm() {
  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Sports & Fitness",
    "Books",
    "Toys & Games",
    "Automotive",
    "Groceries",
    "Health & Wellness",
  ];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      images: [],
      isFeatured: false,
      isWearable: false,
      replacementDate: "",
      highlights: [],
      warranty: 0,
      payOnDelivery: false,
    },
  });

  const [highlights, setHighlights] = React.useState<string[]>([""]);

  const addHighlight = () => {
    const updated = [...highlights, ""];

    setHighlights(updated);
    form.setValue("highlights", updated);
  };

  const updateHighlight = (index: number, value: string) => {
    const updated = [...highlights];

    updated[index] = value;

    setHighlights(updated);

    form.setValue(
      "highlights",
      updated.filter((item) => item.trim() !== ""),
    );
  };

  async function onSubmit(data: FormData) {
    try {
      const payload = {
        ...data,
        highlights: data.highlights?.filter((h) => h.trim() !== ""),
      };

      console.log(payload);

      await axios.post("/api/vendor/product", payload);

      toast.success("Product created successfully");

      form.reset();
    } catch (error) {
      console.log(error);

      toast.error("Failed to create product");
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-8">
      <Card className="max-w-xl w-full">
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
        </CardHeader>

        <CardContent>
          <form id="product-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                {/* NAME */}

                <Controller
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Name</FieldLabel>

                      <Input {...field} />

                      <FieldError>
                        {form.formState.errors.name?.message}
                      </FieldError>
                    </Field>
                  )}
                />

                {/* PRICE */}

                <Controller
                  name="price"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Price</FieldLabel>

                      <Input type="number" {...field} />
                    </Field>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* STOCK */}

                <Controller
                  name="stock"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Stock</FieldLabel>

                      <Input type="number" {...field} />
                    </Field>
                  )}
                />

                {/* CATEGORY */}

                <Controller
                  name="category"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Category</FieldLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Category</SelectLabel>

                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />
              </div>

              {/* DESCRIPTION */}

              <Controller
                name="description"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Description</FieldLabel>

                    <Textarea rows={4} {...field} />
                  </Field>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                {/* Replacement */}

                <Controller
                  name="replacementDate"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Replacement Date</FieldLabel>

                      <Input type="date" {...field} />
                    </Field>
                  )}
                />

                {/* Warranty */}

                <Controller
                  name="warranty"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Warranty Months</FieldLabel>

                      <Input type="number" {...field} />
                    </Field>
                  )}
                />
              </div>

              <div className="flex gap-6 flex-wrap">
                {[
                  ["isFeatured", "Featured"],
                  ["isWearable", "Wearable"],
                  ["payOnDelivery", "COD"],
                ].map(([name, label]) => (
                  <Controller
                    key={name}
                    name={name as keyof FormData}
                    control={form.control}
                    render={({ field }) => (
                      <Field orientation="horizontal">
                        <Checkbox
                          checked={field.value as boolean}
                          onCheckedChange={field.onChange}
                        />

                        <FieldLabel>{label}</FieldLabel>
                      </Field>
                    )}
                  />
                ))}
              </div>

              <Field>
                <FieldLabel>Highlights</FieldLabel>

                {highlights.map((h, i) => (
                  <Input
                    key={i}
                    value={h}
                    onChange={(e) => updateHighlight(i, e.target.value)}
                    placeholder="Feature point"
                  />
                ))}

                <Button type="button" variant="outline" onClick={addHighlight}>
                  Add Highlight
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>

        <div className="p-6 pt-0">
          <Button
            type="submit"
            form="product-form"
            className="w-full bg-sky-500"
          >
            Create Product
          </Button>
        </div>
      </Card>
    </div>
  );
}
