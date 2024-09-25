'use client'

import Link from "next/link";
import { useRef } from "react";
import { RiMusic2Fill } from "react-icons/ri";

export default function CardItem({
  images,
  id,
  altTitle,
  heading,
  subheading = "",
  imageRounded = false,
  type,
}) {
  const thumbnailRef = useRef();

  return (
    <Link href={`/${type}/${id}`} passHref>
      <div className="transition duration-300 p-4 rounded cursor-pointer hover:bg-[#282828] bg-paper">
        {images.length > 0 ? (
          <img
            src={images[0].url}
            alt={altTitle}
            ref={thumbnailRef}
            className={`object-cover w-full h-36  ${imageRounded ? "rounded-full" : "rounded"
              }`}
          />
        ) : (
          <div className="w-full h-40">
            <RiMusic2Fill className="w-full h-full bg-paper " />
          </div>
        )}
        <h3 className="mt-5 font-bold truncate">{heading}</h3>
        {subheading && (
          <h6 className="text-sm truncate text-gray">{subheading}</h6>
        )}
      </div>
    </Link>
  );
}
