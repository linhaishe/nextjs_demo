const UserDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div>UserDetail {id}</div>;
};

export default UserDetail;
