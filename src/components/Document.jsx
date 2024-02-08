import React, { useEffect } from 'react';

const Document = () => {
    useEffect(() => {
        const dropzoneBox = document.getElementsByClassName("dropzone-box")[0];
        const inputFiles = document.querySelectorAll(".dropzone-area input[type='file']");
        const inputElement = inputFiles[0];
        const dropZoneElement = inputElement.closest(".dropzone-area");

        const updateDropzoneFileList = (dropzoneElement, file) => {
            let dropzoneFileMessage = dropzoneElement.querySelector(".message");
            dropzoneFileMessage.innerHTML = `
                ${file.name}, ${file.size} bytes
            `;
        };

        inputElement.addEventListener("change", (e) => {
            if (inputElement.files.length) {
                updateDropzoneFileList(dropZoneElement, inputElement.files[0]);
            }
        });

        dropZoneElement.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropZoneElement.classList.add("dropzone--over");
        });

        ["dragleave", "dragend"].forEach((type) => {
            dropZoneElement.addEventListener(type, (e) => {
                dropZoneElement.classList.remove("dropzone--over");
            });
        });

        dropZoneElement.addEventListener("drop", (e) => {
            e.preventDefault();

            if (e.dataTransfer.files.length) {
                inputElement.files = e.dataTransfer.files;
                updateDropzoneFileList(dropZoneElement, e.dataTransfer.files[0]);
            }

            dropZoneElement.classList.remove("dropzone--over");
        });

        dropzoneBox.addEventListener("reset", (e) => {
            let dropzoneFileMessage = dropZoneElement.querySelector(".message");
            dropzoneFileMessage.innerHTML = `Inga filer valda`;
        });

        dropzoneBox.addEventListener("submit", (e) => {
            e.preventDefault();
            const myFiled = document.getElementById("upload-file");
            console.log(myFiled.files[0]);
        });
    }, []); // empty dependency array ensures that this effect runs only once after the component mounts

    return (
        <form className="dropzone-box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h2>Ladda upp och bifoga filer</h2>
            <div className="dropzone-area">
                <div className="file-upload-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                    </svg>
                </div>
                <p>Klicka för att ladda upp eller dra och släpp</p>
                <input type="file" required id="upload-file" name="uploaded-file" />
                <p className="message">Inga filer valda</p>
            </div>
            <div className="dropzone-actions">
                <button type="reset">Rensa</button>
                <button id="submit-button" type="submit">Spara</button>
            </div>
        </form>
    );
};

export default Document;
