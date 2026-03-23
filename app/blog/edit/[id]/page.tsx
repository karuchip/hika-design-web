import EditClient from "./editClient";

const EditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const resolvedParams = await params;

  return<EditClient params={resolvedParams}/>

}

export default EditPage
