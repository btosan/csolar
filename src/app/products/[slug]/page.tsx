import { notFound } from "next/navigation";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
import Link from "next/link";
import { getPublicProductBySlug } from "@/lib/actions/products";
import RichTextRenderer from "@/components/editor/RichTextRenderer";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const product = await getPublicProductBySlug(slug);

  if (!product) return notFound();

  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "ADMIN";

  const {
    name,
    id,
    brand,
    model,
    shortDescription,
    longDescription,
    mainImageUrl,
    gallery,
    price,
    rating,
    stock,
    discount,
    reviews,

    // NEW FIELDS
    featured,
    wattage,
    kva,
    ah,
    voltage,
    specifications,
  } = product;

  const hasPercentageDiscount =
    discount?.active && discount?.percentage;

  const hasAmountDiscount =
    discount?.active && discount?.amount;

  const finalPrice = hasPercentageDiscount
    ? Math.round(price - (price * discount!.percentage!) / 100)
    : hasAmountDiscount
    ? price - discount!.amount!
    : price;

  const imageSrc =
    mainImageUrl && mainImageUrl.trim() !== ""
      ? mainImageUrl
      : "/placeholder-product.png";

  return (
    <div className="container mx-auto py-12 px-4">
      {/* ================= GRID SECTION ================= */}
      <div className="grid lg:grid-cols-2 gap-12">
        
        {/* LEFT: IMAGES */}
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-xl overflow-hidden">
            <Image
              src={imageSrc}
              alt={name}
              width={600}
              height={600}
              className="w-full h-full object-contain"
              priority
            />
          </div>

          {gallery && gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {gallery.map((img) => (
                <div
                  key={img.id}
                  className="bg-gray-100 rounded-lg overflow-hidden"
                >
                  <Image
                    src={img.url}
                    alt={img.caption || "Product image"}
                    width={150}
                    height={150}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: PRODUCT INFO */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{name}</h1>

            {isAdmin && (
              <Link
                href={`/admin/products/${id}/edit`} 
                className="inline-block my-4 bg-accent text-black px-4 py-2 rounded-md text-sm hover:bg-black/70 hover:text-white transition"
              >
                Edit Product
              </Link>
            )}

            {featured && (
              <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 font-medium">
                Featured Product
              </span>
            )}

            <p className="text-sm text-muted-foreground">
              Brand: <span className="font-medium">{brand}</span>
              {model && <> | Model: {model}</>}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="text-yellow-500 text-lg">
              {"★".repeat(Math.round(rating || 0))}
              {"☆".repeat(5 - Math.round(rating || 0))}
            </div>
            <span className="text-sm text-muted-foreground">
              {rating.toFixed(1)} rating • {reviews?.length || 0} reviews
            </span>
          </div>

          {/* Price Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-3xl font-bold text-black">
                ₦{finalPrice.toLocaleString()}
              </span>

              {(hasPercentageDiscount || hasAmountDiscount) && (
                <span className="text-lg line-through text-black/40">
                  ₦{price.toLocaleString()}
                </span>
              )}

              {hasPercentageDiscount && (
                <span className="text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-500">
                  -{discount!.percentage}%
                </span>
              )}

              {!hasPercentageDiscount && hasAmountDiscount && (
                <span className="text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-500">
                  -₦{discount!.amount}
                </span>
              )}
            </div>

            <p
              className={`text-sm font-medium ${
                stock && stock > 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {stock && stock > 0
                ? `In stock (${stock} available)`
                : "Out of stock"}
            </p>
          </div>

          {/* Quick Technical Specs */}
          {(wattage || kva || ah || voltage) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {wattage && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm font-medium">
                  {wattage}W
                </span>
              )}
              {kva && (
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-md text-sm font-medium">
                  {kva} kVA
                </span>
              )}
              {ah && (
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-md text-sm font-medium">
                  {ah} Ah
                </span>
              )}
              {voltage && (
                <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-md text-sm font-medium">
                  {voltage}
                </span>
              )}
            </div>
          )}

          {/* Short Description */}
          {shortDescription && (
            <p className="text-gray-700 leading-relaxed">
              {shortDescription}
            </p>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href='/contact' className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition">
              Request Quote
            </Link>

            <Link href='/contact' className="border border-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition">
              Contact Sales
            </Link>
          </div>

          {/* Long Description */}
          {longDescription && (
            <div className="pt-8 border-t">
              <h2 className="text-xl font-semibold mb-4">
                Product Details
              </h2>

              <RichTextRenderer content={longDescription} />
            </div>
          )}
        </div>
      </div>
      {/* ================= END GRID ================= */}

      {/* ================= TECHNICAL SPECIFICATIONS ================= */}
      {specifications && specifications.length > 0 && (
        <div className="pt-12">
          <h2 className="text-2xl font-semibold mb-6">
            Technical Specifications
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border rounded-lg overflow-hidden">
              <tbody>
                {specifications.map((spec: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b last:border-none"
                  >
                    <td className="px-4 py-3 font-medium bg-gray-50 w-1/3">
                      {spec.key}
                    </td>
                    <td className="px-4 py-3">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= REVIEWS SECTION ================= */}
      {reviews && reviews.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">
            Customer Reviews
          </h2>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">
                    {review.user}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-yellow-500 mb-2">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>

                <p className="text-gray-700">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}