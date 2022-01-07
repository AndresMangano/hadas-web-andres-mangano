import React, { ReactNode } from 'react';

type AppMediaModalProps = {
    onClose:() => void;
    visible: boolean;
    children?: ReactNode;
}

export function AppMediaModal({visible = false, children, onClose }: AppMediaModalProps) {
    return (
        <>
            { visible &&
                <div onClick={onClose} className="app-modal">
                    <div onClick={e => e.stopPropagation()} className="app-modal-box">
                        <div className="app-modal-box-content">
                            {children}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}