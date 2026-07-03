"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
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
  },
  {
    accessorKey: "addresses",
    header: "Addresses",
  },
  {
    accessorKey: "status",
    header: "Status",
  },

  // 🔥 ACTIONS
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const vendor = row.original;

      const handleApprove = () => {
        console.log("Approve:", vendor.id);
      };

      const handleReject = () => {
        console.log("Reject:", vendor.id);
      };

      const handleDelete = () => {
        console.log("Delete:", vendor.id);
      };

      return (
        <div className="flex items-center gap-2">
          {/* 👁️ VIEW DIALOG */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                View
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Vendor Details</DialogTitle>
              </DialogHeader>

              <div className="space-y-2 text-sm">
                <p>
                  <b>ID:</b> {vendor.id}
                </p>
                <p>
                  <b>Name:</b> {vendor.name}
                </p>
                <p>
                  <b>Address:</b> {vendor.addresses}
                </p>
                <p>
                  <b>Status:</b> {vendor.status}
                </p>
              </div>
            </DialogContent>
          </Dialog>

          {/* ✅ APPROVE */}
          <Button size="sm" onClick={handleApprove}>
            Approve
          </Button>

          {/* ❌ REJECT */}
          <Button size="sm" variant="secondary" onClick={handleReject}>
            Reject
          </Button>

          {/* 🗑️ DELETE ALERT DIALOG */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive">
                Delete
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  vendor.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
