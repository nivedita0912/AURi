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
} from "@/components/ui/alert-dialog"
import { ProjectSummary } from "@/type/project";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { deleteProject } from "@/actions/projects";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
export default function DeleteProjectModel({ project, children }: { project: ProjectSummary, children: React.ReactNode }) {
    const [ispending, startTransition] = useTransition();
    const router = useRouter();
    function handleDelete() {
        startTransition(async () => {
            try {
                await deleteProject(project.id);
                toast.success("Project is Deleted..")
                router.refresh();
            }
            catch (error) {
                toast.error("Failed to delete the project. Please try this later");
            }
        })

    }
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete !! Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. {project.title} will permanently delete your account
                            from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                            size="sm"
                            onClick={handleDelete}
                            disabled={ispending}
                            className="h-8 rounded-full bg-red-500/90 px-4 text-xs font-semibold text-white hover:bg-red-500 disabled:opacity-50"
                        >
                            {ispending && <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />}
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
