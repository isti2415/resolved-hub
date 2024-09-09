import {
  Box,
  Coins,
  LayoutGrid,
  LockKeyhole,
  LucideIcon,
  ShoppingBag,
  ShoppingCart,
  Users
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname==="/dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "",
          label: "Sales",
          active: pathname.includes("/sales"),
          icon: ShoppingBag,
          submenus: [
            {
              href: "/sales",
              label: "Sales History",
              active: pathname === "/sales"
            },
            {
              href: "/sales/order",
              label: "Sales Order",
              active: pathname.includes("/sales/order")
            },
            {
              href: "/sales/customers",
              label: "Customers",
              active: pathname.includes("/sales/customers")
            },
            {
              href: "/sales/shipping",
              label: "Shipping Methods",
              active: pathname.includes("/sales/shipping")
            },
          ]
        },
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "",
          label: "Purchase",
          active: pathname.includes("/purchase"),
          icon: ShoppingCart,
          submenus: [
            {
              href: "/purchase",
              label: "Purchase History",
              active: pathname === "/purchase"
            },
            {
              href: "/purchase/order",
              label: "Purchase Order",
              active: pathname.includes("/purchase/order")
            },
            {
              href: "/purchase/suppliers",
              label: "Suppliers",
              active: pathname.includes("/purchase/suppliers")
            },
          ]
        },
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "",
          label: "Inventory",
          active: pathname.includes("/inventory"),
          icon: Box,
          submenus: [
            {
              href: "/dashboard/inventory",
              label: "Inventory List",
              active: pathname === "/inventory"
            },
            {
              href: "/dashboard/inventory/categories",
              label: "Categories",
              active: pathname.includes("/dashboard/inventory/categories")
            },
            {
              href: "/dashboard/inventory/brands",
              label: "Brands",
              active: pathname.includes("/dashboard/inventory/brands")
            },
            {
              href: "/dashboard/inventory/products",
              label: "Products",
              active: pathname.includes("/dashboard/inventory/products")
            },
          ]
        },
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "",
          label: "Accounts",
          active: pathname.includes("/accounts"),
          icon: Coins,
          submenus: [
            {
              href: "/accounts/transactions",
              label: "Transactions",
              active: pathname === "/accounts/transactions"
            },
            {
              href: "/accounts/dues/customers",
              label: "Customer Due Payments",
              active: pathname === "/accounts/dues/customers"
            },
            {
              href: "/accounts/dues/suppliers",
              label: "Supplier Due Payments",
              active: pathname === "/accounts/dues/suppliers"
            },
            {
              href: "/accounts/payment-methods",
              label: "Payment Methods",
              active: pathname === "/accounts/payment-methods"
            },
            {
              href: "/accounts/transactions",
              label: "Emi Payments",
              active: pathname === "/accounts/transactions"
            },
          ]
        },
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "",
          label: "HR",
          active: pathname.includes("/dashboard/hr"),
          icon: Users,
          submenus: [
            {
              href: "/dashboard/hr/employee",
              label: "Employee",
              active: pathname === "/dashboard/hr/employee"
            },
            {
              href: "/dashboard/hr/departments",
              label: "Departments",
              active: pathname === "/dashboard/hr/departments"
            },
            {
              href: "/dashboard/hr/positions",
              label: "Positions",
              active: pathname === "/dashboard/hr/positions"
            },
          ]
        },
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "",
          label: "Admin",
          active: pathname.includes("/admin"),
          icon: LockKeyhole,
          submenus: [
            {
              href: "/users",
              label: "All Users",
              active: pathname === "/users"
            },
          ]
        },
      ]
    }
  ];
}
