import Image from "next/image";
import { CourseProduct, DigitalProduct, SubscriptionProduct } from "./ProductModels";

interface ProductCardProps {
  product: DigitalProduct | CourseProduct | SubscriptionProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const formatPrice = (price: bigint) => {
    return `${Number(price) / 1e6} USDC`;
  };

  // Helper function to format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  // Determine product type and render specific details
  const renderProductDetails = () => {
    if ("downloadUrl" in product) {
      // Digital Product
      return (
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Format:</span> {product.fileFormat}
          </p>
          <p>
            <span className="font-semibold">Size:</span> {product.fileSize}
          </p>
          <p>
            <span className="font-semibold">License:</span> {product.licenseType}
          </p>
        </div>
      );
    } else if ("accessDuration" in product) {
      // Course Product
      return (
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Level:</span> {product.courseLevel}
          </p>
          <p>
            <span className="font-semibold">Duration:</span> {product.accessDuration} days
          </p>
          <p>
            <span className="font-semibold">Access:</span> {product.accessType}
          </p>
          <p>
            <span className="font-semibold">Support:</span> {product.includesSupport ? "Included" : "Not included"}
          </p>
          <p>
            <span className="font-semibold">Content Type:</span> {product.contentType}
          </p>
          <div className="mt-2">
            <p className="font-semibold">Modules:</p>
            <ul className="list-disc list-inside pl-2">
              {product.modules.map((module, index) => (
                <li key={index}>{module}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else if ("billingCycle" in product) {
      // Subscription Product
      return (
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Billing:</span> {product.billingCycle}
          </p>
          <p>
            <span className="font-semibold">Trial Period:</span> {product.trialPeriodDays} days
          </p>
          <p>
            <span className="font-semibold">Auto-renew:</span> {product.autoRenew ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-semibold">Valid until:</span> {formatDate(product.timeframe.endDate)}
          </p>
          <div className="mt-2">
            <p className="font-semibold">Features:</p>
            <ul className="list-disc list-inside pl-2">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl h-full">
      <figure className="px-5 pt-5">
        <Image
          src="/software-box.jpg"
          alt={product.name}
          width={300}
          height={200}
          className="rounded-xl w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="text-sm">{product.body}</p>
        {renderProductDetails()}
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-xl font-bold">{formatPrice(product.price)}</span>
          <button className="btn btn-primary">View Details</button>
        </div>
      </div>
    </div>
  );
};
