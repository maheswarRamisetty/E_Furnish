import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import videoCover from "../assets/videos/cover1.mp4";
import { FaAnglesDown, FaHeadset } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Slider } from "6pp";
import { TbTruckDelivery } from "react-icons/tb";
import { LuShieldCheck } from "react-icons/lu";
import {Canvas} from '@react-three/fiber'
import { OrbitControls,Environment,ScrollControls} from '@react-three/drei'

import Home1 from '../../public/Home1'
import { Suspense } from "react";

const clients = [
  {
    src: "https://th.bing.com/th?id=OIP.Ic_pKCppkpTfoY1X1W2dvQHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    alt: "chair",
  },
  {
    src: "https://th.bing.com/th?id=OIP.by7of-Sx_ylCJjvLhpVlAgHaF4&w=280&h=222&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    alt: "sofa",
  },
  {
    src: "https://th.bing.com/th?id=OIP.7Lf-O1jqUH7UEy9pEFQ0EgAAAA&w=181&h=181&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    alt: "recliner",
  },
  {
    src: "https://th.bing.com/th?id=OIP.ThYb_t61NMFKGlTz94G5pAHaH0&w=243&h=256&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    alt: "armchair",
  },
  {
    src: "https://th.bing.com/th?id=OIP.TLKRMVXWfV4aw1_otFXQowHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    alt: "redux",
  },
  {
    src: "https://th.bing.com/th?id=OIP.VtQT7rXJBPXoSwIU4PTVEgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    alt: "desk",
  },
  {
    src: "https://th.bing.com/th?id=OIP.lWazMQ0UunsYxAp5EeaoJwHaH0&w=243&h=256&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    alt: "dining table",
  },
  {
    src: "https://th.bing.com/th?id=OIP.yAzHsRoXAKAWoM0Coh-yXgHaH6&w=241&h=258&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    alt: "office table",
  },
  {
    src: "https://th.bing.com/th?id=OIP.VoPxv6IneEtGiIWIhY4aoAAAAA&w=190&h=148&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    alt: "cubicle",
  },

  {
    src: "https://th.bing.com/th?id=OIP.NfoK9Xl2lx4srR6vTK0p3QHaH0&w=243&h=256&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    alt: "Foot Stool",
  },

  {
    src: "https://th.bing.com/th?id=OIP.UXN1wq4MXbiIeYbovb-uegHaH0&w=243&h=256&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    alt: "Book Case",
  },
  {
    src: "https://th.bing.com/th?id=OIP.eYvJtLsg1_Vq_NWN6xfgXwHaFx&w=283&h=220&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    alt: "standing chair",
  },
  {
    src: "https://th.bing.com/th?id=OIP.Xg_6LkynhG9aQqNR64eg5AHaH0&w=243&h=256&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    alt: "kings chair",
  },

  {
    src: "https://th.bing.com/th?id=OIP.0NB3aztYoOfamAHxla0aLwHaHq&w=245&h=254&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    alt: "Dressing Table",
  },

  {
    src: "https://th.bing.com/th/id/OIP.Nijbs_XXQwdsZiS_KEJ1LgHaH0?w=164&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    alt: "Dining Table",
  },

  {
    src: "https://th.bing.com/th?q=Amazon+Shopping+Cart+Logo&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=strict&t=1&mw=247",
    alt: "Cart",
  },

  {
    src: "https://th.bing.com/th/id/OIP.GjomObjQRRd9R6iY3yjHkQHaH_?w=172&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    alt: "office desk",
  },
  {
    src: "https://th.bing.com/th/id/OIP.Kbk4_A0S6H1klhEmDUbhQAHaHa?w=185&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    alt: "Computer Table",
  },
];

const banners = [
  "https://fdfurniture.ca/cdn/shop/files/fairdeal-banner1_1.jpg?v=1707256047&width=4066",
  "https://fdfurniture.ca/cdn/shop/files/fairdeal-banner2.jpg?v=1707255831&width=4066",
];
const categories = [
  "Chairs",
  "Sofas",
  "Armchair",
  "Bed",
  "Dining Table",
  "Desk",
  "Office Chair",
  "Bookcase",
  "Cubicle",
  "Recliner",
  "Footstool",
  "Console Table",
];

const services = [
  {
    icon: <TbTruckDelivery />,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for Money",
  },
  {
    icon: <LuShieldCheck />,
    title: "STRIPE PAYMENT",
    description: "100% secure payment",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 SUPPOURT",
    description: "Get support 24/7",
  },
];

const Home = () => {
  const { data, isError, isLoading } = useLatestProductsQuery("");

  

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };  

  if (isError) toast.error("Cannot Fetch the Products");

  const coverMessage =
    "Mh".split(
      " "
    );

  return (
    <>
      <div className="home">
        <section></section>

        <div>
          <aside>
            <h1>Categories</h1>
            <ul>
              {categories.map((i) => (
                <li key={i}>
                  <Link to={`/search?category=${i.toLowerCase()}`}>{i}</Link>
                </li>
              ))}
            </ul>
          </aside>
          <Slider
            autoplay
            autoplayDuration={1500}
            showNav={false}
            images={banners}
          />

          {/* <Canvas>
            <ambientLight/>
            <pointLight position={[10, 10, 10]} />
            <OrbitControls enableZoom={false}/>
            <Suspense fallback={null}>
              <ScrollControls pages={3} damping={0.25}>
          <Home1/>
          </ScrollControls>
          </Suspense>
         
          </Canvas> */}
        </div>

        <h1>
          Latest Products
          <Link to="/search" className="findmore">
            More
          </Link>
        </h1>

        <main>
          {isLoading ? (
            <>
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} style={{ height: "25rem" }}>
                  <Skeleton width="18.75rem" length={1} height="20rem" />
                  <Skeleton width="18.75rem" length={2} height="1.95rem" />
                </div>
              ))}
            </>
          ) : (
            data?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photos={i.photos}
              />
            ))
          )}
        </main>
      </div>

      <article className="cover-video-container">
        <div className="cover-video-overlay"></div>
        <video autoPlay loop muted src={videoCover} />
        <div className="cover-video-content">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            E-Furnish
          </motion.h2>
          {coverMessage.map((el, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i / 10,
              }}
              key={i}
            >
              {el}{" "}
            </motion.span>
          ))}
        </div>
        <motion.span
          animate={{
            y: [0, 10, 0],
            transition: {
              duration: 1,
              repeat: Infinity,
            },
          }}
        >
          <FaAnglesDown />
        </motion.span>
      </article>

      <article className="our-clients">
        <div>
          <h2>Our Popular Products</h2>
          <div>
            {clients.map((client, i) => (
              <motion.img
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: i / 20,
                    ease: "circIn",
                  },
                }}
                src={client.src}
                alt={client.alt}
                key={i}
              />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: -100 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                delay: clients.length / 20,
              },
            }}
          >
            Trusted By No One , But Only Me
          </motion.p>
        </div>
      </article>

      <hr
        style={{
          backgroundColor: "rgba(0,0,0,0.1)",
          border: "none",
          height: "1px",
        }}
      />

      <article className="our-services">
        <ul>
          {services.map((service, i) => (
            <motion.li
              initial={{ opacity: 0, y: -100 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: i / 20,
                },
              }}
              key={service.title}
            >
              <div>{service.icon}</div>
              <section>
                <h3>{service.title}Y</h3>
                <p>{service.title}</p>
              </section>
            </motion.li>
          ))}
        </ul>
      </article>
    </>
  );
};

export default Home;
