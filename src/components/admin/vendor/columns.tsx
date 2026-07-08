"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Eye, Check, X, Trash2 } from "lucide-react";
import { updateVendorStatus } from "@/app/actions/vendor";
import toast from "react-hot-toast";

export type Vendor = {
  id: string;
  name: string;
  addresses: string;
  status: string;
};

export const columns: ColumnDef<Vendor>[] = [
  {
    accessorKey: "name",
    header: "Vendor",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },

  {
    accessorKey: "addresses",
    header: "Address",
    cell: ({ row }) => (
      <div className="max-w-[250px] truncate text-muted-foreground">
        {row.original.addresses}
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",

    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Badge
          className={
            status === "APPROVED"
              ? "bg-green-600 hover:bg-green-600"
              : status === "REJECTED"
                ? "bg-red-600 hover:bg-red-600"
                : "bg-yellow-500 hover:bg-yellow-500"
          }
        >
          {status}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",

    cell: ({ row }) => {
      const vendor = row.original;

      const handleStatus = async (status: "APPROVED" | "REJECTED") => {
        try {
          await updateVendorStatus(vendor.id, status);

          toast.success(`Vendor ${status.toLowerCase()} successfully`);

          window.location.reload();
        } catch (error) {
          toast.error("Something went wrong");

          console.log(error);
        }
      };

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="gap-2">
              <Eye size={16} />
              View
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                Vendor Details
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID</span>

                  <span className="font-medium">{vendor.id}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>

                  <span className="font-medium">{vendor.name}</span>
                </div>

                <div className="flex justify-between gap-5">
                  <span className="text-muted-foreground">Address</span>

                  <span className="text-right">{vendor.addresses}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>

                  <Badge>{vendor.status}</Badge>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  className="gap-2 bg-green-600 hover:bg-green-700"
                  onClick={() => handleStatus("APPROVED")}
                >
                  <Check size={16} />
                  Approve
                </Button>

                <Button
                  variant="destructive"
                  className="gap-2"
                  onClick={() => handleStatus("REJECTED")}
                >
                  <X size={16} />
                  Reject
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="gap-2 text-red-600">
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Vendor?</AlertDialogTitle>

                      <AlertDialogDescription>
                        This action cannot be undone. Vendor will be permanently
                        removed.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => {}}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
