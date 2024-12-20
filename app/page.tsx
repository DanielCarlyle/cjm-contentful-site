import Link from "next/link";
import { draftMode } from "next/headers";

import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import MoreStories from "./more-stories";

import { getAllPosts, getAbout } from "@/lib/api";
import { CMS_NAME, CMS_URL } from "@/lib/constants";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// Define the Intro component

function Intro({ aboutData }: { aboutData: any }) {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        <a href="/">Christopher John Malanchen</a>
        <i className="fab fa-imdb fa-5x"></i>
        <i className="fab fa-vimeo-v fa-5x"></i>
        <i className="fab fa-linkedin fa-5x"></i>
        <i className="fa fa-envelope fa-5x"></i>
        <br />
        <span className="text-4xl md:text-6xl font-medium tracking-tighter leading-tight md:pr-8">
          Editor, Film &amp; Television
        </span>
        <br />
        <span className="text-2xl md:text-4xl font-light tracking-tighter leading-tight md:pr-8">
          DGC, Canadian Film Centre Editor Alumni
        </span>
      </h1>

      <div className="container mx-auto px-5">
        <section>
          {aboutData ? (
            <>
              <h1>{aboutData.title}</h1>
              <img
                src={aboutData.image?.url}
                alt={aboutData.image?.description || "About image"}
              />
              <div>
                {documentToReactComponents(aboutData.descriptionRich?.json)}
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </section>
      </div>

      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A statically generated blog example using{" "}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Next.js
        </a>{" "}
        and{" "}
        <a
          href="https://www.contentful.com/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Contentful
        </a>
        .
      </h2>
    </section>
  );
}


// Define the HeroPost component
function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: {
  title: string;
  coverImage: any;
  date: string;
  excerpt: string;
  author: any;
  slug: string;
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div>
    </section>
  );
}

// Main page component
export default async function Page() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);
  const aboutData = await getAbout(); // Fetch About data
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <div className="container mx-auto px-5">
      <Intro aboutData={aboutData} /> {/* Pass aboutData to Intro */}
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      <MoreStories morePosts={morePosts} />
    </div>
  );
}
