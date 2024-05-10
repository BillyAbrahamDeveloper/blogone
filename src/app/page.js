import { blogs } from '@/lib/data';
import classes from './page.module.css';
import BlogCard from '@/components/BlogCard/BlogCard';

const HomePage = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {blogs.map((blog) => (
          <BlogCard key={blog.authorId} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
