import { Dialog, DialogClose, DialogContent, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Disclosure } from "@/hooks/use-disclosure";
import { Loader2 } from "lucide-react";

type Props = {
    modal: Disclosure;
    onConfirm: () => void;
    onCancel: () => void;
    itemName: string;
    loading?: boolean;
};

function ConfirmationModal({
    onConfirm,
    loading,
    modal,
    onCancel,
    itemName,
}: Props) {
    return (
        <Dialog open={modal.open} onOpenChange={modal.opOpenChange}>
            <DialogContent>
                Are you sure you want to delete this {itemName}?
                <DialogFooter className="flex-row gap-2">
                    <Button onClick={onConfirm} disabled={loading}>
                        Yes, delete
                        {loading && (
                            <Loader2 className="animate-spin" size={20} />
                        )}
                    </Button>
                    <DialogClose asChild>
                        <Button onClick={onCancel} variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ConfirmationModal;
