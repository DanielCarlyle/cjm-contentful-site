/*
import ContentfulImage from "@/lib/contentful-image";

export default function Avatar({
  name,
  picture,
}: {
  name: string;
  picture: any;
}) {
  return (
    <div className="flex items-center">
      <div className="mr-4 w-12 h-12">
        <ContentfulImage
          alt={name}
          className="object-cover h-full rounded-full"
          height={48}
          width={48}
          src={picture.url}
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
  */

import ContentfulImage from "@/lib/contentful-image";

export default function Avatar({
  name,
  picture,
}: {
  name: string;
  picture: { url?: string } | null;
}) {
  const imageUrl = picture?.url || "/fallback-image.png"; // Fallback to default image if URL is not present.

  return (
    <div className="flex items-center">
      <div className="mr-4 w-12 h-12">
        <ContentfulImage
          alt={name}
          className="object-cover h-full rounded-full"
          height={48}
          width={48}
          src={imageUrl}
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}

