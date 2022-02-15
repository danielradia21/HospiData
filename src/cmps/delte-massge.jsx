import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,

};

export function DelteMassge({ type, handleClose }) {
    return (
        <Box sx={style} className="delete">
            <div>
                <div className="modal-header">
                    <p>Warning!</p>
                    <button onClick={handleClose}>X</button>
                </div>
                <div className=" modal-info-continer flex column justify-center align-center">
                    <p>Are you sure want to remove this {type}?</p>
                    <button className="acspet">Remove {type}</button>
                    <button onClick={handleClose} className="Cancel">
                        Cancel
                    </button>
                </div>
            </div>
        </Box>
    );
}
