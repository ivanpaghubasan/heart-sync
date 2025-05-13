'use client';

import { NavbarItem } from "@heroui/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
    href: string;
    label: string;
};

export default function NavLink({ href, label }: Props) {
    const pathname = usePathname();
    return (
        <NavbarItem as={Link} isActive={pathname === href

        } href={href}>
            {label}
        </NavbarItem>
    );
}
