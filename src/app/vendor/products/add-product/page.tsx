"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

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

// ✅ Zod Schema (matches your Prisma model)
const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),

  price: z.coerce.number().min(1),
  stock: z.coerce.number().min(0),

  category: z.string().optional(),

  images: z.array(z.string()).optional(),

  isFeatured: z.boolean().default(false),
  isWearable: z.boolean().default(false),

  replacementDate: z.string().optional(), // ISO string from input
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
    // zodResolver has a wider generic; cast to match useForm's FormData
    resolver: zodResolver(formSchema) as unknown,
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      images: [],
      isFeatured: false,
      isWearable: false,
      highlights: [],
      warranty: 0,
      payOnDelivery: false,
    },
  });

  const [images, setImages] = React.useState<string[]>([""]);
  const [highlights, setHighlights] = React.useState<string[]>([""]);

  // -------------------
  // dynamic handlers
  // -------------------
  const addImage = () => setImages([...images, ""]);
  const updateImage = (i: number, val: string) => {
    const copy = [...images];
    copy[i] = val;
    setImages(copy);
    form.setValue("images", copy);
  };

  const addHighlight = () => setHighlights([...highlights, ""]);
  const updateHighlight = (i: number, val: string) => {
    const copy = [...highlights];
    copy[i] = val;
    setHighlights(copy);
    form.setValue("highlights", copy);
  };

  function onSubmit(data: FormData) {}

  return (
    <div className="w-full min-h-screen  flex items-center justify-center px-4 py-8">
      <Card className="max-w-xl w-full">
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
        </CardHeader>

        <CardContent>
          <form id="product-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* PRICE + STOCK */}
              <div className="grid grid-cols-2 gap-4">
                {/* NAME */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Name</FieldLabel>
                      <Input {...field} />
                    </Field>
                  )}
                />{" "}
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
                      <Select {...field}>
                        <SelectTrigger className="w-full max-w-48">
                          <SelectValue placeholder="Select a Category " />
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

              {/* REPLACEMENT + WARRANTY */}
              <div className="grid grid-cols-2 gap-4">
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

                <Controller
                  name="warranty"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Warranty (months)</FieldLabel>
                      <Input type="number" {...field} />
                    </Field>
                  )}
                />
              </div>

              {/* CHECKBOXES */}
              <div className="flex gap-6 flex-wrap">
                <Controller
                  name="isFeatured"
                  control={form.control}
                  render={({ field }) => (
                    <Field orientation="horizontal">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FieldLabel>Featured</FieldLabel>
                    </Field>
                  )}
                />

                <Controller
                  name="isWearable"
                  control={form.control}
                  render={({ field }) => (
                    <Field orientation="horizontal">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FieldLabel>Wearable</FieldLabel>
                    </Field>
                  )}
                />

                <Controller
                  name="payOnDelivery"
                  control={form.control}
                  render={({ field }) => (
                    <Field orientation="horizontal">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FieldLabel>COD</FieldLabel>
                    </Field>
                  )}
                />
              </div>

              {/* IMAGES */}
              <Field>
                <FieldLabel>Upload 4 Images</FieldLabel>

                {images.map((img, i) => (
                  <Input
                    key={i}
                    value={img}
                    onChange={(e) => updateImage(i, e.target.value)}
                    placeholder="Image URL"
                    className="mt-2"
                  />
                ))}

                <Button type="button" variant="outline" onClick={addImage}>
                  Add Image
                </Button>
              </Field>

              {/* HIGHLIGHTS */}
              <Field className="flex">
                <FieldLabel>Highlights</FieldLabel>

                <div className="flex items-center justify-center gap-2">
                  {highlights.map((h, i) => (
                    <Input
                      key={i}
                      value={h}
                      onChange={(e) => updateHighlight(i, e.target.value)}
                      placeholder="Feature point"
                      className="mt-2"
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addHighlight}
                  >
                    Add
                  </Button>
                </div>
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
