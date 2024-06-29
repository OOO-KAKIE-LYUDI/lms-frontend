"use client";

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
import React from "react";

  interface ConfirmModalProps {
    children: React.ReactNode;
    onConfirm: () => void;
  }


  // TODO: props
  export const ConfirmModal = ({
    children,
    onConfirm,
  }: ConfirmModalProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Вы уверены?
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                   Это действие нельзя обратить.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Отмена
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Подвердить
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
  )}