"use client";

import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight, MenuIcon, PlusCircle, Search, Settings, Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { UserItem } from "./user-items";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Item } from "./item";
import { toast } from "sonner";
import { DocumentList } from "./document-list";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TrashBox } from "./trash-box";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import { Navbar } from "./navbar";



export const Navigation = () => {
    const router = useRouter();
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const create = useMutation(api.documents.create);
    const search = useSearch();
    const settings = useSettings();
    const params = useParams();
    
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile); 





    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();
        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;
        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;
        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100%-${newWidth}px)`);
            
        }
    }

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(isMobile);
            setIsResetting(true);
            sidebarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
            navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100%-240px)");
            setTimeout(() => {
                setIsResetting(false);
            }, 300);
        } 

    }

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);
            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("left", "0");
            navbarRef.current.style.setProperty("width", "100%");
            setTimeout(() => {
                setIsResetting(false);
            }, 300);
        }
    }

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile]);

    const handleCreate = () => {
        const promise = create({
            title: "Untitled", 
        }).then((documentId) => {
            router.push(`/documents/${documentId}`);
        });
        toast.promise(promise, {
            loading: "Creating new trail...",
            success: "Trail created!",
            error: "Failed to create trail"
        });
    }


    return (
        <>
        <aside ref={sidebarRef} className={cn(
            "group/sidebar h-full bg-background overflow-y-auto relative flex w-60 flex-col z-[99999]",
            isResetting && "transition-all ease-in-out duration-300",
            isMobile && "w-0",
            "dark:bg-[#3F3F4F]",
            "bg-[#F5F5F5]"
        )}>
            <div
            onClick={collapse}
            role="button"
            className={cn("h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
            )}
            >
                <ChevronsLeft className="w-6 h-6"/>
            </div>
            <div>
                <UserItem/>
                <Item
                label="Search"
                icon={Search}
                isSearch
                onClick={search.onOpen}
                />
                
                <Item
                label="Settings"
                icon={Settings}
                onClick={settings.onOpen}
                />

                <Item 
                onClick={handleCreate}
                label="New Document"
                icon={PlusCircle}
                />
            </div>  
            <div className="mt-4">
                <DocumentList/>
                <Item
                label="Add a page"
                icon={PlusCircle}
                onClick={handleCreate}
                />
                <Popover>
                    <PopoverTrigger>
                        <Item label="Trash" icon={Trash}/>
                    </PopoverTrigger>
                    <PopoverContent
                    className="p-0 w-72"
                    side = {isMobile ? "right" : "bottom"}
                    >
                        <TrashBox/>
                    </PopoverContent>
                </Popover>
            </div>

            <div
            onMouseDown={handleMouseDown}
            onClick={resetWidth}
            className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
            />
            
        </aside>
        <div ref={navbarRef} className={cn("absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]", 
            isResetting && "transition-all duration-300 ease-in-out",
            isMobile && "left-0 w-full",

            )}>
                {!!params.documentId ? (
                    <Navbar 
                    isCollapsed={isCollapsed} 
                    onResetWidth={resetWidth}/>
                ) : (
                    <nav className="bg-transparent px-3 py-2 w-full">
                {isCollapsed && (
                    <MenuIcon 
                    onClick={() => resetWidth()}
                    role="button"
                    className="w-6 h-6 text-muted-foreground" />
                )}
            </nav>
                )}


        </div>
        </>
    )
}   