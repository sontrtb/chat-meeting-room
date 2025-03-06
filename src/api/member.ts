import rootApi from "./api";

export interface IMember {
    id: string,
    name?: string,
    token: string
}


const path = {
    getListMember: "/member",
    addMember: "/member/add"
};

const getListMember = async (): Promise<IMember[]> => {
  return await rootApi(
    {
      url: path.getListMember,
      method: "get",
    },
  );
};

const addMember = async (data: {name: string, file: File}): Promise<IMember> => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("file", data.file)
    return await rootApi(
      {
        url: path.addMember,
        method: "post",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data"
        }
      },
    );
  };
  

export { getListMember, addMember };
