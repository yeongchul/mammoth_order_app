import { useEffect, useRef } from "react";

export default function PurchaseModal(){
    const dialogRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if (dialogRef.current && !dialogRef.current.open) {
          dialogRef.current.showModal();
        }
      }, []);
    
return(
    <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">결제가 완료료되었습니다.</h3>
        </div>
    <form method="dialog" className="modal-backdrop">
        <button>close</button>
    </form>
    </dialog>
    );
}