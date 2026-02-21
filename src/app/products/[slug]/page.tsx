import { notFound } from "next/navigation";
import Image from "next/image";
import { getPublicProductBySlug } from "@/lib/actions/products";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const product = await getPublicProductBySlug(slug);

  if (!product) return notFound();

  const {
    name,
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

          {gallery.length > 0 && (
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
              {rating.toFixed(1)} rating • {reviews.length} reviews
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

          {/* Short Description */}
          {shortDescription && (
            <p className="text-gray-700 leading-relaxed">
              {shortDescription}
            </p>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition">
              Request Quote
            </button>

            <button className="border border-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition">
              Contact Sales
            </button>
          </div>

          {/* Long Description */}
          {longDescription && (
            <div className="pt-8 border-t">
              <h2 className="text-xl font-semibold mb-4">
                Product Details
              </h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {longDescription}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* REVIEWS SECTION */}
      {reviews.length > 0 && (
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