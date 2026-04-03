import type { Product, Category, Testimonial } from '@/types';

export const products: Product[] = [
  // Track Pants
  {
    id: 1,
    name: "Upspeed Stripe Track Pants",
    price: 8500,
    image: "/images/product_01.jpg",
    category: "track-pants",
    description: "Premium track pants with signature Upspeed branding and side stripes. Comfortable fit with elastic waistband.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Gray"],
    inStock: true,
    isNew: false,
    isBestseller: true
  },
  {
    id: 2,
    name: "B-Logo Track Pants",
    price: 9000,
    image: "/images/product_02.jpg",
    category: "track-pants",
    description: "Stylish track pants featuring the iconic B-logo design. Available in multiple color combinations.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Gray/Navy", "Black/Red", "Black/Blue", "Gray/Green"],
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  {
    id: 3,
    name: "Curved Line Track Pants",
    price: 8000,
    image: "/images/product_03.jpg",
    category: "track-pants",
    description: "Modern track pants with unique curved line design. Perfect for casual and athletic wear.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Gray", "Black"],
    inStock: true,
    isNew: false,
    isBestseller: false
  },
  {
    id: 4,
    name: "Stripe Pocket Track Pants",
    price: 9500,
    image: "/images/product_04.jpg",
    category: "track-pants",
    description: "Premium track pants with distinctive stripe pocket detailing. Five color options available.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black/White", "Navy/Yellow", "Black", "Gray", "Navy"],
    inStock: true,
    isNew: true,
    isBestseller: true
  },
  {
    id: 5,
    name: "08 Shield Track Pants",
    price: 10000,
    image: "/images/product_05.jpg",
    category: "track-pants",
    description: "Bold track pants featuring the 08 shield logo. Premium quality fabric with excellent durability.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Gray/Black", "Black/Red", "Black", "Navy", "Gray"],
    inStock: true,
    isNew: false,
    isBestseller: true
  },
  {
    id: 6,
    name: "Flame Crown Track Pants",
    price: 9500,
    image: "/images/product_06.jpg",
    category: "track-pants",
    description: "Eye-catching track pants with flame and crown design elements. Stand out from the crowd.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Gray", "Black", "Black/White", "Gray/Red"],
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  // Polo Shirts
  {
    id: 7,
    name: "Hand-made Striped Polo",
    price: 9500,
    image: "/images/product_07.jpg",
    category: "polos",
    description: "Premium hand-crafted striped polo shirts. Classic design with modern styling.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Brown", "Navy", "Cream", "Black"],
    inStock: true,
    isNew: false,
    isBestseller: true
  },
  {
    id: 8,
    name: "Color-Block Polo",
    price: 9500,
    image: "/images/product_08.jpg",
    category: "polos",
    description: "Modern color-blocked polo shirts with zip detail. Smart casual essential.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Olive/White", "Navy/Cream", "Brown/Cream", "Black/White"],
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  // Cargo Pants
  {
    id: 9,
    name: "Classic Cargo Pants - Brown",
    price: 12000,
    image: "/images/product_09.jpg",
    category: "cargo-pants",
    description: "Utility-inspired cargo pants in classic brown. Multiple pockets for maximum functionality.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Brown"],
    inStock: true,
    isNew: false,
    isBestseller: true
  },
  {
    id: 10,
    name: "Classic Cargo Pants - Black",
    price: 12000,
    image: "/images/product_10.jpg",
    category: "cargo-pants",
    description: "Sleek black cargo pants with multiple utility pockets. Perfect for streetwear styling.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black"],
    inStock: true,
    isNew: false,
    isBestseller: true
  },
  {
    id: 11,
    name: "Classic Cargo Pants - Gray",
    price: 12000,
    image: "/images/product_11.jpg",
    category: "cargo-pants",
    description: "Versatile gray cargo pants with premium construction. Essential wardrobe staple.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Gray"],
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  // Dragon Jerseys
  {
    id: 12,
    name: "Dragon Jersey - White",
    price: 15000,
    image: "/images/product_12.jpg",
    category: "jerseys",
    description: "Limited edition white dragon jersey featuring intricate dragon embroidery design.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["White"],
    inStock: true,
    isNew: true,
    isBestseller: true
  },
  {
    id: 13,
    name: "Dragon Jersey - Black",
    price: 15000,
    image: "/images/product_13.jpg",
    category: "jerseys",
    description: "Striking black dragon jersey with detailed dragon pattern. Premium athletic wear.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black"],
    inStock: true,
    isNew: true,
    isBestseller: true
  },
  {
    id: 14,
    name: "Dragon Jersey - Maroon/Gold",
    price: 16000,
    image: "/images/product_14.jpg",
    category: "jerseys",
    description: "Exclusive maroon and gold dragon jersey. Collector's piece with premium gold accents.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Maroon/Gold"],
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  {
    id: 15,
    name: "Dragon King Jersey",
    price: 18000,
    image: "/images/product_15.jpg",
    category: "jerseys",
    description: "The ultimate Dragon King jersey with gold foil accents. Limited edition premium piece.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["White/Gold"],
    inStock: true,
    isNew: true,
    isBestseller: true
  },
  // Sweatshirts & Hoodies
  {
    id: 16,
    name: "Essential Sweatshirt",
    price: 11000,
    image: "/images/product_16.jpg",
    category: "hoodies",
    description: "Classic crewneck sweatshirt available in three essential colors. Soft brushed interior.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Gray", "Cream", "Black"],
    inStock: true,
    isNew: false,
    isBestseller: true
  },
  {
    id: 17,
    name: "Street Essential Hoodie",
    price: 13000,
    image: "/images/product_17.jpg",
    category: "hoodies",
    description: "Premium oversized hoodie in classic black. Features kangaroo pocket and adjustable hood.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black"],
    inStock: true,
    isNew: true,
    isBestseller: true
  },
  // Additional Polos
  {
    id: 18,
    name: "Classic Fit Polo Collection",
    price: 8500,
    image: "/images/product_18.jpg",
    category: "polos",
    description: "Wide range of classic fit polo shirts in multiple colors. Perfect for any occasion.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Brown", "Blue", "Green", "Beige", "Black", "Navy"],
    inStock: true,
    isNew: false,
    isBestseller: false
  },
  {
    id: 19,
    name: "Quarter-Zip Polo Collection",
    price: 10000,
    image: "/images/product_19.jpg",
    category: "polos",
    description: "Modern quarter-zip polo shirts in various colors. Contemporary styling with premium fabric.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Olive", "Black", "White", "Gray", "Blue", "Beige", "Green", "Mint", "Navy"],
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  // Additional Track Pants
  {
    id: 20,
    name: "Dreamsign Track Pants",
    price: 9000,
    image: "/images/product_20.jpg",
    category: "track-pants",
    description: "Premium track pants with Dreamsign branding. Clean minimal design with piping detail.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Cream"],
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  // More Polos
  {
    id: 21,
    name: "Bold Stripe Polo",
    price: 9000,
    image: "/images/product_21.jpg",
    category: "polos",
    description: "Statement-making bold striped polo shirt. Black and white contrast design.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black/White"],
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  {
    id: 22,
    name: "Navy Stripe Polo",
    price: 9000,
    image: "/images/product_22.jpg",
    category: "polos",
    description: "Elegant navy and white striped polo shirt. Classic preppy style with modern fit.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Navy/White"],
    inStock: true,
    isNew: false,
    isBestseller: false
  },
  {
    id: 23,
    name: "Ribbed Knit Polo",
    price: 9500,
    image: "/images/product_23.jpg",
    category: "polos",
    description: "Premium ribbed knit polo shirt in warm brown. Textured fabric with contrast collar.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Brown"],
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  {
    id: 24,
    name: "Designer Cutout Polo",
    price: 12000,
    image: "/images/product_24.jpg",
    category: "polos",
    description: "High-fashion polo shirt with unique cutout stripe details. Premium designer piece.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black/White"],
    inStock: true,
    isNew: true,
    isBestseller: true
  }
];

export const categories: Category[] = [
  {
    id: "track-pants",
    name: "Track Pants",
    image: "/images/product_05.jpg",
    productCount: 8
  },
  {
    id: "cargo-pants",
    name: "Cargo Pants",
    image: "/images/product_09.jpg",
    productCount: 3
  },
  {
    id: "polos",
    name: "Polo Shirts",
    image: "/images/product_07.jpg",
    productCount: 10
  },
  {
    id: "jerseys",
    name: "Dragon Jerseys",
    image: "/images/product_12.jpg",
    productCount: 4
  },
  {
    id: "hoodies",
    name: "Hoodies & Sweats",
    image: "/images/product_16.jpg",
    productCount: 2
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marcus Johnson",
    handle: "@styleking",
    avatar: "MJ",
    quote: "The quality is insane. Best track pants I've ever owned. The fit is perfect and the material feels premium.",
    rating: 5
  },
  {
    id: 2,
    name: "Mia Chen",
    handle: "@fashionista_mia",
    avatar: "MC",
    quote: "Fast shipping and the fit is perfect. Will definitely order again! Customer service was amazing too.",
    rating: 5
  },
  {
    id: 3,
    name: "Jay Williams",
    handle: "@sneakerhead_jay",
    avatar: "JW",
    quote: "These dragon jerseys are fire. Everyone asks where I got mine. Limited edition feel without the crazy price.",
    rating: 5
  },
  {
    id: 4,
    name: "David Park",
    handle: "@urban_dave",
    avatar: "DP",
    quote: "Premium feel at a fair price. Kay-fits is now my go-to for all my streetwear needs.",
    rating: 5
  },
  {
    id: 5,
    name: "Tom Anderson",
    handle: "@techwear_tom",
    avatar: "TA",
    quote: "The cargo pants have so many pockets! Functional and stylish. Perfect for my everyday carry.",
    rating: 5
  },
  {
    id: 6,
    name: "Sarah Lee",
    handle: "@loyal_customer",
    avatar: "SL",
    quote: "Had an issue with my order and they fixed it same day. That's how you build customer loyalty.",
    rating: 5
  }
];
