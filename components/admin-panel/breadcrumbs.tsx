"use client";

import React from "react";
import {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    Breadcrumb,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { getMenuList } from "@/lib/menu-list";

const BreadCrumbs = ({
    className,
}: {
    className?: string
}) => {
    const pathname = usePathname();
    const menuList = getMenuList(pathname);

    const findBreadcrumbPath = () => {
        for (const group of menuList) {
            for (const menu of group.menus) {
                if (menu.href === pathname) {
                    return [{ href: menu.href, label: menu.label }];
                }
                for (const submenu of menu.submenus) {
                    if (submenu.href === pathname) {
                        return [
                            { href: menu.href || '#', label: menu.label },
                            { href: submenu.href, label: submenu.label }
                        ];
                    }
                }
            }
        }
        return [];
    };

    const breadcrumbPath = findBreadcrumbPath();

    return (
        <Breadcrumb className={className}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">
                        <Home />
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbPath.map((item, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadCrumbs;