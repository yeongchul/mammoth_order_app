import { useEffect, useRef } from "react";

type PurchaseModalProps = {
    point: number;
  };
  

export default function PurchaseModal({point}:PurchaseModalProps){
    const dialogRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if (dialogRef.current && !dialogRef.current.open) {
          dialogRef.current.showModal();
        }
      }, []);
    
return(
    <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">포인트 {point}점이 적립되었습니다.</h3>
        </div>
    <form method="dialog" className="modal-backdrop">
        <button>close</button>
    </form>
    </dialog>
    );
}