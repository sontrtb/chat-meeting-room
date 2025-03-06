import rootApi from "./api";

export interface IMessage {
    speaker: string;
    seg: string;
    content: string
}

const path = {
    sendMessage: "/mva/seg",
};

const sendMessage = async (data: {seg: string, file: File}): Promise<IMessage> => {
    const formData = new FormData()
    formData.append("seg", data.seg)
    formData.append("file", data.file)
    return await rootApi(
      {
        url: path.sendMessage,
        method: "post",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data"
        }
      },
    );
  };

  export default sendMessage