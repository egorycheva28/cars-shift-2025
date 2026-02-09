import { Dialog, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SubmitButton from "../../../components/SubmitButton";

interface CancelRentDialogProps {
    isOpen: boolean;
    handleIsOpenModal: (isOpen: boolean) => void;
    cancelRents: () => void;
    isDark: boolean;
}

export const CancelRentDialog: React.FC<CancelRentDialogProps> = ({ isOpen, handleIsOpenModal, cancelRents, isDark }) => {

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
                    gap: '40px',
                    background: isDark ? '#141C24' : '#FFFFFF'
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
                    backgroundColor: isDark ? '#141C24' : '#FFFFFF',
                    zIndex: 1,
                }}
            >
                <CloseIcon />
            </IconButton>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(180deg, #FF9D9F 0%, #E63033 100%)' }}>
                    <span style={{ color: 'white', position: 'relative', top: '5px', left: '20px', fontSize: '34px' }}>?</span>
                </div>
                <h3 style={{ color: isDark ? '#FFFFFF' : '#141C24' }}>Отменить бронь?</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <SubmitButton text="Отменить" colorScheme="secondary" isDark={isDark} onClick={() => cancelRents()} />
                <SubmitButton text="Не отменять" colorScheme="primary" isDark={isDark} onClick={() => handleIsOpenModal(false)} />
            </div>
        </Dialog>
    );
};