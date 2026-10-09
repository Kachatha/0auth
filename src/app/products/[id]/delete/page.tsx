import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProduct } from "@/lib/products";
import { deleteProductAction } from "@/app/actions";

type DeleteProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DeleteProductPage({
  params,
}: DeleteProductPageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const { id } = await params;
  const product = getProduct(id);
  if (!product) {
    notFound();
  }

  const deleteAction = deleteProductAction.bind(null, product.id);

  return (
    <main className="container">
      <div className="card border-danger">
        <h1 className="text-danger">ยืนยันการลบสินค้า</h1>
        <p>คุณแน่ใจหรือไม่ว่าต้องการลบสินค้า <strong>"{product.name}"</strong>?</p>
        <div className="button-group" style={{ marginTop: "1.5rem" }}>
          <form action={deleteAction}>
            <button type="submit" className="btn btn-danger">ยืนยันการลบ</button>
          </form>
          <Link href="/" className="btn btn-secondary">ยกเลิก</Link>
        </div>
      </div>
    </main>
  );
}