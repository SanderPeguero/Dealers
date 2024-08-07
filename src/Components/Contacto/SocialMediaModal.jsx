// SocialMediaModal.js
import React, { useState, useEffect } from 'react';

const SocialMediaModal = ({ isOpen, onClose, savedLinks = {}, onSave }) => {
    const [socials, setSocials] = useState({
        tiktok: { enabled: false, url: '' },
        facebook: { enabled: false, url: '' },
        instagram: { enabled: false, url: '' },
        youtube: { enabled: false, url: '' },
        twitter: { enabled: false, url: '' },
    });

    useEffect(() => {
        if (isOpen) {
            const initialSocials = { ...socials };
            Object.keys(initialSocials).forEach((social) => {
                if (savedLinks[social]) {
                    initialSocials[social] = { url: savedLinks[social], enabled: true };
                }
            });
            setSocials(initialSocials);
        }
    }, [isOpen, savedLinks]);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setSocials((prevSocials) => ({
            ...prevSocials,
            [name]: {
                ...prevSocials[name],
                enabled: checked,
            },
        }));
    };

    const handleUrlChange = (event) => {
        const { name, value } = event.target;
        setSocials((prevSocials) => ({
            ...prevSocials,
            [name]: {
                ...prevSocials[name],
                url: value,
            },
        }));
    };

    const handleSave = () => {
        const updatedLinks = {};
        Object.keys(socials).forEach((social) => {
            if (socials[social].enabled) {
                updatedLinks[social] = socials[social].url;
            }
        });
        onSave(updatedLinks);
        onClose();
    };

    if (!isOpen) return null;

    return (
        // fixed inset-0 flex items-center justify-center z-50  sm:mx-0 min-h-screen w-full text-white backdrop-blur-sm
        <div className="fixed inset-0 flex items-center justify-center z-50  w-full  ">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 text-white">
                <h2 className="text-xl font-semibold mb-4">Agregar Redes Sociales</h2>
                <div className="space-y-4">
                    {Object.keys(socials).map((social) => (
                        <div key={social} className="flex flex-col mb-4">
                            <label htmlFor={`${social}-url`} className="text-white capitalize flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id={`${social}-enabled`}
                                    name={social}
                                    checked={socials[social].enabled}
                                    onChange={handleCheckboxChange}
                                    disabled={!!savedLinks[social]}
                                    className="mr-2"
                                />
                                {social}
                            </label>
                            <input
                                type="text"
                                id={`${social}-url`}
                                name={social}
                                placeholder={`https://www.${social}.com/yourprofile`}
                                value={socials[social].url}
                                onChange={handleUrlChange}
                                disabled={!socials[social].enabled || !!savedLinks[social]}
                                className="border border-gray-300 p-2 rounded"
                            />
                        </div>
                    ))}
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialMediaModal;
