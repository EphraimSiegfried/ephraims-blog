import { allPosts, Post } from "content-collections";
import Link from "next/link";
import Image from "next/image";

function PostCard({ post }: { post: Post}) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(post.date);
  return (
    <div className="mb-8">
      <h2 className="text-xl">
	{post.title}
      </h2>
      <time dateTime={post.date.toString()} className="block mb-2 text-xs text-gray-600">
        {formattedDate}
      </time>
      <div className="text-sm">
	{post.summary}
      </div>
    </div>
  );
}

function Profile() {
   return (
    <div className="">
    <div className="flex justify-center">
      <Image src="/profile.png" width={200} height={300} alt="Profile Picture"/>
    </div>
      <p>
	I am a computer science student from Switzerland. 
	I like distributed systems, Nix and compilers.
	I also like chess, philosophy and bouldering.
      </p>
      <Link href={"https://github.com/EphraimSiegfried"}>EphraimSiegfried</Link>
    </div>
   )
}

export default function Home() {
  return (
    <div className="max-w-3xl py-10 mx-auto">
      <div className="grid grid-cols-2 gap-10">
	<div>
	  <h1 className="mb-20 text-3xl font-bold text-center">Ephraim Siegfried&apos;s Blog</h1>
	  {allPosts.map((post, idx) => (
	    <PostCard key={idx} post={post} /> 
	  ))}
	</div>
	<Profile />
      </div>
    </div>
  );
}
