import { allPosts, Post, allProfiles, allLinks } from "content-collections";
import Link from "next/link";
import Image from "next/image";

function Profile() {
  const data = allProfiles[0];
  if (!data) {
    console.warn("No data found for profile");
    return null;
  }
  return (
    <div className="">
      <div className="flex justify-center">
        <Image
          src="/profile.png"
          width={200}
          height={300}
          alt="Profile Picture"
        />
      </div>
      <p>{data.description}</p>
      <div>
        {Object.entries(data.links).map(([title, [name, url]], idx) => (
          <div key={idx} className="pt-4 flex flex-col">
            <span className="text-sm leading-2">{title}</span>
            <Link href={url} className="text-gray-700 underline">
              {name}
            </Link>
          </div>
        ))}
        <div className="pt-8">
          <GifLinks />
        </div>
      </div>
    </div>
  );
}

function GifLinks() {
  const links = allLinks[0].links;
  return (
    <div className="grid grid-rows-1 grid-cols-3">
      {Object.entries(links).map(([key, value]) => (
        <Link key={key} href={value.url}>
          <Image src={"/gifs/" + value.gif} alt={key} width={150} height={50} />
        </Link>
      ))}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(post.date);
  const link = "posts/" + post._meta.path;

  return (
    <Link href={link}>
      <div className="mb-8 hover:bg-sky-100">
        <h2 className="text-xl">{post.title}</h2>
        <time
          dateTime={post.date.toString()}
          className="block mb-2 text-xs text-gray-600"
        >
          {formattedDate}
        </time>
        <div className="text-sm">{post.summary}</div>
      </div>
    </Link>
  );
}

export default function Home() {
  const postsSortedByDate = allPosts.toSorted(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );
  const author = allProfiles[0].name;
  return (
    <div className="max-w-4xl py-10 mx-auto">
      <div className="px-5 lg:grid grid-cols-2 gap-10">
        <div>
          <h1 className="mb-20 text-3xl font-bold text-center">
            {author}&apos;s Blog
          </h1>
          {postsSortedByDate.map((post, idx) => (
            <PostCard key={idx} post={post} />
          ))}
        </div>
        <Profile />
      </div>
    </div>
  );
}
