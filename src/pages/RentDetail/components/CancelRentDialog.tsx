import { Dialog, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SubmitButton from "../../../components/SubmitButton";

interface CancelRentDialogProps {
    isOpen: boolean;
    handleIsOpenModal: (isOpen: boolean) => void;
    cancelRents: () => void;
}

export const CancelRentDialog: React.FC<CancelRentDialogProps> = ({ isOpen, handleIsOpenModal, cancelRents }) => {

    return (
        <Dialog
            open={isOpen}
            onClose={() => handleIsOpenModal(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '24px',
                    width: '328px',
                    height: 'auto',
                    padding: '72px 108px',
                    gap: '40px'
                },
            }
            }
        >
            <IconButton
                onClick={() => handleIsOpenModal(false)}
                aria-label="Закрыть"
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'white',
                    zIndex: 1,
                }}
            >
                <CloseIcon />
            </IconButton>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(180deg, #FF9D9F 0%, #E63033 100%)' }}>
                    <span style={{ color: 'white', position: 'relative', top: '5px', left: '20px', fontSize: '34px' }}>?</span>
                </div>
                <h3 style={{ color: '#141C24' }}>Отменить бронь?</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <SubmitButton text="Отменить" colorScheme="secondary" onClick={() => cancelRents()} />
                <SubmitButton text="Не отменять" colorScheme="primary" onClick={() => handleIsOpenModal(false)} />
            </div>
        </Dialog>
    );
};