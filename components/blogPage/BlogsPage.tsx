"use client";
import React, { useEffect } from "react";
import { useBlogStore } from "@/hooks/useBlog";
import Image from "next/image";
import Link from "next/link";

const BlogsPage = () => {
  const { Blogs, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-2 lg:grid-cols-4  items-center gap-4 lg:p-4 my-4 mx-2 lg:mx-6  ">
        {Blogs.map((blog) => (
          <Link href={`/blog/${blog.slug}`} key={blog.id}>
            <div className="p-4  cursor-pointer h-64 lg:h-full">
              <div className="">
                <Image
                  src={`https://admin.parazone.tn/assets/${blog.image}`}
                  alt={blog.title}
                  width={300}
                  height={300}
                  className="h-40 w-60 lg:h-60 lg:w-96 object-cover rounded-2xl"
                />
              </div>
              <h2 className="p-2 font-semibold text-xs lg:text-base">
                {blog.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
