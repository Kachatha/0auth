"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteProduct, updateProduct } from "@/lib/products";

export async function updateProductAction(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;

  updateProduct(id, { name, price, description });
  revalidatePath("/");
  redirect("/");
}

export async function deleteProductAction(id: string) {
  deleteProduct(id);
  revalidatePath("/");
  redirect("/");
}