import React, { use, useState, useEffect } from "react";

export default function ProductsResult({
  productsResult,
}: {
  productsResult: Promise<any>;
}) {
  const products = use(productsResult);

  const allProducts = products.products.edges.map((edge: any) => edge.node);
  console.log(allProducts);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [isPriceOpen, setIsPriceOpen] = useState<boolean>(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);

  console.log(isPriceOpen);

  const toggleFilter = (
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
     
    } else {
      setList([...list, value]);
      
    }
    
  };
  const selectedP = ["5-10"]; // 5 to 10 AUD
  const selectedC = ["Body"];

  const filterProducts = (
    products: any[],
    selectedPriceRanges: string[],
    selectedCategories: string[]
  ) => {
    return products.filter((product) => {
      const prices = product.variants.edges.map((edge) =>
        parseFloat(edge.node.price.amount)
      );

      const minPrice = Math.min(...prices);

      const categories = product.collections.edges.map((edge) =>
        edge.node.title.toLowerCase()
      );

      // Check if product passes the price filter
      const passesPriceFilter =
        selectedPriceRanges.length === 0 ||
        selectedPriceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return minPrice >= min && minPrice <= max;
        });

      const passesCategoryFilter =
        selectedCategories.length === 0 ||
        selectedCategories.some((category) => {
          return categories.includes(category.toLowerCase());
        });

      return passesPriceFilter && passesCategoryFilter;
    });
  };

  // console.log(
  //   "product",
  //   filterProducts(filteredProducts, selectedP, selectedC)
  // );

  // console.log(selectedPrices);
  // console.log(selectedCategories);
  // console.log("result:  ", filteredProducts);

  
  useEffect(() => {
    const updatedProducts = [...allProducts]
    const filtered = filterProducts(updatedProducts, selectedPrices, selectedCategories);
    setFilteredProducts(filtered);
  }, [selectedPrices, selectedCategories]);
  return (
    <>
      <div className="flex flex-row justify-between ">
        <p className="font-semibold text-[40px]">Products</p>
        <div className="flex flex-row gap-5  items-center">
          <button className="">Hide Filter</button>
          <div>Sort by</div>
        </div>
      </div>
      <div className="flex flex-row gap-5 mt-5">
        <div className="flex flex-col">
          <div className="min-w-[300px] px-5 py-3 flex flex-row items-center justify-between">
            <p>Filter & Sort</p>
            <button
              onClick={() => {
                setSelectedPrices([]);
                setSelectedCategories([]);
              }}
            >
              Clear all
            </button>
          </div>
          {/* can use mapping */}
          <div>
            <div
              onClick={() => {
                setIsPriceOpen((isPriceOpen) => !isPriceOpen);
              }}
              className="px-5 border-t-1 border-gray-200 py-3 cursor-pointer"
            >
              price
            </div>
            {isPriceOpen && (
              <div className="px-5">
                <div
                  onClick={() =>
                    toggleFilter("5-10", selectedPrices, setSelectedPrices)
                  }
                  className="flex flex-row gap-2 items-center cursor-pointer"
                >
                  <div className="w-[20px] h-[20px] border border-gray-600 rounded-md "></div>
                  <div>$05 to $10 x</div>
                </div>
                <div
                  onClick={() =>
                    toggleFilter("10-20", selectedPrices, setSelectedPrices)
                  }
                  className="flex flex-row gap-2 items-center cursor-pointer"
                >
                  <div className="w-[20px] h-[20px] border border-gray-600 rounded-md "></div>
                  <div>$10 to $20 x</div>
                </div>
              </div>
            )}
          </div>
          <div>
            <div
              onClick={() => {
                setIsCategoryOpen((isCategoryOpen) => !isCategoryOpen);
              }}
              className="px-5 border-t-1 border-gray-200 py-3 cursor-pointer"
            >
              Category
            </div>
            {isCategoryOpen && (
              <div className="px-5">
                <div
                  onClick={() =>
                    toggleFilter(
                      "Hair care",
                      selectedCategories,
                      setSelectedCategories
                    )
                  }
                  className="flex flex-row gap-2 items-center cursor-pointer"
                >
                  <div className="w-[20px] h-[20px] border border-gray-600 rounded-md "></div>
                  <div>Hair care x</div>
                </div>
                <div
                  onClick={() =>
                    toggleFilter(
                      "Body",
                      selectedCategories,
                      setSelectedCategories
                    )
                  }
                  className="flex flex-row gap-2 items-center cursor-pointer"
                >
                  <div className="w-[20px] h-[20px] border border-gray-600 rounded-md "></div>
                  <div>Body x</div>
                </div>
                <div 
                  onClick={() =>
                    toggleFilter(
                      "Nail",
                      selectedCategories,
                      setSelectedCategories
                    )
                  }
                className="flex flex-row gap-2 items-center cursor-pointer">
                  <div className="w-[20px] h-[20px] border border-gray-600 rounded-md "></div>
                  <div>Nail x</div>
                </div>
                <div 
                  onClick={() =>
                    toggleFilter(
                      "Facial",
                      selectedCategories,
                      setSelectedCategories
                    )
                  }
                className="flex flex-row gap-2 items-center cursor-pointer">
                  <div className="w-[20px] h-[20px] border border-gray-600 rounded-md "></div>
                  <div>Facial x</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grow grid  2xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-5">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col justify-between gap-5"
              >
                <div
                  className={` rounded-[15px] cursor-pointer flex flex-col justify-between gap-3`}
                >
                  <div
                    style={{
                      backgroundImage: `url(${product.images?.edges[0]?.node.url})`,
                    }}
                    className="w-full lg:min-h-[300px] xl:min-h-[400px] 2xl:min-h-[550px] bg-cover bg-center border border-gray-200 rounded-[15px]"
                  ></div>
                  <div className="font-bold">{product.title}</div>
                  <div className="font-bold">
                    ${parseInt(product.variants.edges[0].node.price.amount)}
                  </div>
                </div>

                <button className="relative bg-[#313131]  text-white font-bold p-5 rounded-[15px] cursor-pointer">
                  Add to cart
                </button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px]">
              <p className="text-[30px]">No products found</p>
              <p className="text-[20px]">Please try a different search</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
