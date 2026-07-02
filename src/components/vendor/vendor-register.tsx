"use client";

import * as React from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const vendorSchema = z.object({
  shopName: z
    .string()
    .min(3, "Shop name must be at least 3 characters.")
    .max(50, "Shop name must be at most 50 characters."),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters.")
    .max(150, "Address must be at most 150 characters."),
});

type VendorFormData = z.infer<typeof vendorSchema>;

export default function VendorRegister() {
  const form = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      shopName: "",
      address: "",
    },
  });

  const onSubmit = (data: VendorFormData) => {
    const response = axios.post("/api/vendor", {
      vendorName: data.shopName,
      addresses: data.address,
    });

    toast.success("Vendor registration submitted successfully!");

    console.log(response);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent" variant="outline">
          Become a Vendor
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl text-white font-semibold text-center">
            Vendor Registration
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-center text-sm">
            Enter your business details. Review takes 2–3 hours.
          </DialogDescription>
        </DialogHeader>

        <form
          id="vendor-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 mt-5"
        >
          <FieldGroup>
            {/* Shop Name */}
            <Controller
              name="shopName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-gray-300 text-sm">
                    Shop Name
                  </FieldLabel>

                  <Input
                    {...field}
                    placeholder="Tech World Store"
                    className="bg-white/5 border border-white/10 text-white placeholder:text-gray-400 
              rounded h-11 px-3
              focus:ring-0 focus:outline-none transition"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Address */}
            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-gray-300 text-sm">
                    Shop Address
                  </FieldLabel>

                  <Input
                    {...field}
                    placeholder="123 Main Street, City"
                    className="bg-white/5 border border-white/10 text-white placeholder:text-gray-400 
              rounded h-11 px-3
               focus:ring-0 focus:outline-none transition"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            type="submit"
            className="w-full h-11 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
          >
            Register
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
