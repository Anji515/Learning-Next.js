import { UnsplashImage } from "@/models/Images";
import Image from "next/image";
import styles from "./page.module.css";
import { Metadata } from "next";
import { Alert } from "@/components/bootstrap";

interface PageProps {
  params: { topic: string };
}

// export const revalidate = 0;

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: topic + " - NextJS 13.4 Image Gallery",
  };
}

export function generateStaticParams() {
  return ["health", "fitness", "coding"].map((topic) => ({ topic }));
}

const Page = async ({ params: { topic } }: PageProps) => {
  const resp = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`
  );

  const images: UnsplashImage[] = await resp.json();
  // console.log("images", images);

  return (
    <>
      <Alert>
                This page uses <strong>generateStaticParams</strong> to render and cache static pages at build time, even though the URL has a dynamic parameter.
                Pages that are not included in generateStaticParams will be fetched & rendered on first access and then <strong>cached for subsequent requests</strong> (this can be disabled).
            </Alert>

      <h1>{topic}</h1>
      {images?.map((image) => (
        <Image
          src={image.urls.raw}
          alt={image.description}
          width={300}
          height={300}
          className={styles.image}
          key={image.urls.raw}
        />
      ))}
    </>
  );
};

export default Page;
