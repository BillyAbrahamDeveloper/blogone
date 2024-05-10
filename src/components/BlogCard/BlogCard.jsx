import Image from 'next/image';
import classes from './blogcard.module.css';
import Link from 'next/link';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

const BlogCard = ({ blog: { title, desc, img, authorId } }) => {
  const isLiked = true;
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link className={classes.imgContainer} href='/'>
          <Image
            src={
              'https://images.unsplash.com/photo-1715109429876-e00fbe6c4ae3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            width='350'
            height='350'
          />
        </Link>
        <div className={classes.blogData}>
          <div className={classes.left}>
            <h3>{title}</h3>
            <p>{desc}</p>
            <span>
              Created By: <span>1th of January</span>
            </span>
          </div>
          <div className={classes.right}>
            {isLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
