import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { db } from "@/lib/db";
import ProductCard from "@/components/products/ProductCard";
import { ProductType } from "@prisma/client";

async function getProducts() {
  return db.product.findMany({
    where: {
      type: ProductType.ACCESSORY,
      active: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function AccessoryPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl lg:text-4xl font-bold mb-8">Solar System Accessories & Components</h1>

      {products.length === 0 ? (
        <p>No accessories available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      )}
      <div className='w-full mx-auto py-6 lg:placeholder-sky-800'>
        <Link href='/products' className='w-full mx-auto flex items-center justify-center'>
          <span> 
            View All Products
          </span>
          <ArrowRightIcon className='w-7 h-7 lg:w-8 lg:h-8'/>
        </Link>
      </div>
    </div>
  );
}