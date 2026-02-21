import { db } from "@/lib/db";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";

async function getProductsByType(type: any) {
  return db.product.findMany({
    where: {
      type,
      active: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });
}

export default async function ProductsPage() {
  const [inverters, panels, batteries, accessories] = await Promise.all([
    getProductsByType("INVERTER"),
    getProductsByType("PANEL"),
    getProductsByType("BATTERY"),
    getProductsByType("ACCESSORY"),
  ]);

  const sections = [
    { title: "Inverters", data: inverters, slug: "inverter" },
    { title: "Solar Panels", data: panels, slug: "panel" },
    { title: "Batteries", data: batteries, slug: "battery" },
    { title: "Accessories", data: accessories, slug: "accessory" },
  ];

  return (
    <div className="container mx-auto py-16 space-y-20">
      {sections.map((section) =>
        section.data.length > 0 ? (
          <section key={section.slug}>
            <div className="flex flex-col items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold mb-6">
                {section.title}
              </h2>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {section.data.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
              <Link
                href={`/products/category/${section.slug}`}
                className="text-sm md:text-base lg:text-lg font-medium hover:underline flex items-center justify-center mx-auto w-full"
              >
                View All →
              </Link>
          </section>
        ) : null
      )}
    </div>
  );
}

// import { getActiveProducts } from "@/lib/actions/products";
// import Link from "next/link";

// function formatNaira(value: number) {
//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//   }).format(value);
// }

// function getDiscountedPrice(price: number, discount?: any) {
//   if (!discount || !discount.active) return price;

//   if (discount.amount) return price - discount.amount;

//   if (discount.percentage)
//     return Math.round(price - (price * discount.percentage) / 100);

//   return price;
// }

// export default async function ProductsPage() {
//   const products = await getActiveProducts();

//   return (
//     <div className="max-w-7xl mx-auto py-12 px-4">
//       <h1 className="text-3xl font-bold mb-8">Products</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {products.map((product) => {
//           const finalPrice = getDiscountedPrice(
//             product.price,
//             product.discount
//           );

//           const outOfStock = (product.stock ?? 0) <= 0;

//           return (
//             <Link
//               key={product.id}
//               href={`/products/${product.slug}`}
//               className="border rounded-lg p-4 hover:shadow-lg transition"
//             >
//               {product.mainImageUrl && (
//                 <img
//                   src={product.mainImageUrl}
//                   className="w-full h-48 object-cover rounded"
//                 />
//               )}

//               <h2 className="font-semibold mt-4">
//                 {product.name}
//               </h2>

//               <div className="text-sm text-gray-500">
//                 ⭐ {product.rating.toFixed(1)}
//               </div>

//               <div className="mt-2">
//                 {product.discount?.active ? (
//                   <div>
//                     <span className="line-through text-gray-400 mr-2">
//                       {formatNaira(product.price)}
//                     </span>
//                     <span className="font-bold text-green-600">
//                       {formatNaira(finalPrice)}
//                     </span>
//                   </div>
//                 ) : (
//                   <span className="font-bold">
//                     {formatNaira(product.price)}
//                   </span>
//                 )}
//               </div>

//               {outOfStock && (
//                 <div className="mt-2 text-red-500 text-sm font-medium">
//                   Out of stock
//                 </div>
//               )}
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }