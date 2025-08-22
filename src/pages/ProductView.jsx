import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import AddToCart from "../components/shop-elements/AddToCart";
import ImageGallery from "../components/shop-elements/ImageGallery";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Tabs from "../components/Tabs";
import Tab from "../components/Tab";
import Comments from "../components/shop-elements/Comments";
import CommentsList from "../components/shop-elements/CommentsList";
import CommentsForm from "../components/shop-elements/CommentsForm";
import RelatedPosts from "../components/shop-elements/RelatedPosts";
import Upsells from "../components/shop-elements/Upsells";
import ToggleContent from "../components/ToggleContent";
import { useCounterStore } from '../store/useCounterStore'


function ProductView({ user }) {
  const { id } = useParams();
  const { t } = useContext(AuthContext);
  const { notifications, addNotification, userDataX, setUserDataX } = useCounterStore()


  var [appData, setappData] = useState(window.appData);
  var [productData, setproductData] = useState(null);
  var [categories, setcategories] = useState(null);

  function fetchPost() {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }
    var postData = {
      id: id,
    };
    postData = JSON.stringify(postData);

    fetch(appData.serverUrl + "wp-json/combo-store/v2/get_product", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: postData,
    })
      .then((response) => {

        if (!response.ok) {
          throw new Error('Token validation failed');
        }

        if (response.ok && response.status < 400) {
          response.json().then((res) => {

            var product = res?.product;




            setproductData(product)





            setTimeout(() => {
            }, 500);
          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });

  }

  // useEffect(() => {
  // 	fetchPost();
  // }, []);

  useEffect(() => {
    fetchPost();
    setcategories(productData?.categories?.map(item => item.term_id))

  }, [id]);





  function formatDate(dateInput) {


    var format = "d/m/Y";
    dateInput = dateInput == undefined ? '' : dateInput;
    // Ensure date is in a proper format for parsing
    const dateObj = new Date(dateInput.replace(" ", "T"));

    if (isNaN(dateObj)) {
      throw new Error("Invalid date format");
    }

    // Extract date components
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = dateObj.getFullYear();

    // Replace format placeholders with actual values
    //return ;

    return (
      <>
        {format.replace("d", day).replace("m", month).replace("Y", year)}
      </>

    );

  }


  const communityComments = [
    "Keep inspiring us!",
    "Your voice matters!",
    "Let’s build together!",
    "Love this energy!",
    "Shoutout to the whole team!",
    "Thanks for sharing!",
    "Creativity on point!",
    "This made my day!",
    "Appreciate the update!",
    "Such a powerful message.",
    "We hear you!",
    "This community rocks!",
    "Grateful to be here.",
    "Proud of everyone here!",
    "Let’s keep growing!",
    "Big love to all!",
    "Unity makes us strong.",
    "Your effort shows!",
    "We rise together!",
    "So well said!",
    "Inspired by this!",
    "Always learning here.",
    "Open minds, open hearts.",
    "Thank you for the support!",
    "Let’s keep the ideas flowing!",
    "Such creative work!",
    "Connection is everything.",
    "You’re not alone here.",
    "Keep creating magic!",
    "Together, we thrive."
  ];




  return (
    <Layout user={user} >

      {/* {JSON.stringify(productData)} */}

      <div className="p-5 grid grid-cols-2 gap-5">


        <div className="bg-white shadow-sm border border-gray-200 p-5 rounded-sm">

          <h3 className="text-2xl mb-4">{t("Gallery ")}</h3>

          <div>
            {productData?.gallery !== undefined && (

              <ImageGallery images={productData?.gallery} />
            )}


          </div>

        </div>


        <div className="bg-white shadow-sm border border-gray-200 p-5 rounded-sm">



          <h3 className="text-3xl font-bold text-gray-600 mb-4">{productData?.title}</h3>
          <h3 className="text-2xl mb-4">${productData?.price}</h3>
          <h3 className="text-base mb-4">{productData?.post_excerpt}</h3>
          <div dangerouslySetInnerHTML={{ __html: productData?.price_html }} />
          <div dangerouslySetInnerHTML={{ __html: productData?.excerpt }} />



          <div className="flex flex-col gap-4">



            <div className="flex  gap-2 ">

              <div>SKU:</div>
              <div dangerouslySetInnerHTML={{ __html: productData?.sku }} />

            </div>
            <div className="flex  gap-2 ">

              <div>Categories:</div>
              <div className="flex  ">
                {productData?.categories.map((item, index) => {

                  return (
                    <div >
                      <span>{item.name}</span>
                      {productData?.categories.length > (index + 1) && (
                        <span className="pr-1">, </span>
                      )}
                    </div>
                  )

                })}
              </div>
            </div>
            <div className="flex  gap-2 ">

              <div>Tags:</div>
              <div className="flex  ">
                {productData?.tags.map((item, index) => {

                  return (
                    <div >
                      <span>{item.name}</span>
                      {productData?.tags.length > (index + 1) && (
                        <span className="pr-1">, </span>
                      )}
                    </div>
                  )

                })}
              </div>
            </div>
            <AddToCart productData={productData} />

          </div>


        </div>





      </div>


      <div className="my-10">
        <Tabs activeTab="options"
          orientation="horizontal"
          activeClass="active-tab"
          onSelect={(tabName) => { }}
          tabs={[
            { label: "Description" },
            { label: "Reviews" },
            { label: "FAQ" },
          ]}>
          <Tab index={0}>
            <div>


              {productData?.post_content}
            </div>
          </Tab>
          <Tab index={1}>
            <div>
              <Comments postData={productData} dummyComments={communityComments} id={id} />
            </div>

          </Tab>
          <Tab index={2}>
            <div className="p-5 bg-gray-800 rounded-sm">
              <div className="flex gap-3">
                <div className="text-2xl text-white">{t("Frequently Asked Questions")}</div>
              </div>
              <div className="my-4 flex flex-col gap-5 ">


                {productData?.faq && (

                  <div className="my-4">
                    {productData?.faq.map((item, index) => {

                      return (
                        <ToggleContent key={index} title={<FAQTitle text={item.title} index={index} />}
                          contentClass=""
                          headerClass=""
                          headerTitleClass=""
                          wrapperClass=""
                        >

                          <div className="text-gray-200">


                            {item?.content}


                          </div>

                        </ToggleContent>
                      )

                    })}
                  </div>
                )}


              </div>

            </div>

          </Tab>



        </Tabs>

      </div>

      <div className="p-5  rounded-sm">
        <div className="flex gap-3">
          <div className="text-2xl ">{t("Frequently Bought Together")}</div>
        </div>
        <div className="my-4 ">
          <Upsells productData={productData} />
        </div>
      </div>

      <div className="p-5  rounded-sm">
        <div className="flex gap-3">
          <div className="text-2xl ">{t("Related Products")}</div>
        </div>
        <div className="my-4 ">
          <RelatedPosts postId={productData?.id} categories={categories} />
        </div>
      </div>








    </Layout>
  )


}

export default ProductView;
