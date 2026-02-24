const BlogDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;


  return (
    <div>
      <p>読み込めました</p>
      <p>読み込めました</p>
      <p>読み込めました</p>
      <p>Blog id: {id}</p>
      <p>Blog id: {id}</p>
      <p>Blog id: {id}</p>
    </div>
  );
}

export default BlogDetailPage;
