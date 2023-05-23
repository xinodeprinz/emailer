import axios from "axios";


const uploadAdapter = (loader: any) => {
    return {
        upload: () => {
            return new Promise((resolve, reject) => {
                const body = new FormData();
                loader.file.then((file: any) => {
                    body.append("image", file);
                    axios.post("/image/upload", body).then((res) =>
                        resolve({
                            default: res.data,
                        }),
                    );
                });
            });
        },
    };
};

const uploadPlugin = (editor: any) => {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
        return uploadAdapter(loader);
    };
};

export const ckEditorConfig = {
    extraPlugins: [uploadPlugin],
};