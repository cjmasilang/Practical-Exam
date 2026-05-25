"use client";

import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen, FolderGit2, LayoutGrid, Users, Package,
    ShoppingCart, BarChart3, ChevronRight, Store, UserCog
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [];

export function AppSidebar() {
    const { props } = usePage();
    const auth = props.auth as any;
    const permissions = auth?.user?.permissions || [];
    const can = (perm: string) => permissions.includes(perm);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />

                <SidebarGroup>
                    <SidebarGroupLabel>Management</SidebarGroupLabel>
                    <SidebarMenu>
                        {(can('view_users') || can('view_roles') || can('view_customers')) && (
                            <Collapsible className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            <Users /> <span>User Management</span>
                                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {can('view_users') && <SidebarMenuSubItem><SidebarMenuSubButton asChild><Link href="/users">Users</Link></SidebarMenuSubButton></SidebarMenuSubItem>}
                                            {can('view_roles') && <SidebarMenuSubItem><SidebarMenuSubButton asChild><Link href="/roles">Roles/Permissions</Link></SidebarMenuSubButton></SidebarMenuSubItem>}
                                            {can('view_customers') && <SidebarMenuSubItem><SidebarMenuSubButton asChild><Link href="/customers">Customers</Link></SidebarMenuSubButton></SidebarMenuSubItem>}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        )}

                        {(can('view_categories') || can('view_sub_categories') || can('view_products')) && (
                            <Collapsible className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            <Package /> <span>Product Management</span>
                                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {can('view_categories') && <SidebarMenuSubItem><SidebarMenuSubButton asChild><Link href="/categories">Categories</Link></SidebarMenuSubButton></SidebarMenuSubItem>}
                                            {can('view_sub_categories') && <SidebarMenuSubItem><SidebarMenuSubButton asChild><Link href="/subCat">Sub Categories</Link></SidebarMenuSubButton></SidebarMenuSubItem>}
                                            {can('view_products') && <SidebarMenuSubItem><SidebarMenuSubButton asChild><Link href="/products">Product</Link></SidebarMenuSubButton></SidebarMenuSubItem>}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        )}

                        {can('view_sales') && (
                            <Collapsible className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            <ShoppingCart /> <span>Sales & Transactions</span>
                                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem><SidebarMenuSubButton asChild><Link href="/sales">Sales</Link></SidebarMenuSubButton></SidebarMenuSubItem>
                                            <SidebarMenuSubItem><SidebarMenuSubButton asChild><Link href="/sales/items">Sales Items</Link></SidebarMenuSubButton></SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        )}
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Reports</SidebarGroupLabel>
                    <SidebarMenu>
                        {can('view_reports') && (
                            <Collapsible className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            <BarChart3 /> <span>Sales Reports</span>
                                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem><SidebarMenuSubButton asChild><Link href="/reports/sales-summary">Sales Summary</Link></SidebarMenuSubButton></SidebarMenuSubItem>
                                            <SidebarMenuSubItem><SidebarMenuSubButton asChild><Link href="/reports/inventory-logs">Inventory Logs</Link></SidebarMenuSubButton></SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        )}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={[{ title: 'POS Terminal', href: '/pos', icon: Store }]} />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
