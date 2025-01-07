import { FormProvider as Form } from 'react-hook-form';
import clsx from "clsx";
import React from "react";

interface FormProviderProps {
    onSubmit: (data: any) => void;
    methods: any;
    className?: string,
    children: React.ReactNode,
}

export default function FormProvider({ children, onSubmit, methods, className }: FormProviderProps) {
    return (
        <Form {...methods} >
            <form className={clsx("flex flex-col", className)} onSubmit={onSubmit}>{children}</form>
        </Form>
    );
}
