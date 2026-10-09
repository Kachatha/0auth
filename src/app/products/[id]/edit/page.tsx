import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProduct } from "@/lib/products";
import { updateProductAction } from "@/app/actions";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const { id } = await params;
  const product = getProduct(id);
  if (!product) {
    notFound();
  }

  const updateAction = updateProductAction.bind(null, product.id);

  return (
    <main className="container">
      <div className="card">
        <h1>แก้ไขสินค้า</h1>
        <form action={updateAction} className="form-group">
          <div>
            <label htmlFor="name">ชื่อสินค้า</label>
            <input id="name" name="name" defaultValue={product.name} required />
          </div>
          <div>
            <label htmlFor="price">ราคา (บาท)</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              defaultValue={product.price}
              required
            />
          </div>
          <div>
            <label htmlFor="description">รายละเอียดสินค้า</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={product.description}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">บันทึก</button>
            <Link href="/" className="btn btn-secondary">ยกเลิก</Link>
          </div>
        </form>
      </div>
    </main>
  );
}