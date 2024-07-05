import { Metadata } from "next";
import BlogPage from "@/components/blogPage/BlogPage";

// Capitalize each word in the slug
function capitalizeSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: capitalizeSlug(params.slug), // Capitalize the slug for the title
  };
}

export default function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const { slug } = params;
  const { Blogs, fetchBlogs } = useBlogStore();
  const { BlogBrands, fetchBlogBrands } = useBlogBrandStore();
  const { BlogProducts, fetchBlogProducts } = useBlogProductStore();
  const { BlogCategories, fetchBlogCategories } = useBlogCategoryStore();
  const { BlogTags, fetchBlogTags } = useBlogTagStore();

  const [filteredBlog, setFilteredBlog] = useState<Blog | null | undefined>(
    null
  );

  // Fetching Blogs, Brands, Products
  useEffect(() => {
    fetchBlogs();
    fetchBlogBrands();
    fetchBlogProducts();
    fetchBlogCategories();
    fetchBlogTags();
  }, [
    fetchBlogs,
    fetchBlogBrands,
    fetchBlogProducts,
    fetchBlogCategories,
    fetchBlogTags,
  ]);

  useEffect(() => {
    const Blog = Blogs.find((Blog) => Blog.slug === slug);
    setFilteredBlog(Blog);
  }, [Blogs, slug]);

  const filteredBlogBrand = BlogBrands.filter(
    (brand) => String(brand?.blog_id) === String(filteredBlog?.id)
  );

  const filteredBlogProduct = BlogProducts.filter(
    (product) => String(product?.blog_id) === String(filteredBlog?.id)
  );

  const filteredBlogCategory = BlogCategories.filter(
    (category) => String(category?.blog_id) === String(filteredBlog?.id)
  );

  const filteredBlogTag = BlogTags.filter(
    (tag) => String(tag?.blog_id) === String(filteredBlog?.id)
  );

  if (!filteredBlog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Aucun article trouvé.</p>
      </div>
    );
  }

  const createdDate = new Date(filteredBlog.created_at);
  const formattedDate = createdDate.toISOString().split("T")[0];

  return (
    <div className="container mx-auto py-8 font-sans shadow-lg m-4 rounded-xl">
      <h1 className="text-2xl lg:text-3xl font-bold mb-2">
        {filteredBlog.title}
      </h1>

      <div className="flex  items-center gap-4">
        <p className="text-sm text-neutral-600">Creer en {formattedDate}</p>
        <p className="text-sm text-neutral-600">Par {filteredBlog.author}.</p>
      </div>

      <div className="text-sm text-neutral-600 flex">
        <p>Categories : </p>
        <div className="flex items-center gap-2 ml-2">
          {filteredBlogCategory.map((category) => (
            <div className="" key={category.id}>
              <p>{category.category_id.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-neutral-600 flex">
        <p>Marques : </p>
        <div className="flex items-center gap-2 ml-2">
          {filteredBlogBrand.map((brand) => (
            <div className="" key={brand.id}>
              <p>{brand.brand_id.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-8">
        <p
          className="text-sm lg:text-lg mb-4"
          dangerouslySetInnerHTML={{ __html: filteredBlog.short_description }}
        ></p>
      </div>

      <div className="w-full my-8">
        <div className=" flex justify-center items-center">
          <Image
            src={`https://admin.parazone.tn/assets/${filteredBlog.image}`}
            alt={filteredBlog.title}
            width={700}
            height={700}
            className="rounded-lg mb-4 lg:w-[80%] lg:h-[500px] object-cover"
          />
        </div>
      </div>

      <div className="my-8">
        <p
          className="text-sm lg:text-lg mb-4"
          dangerouslySetInnerHTML={{ __html: filteredBlog.long_description }}
        ></p>

        <div className="flex justify-center items-center gap-4">
          {filteredBlogProduct.map((product) => (
            <Link href={`/produit/${product.product_id.slug}`} key={product.id}>
              <div key={product.id}>
                <ProductCard
                  title={product.product_id.title}
                  product_img={product.product_id.product_img}
                  brand_id={product.product_id.brand_id}
                  new={false}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Article;
