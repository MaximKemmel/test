'use client'
import React from 'react';
import Link from "next/link";

const DashboardSee = () => {

    return (
        <div className="flex justify-center pb-8 items-center xs:pt-4 xs:pb-4">
            <div className="flex items-center gap-3">
                <h2 className="text-red-600 text-h3">Режим Просмотра</h2>
                <Link href="/" className="text-red-600 text-h3">(Выйти)</Link>
            </div>
        </div>
    );
};

export default DashboardSee;
